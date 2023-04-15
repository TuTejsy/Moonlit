import Foundation
import AVFoundation

let kFramePowerInterval = TimeInterval(0.01)
let kMaxFramePowerCount = 60

@objc protocol ZRKAudioRecorderDelegate {
  func recordingDidStart()
  func recordingDidFinish(fileURL: URL, framesPower: [Int], duration: Double)
  
  func recordingNotPermitted()
  func framePowerDidUpdate(framePower: Int)
}

class ZRKAudioRecorder: NSObject, AVAudioRecorderDelegate {
  static let shared = ZRKAudioRecorder()
  weak var delegate: ZRKAudioRecorderDelegate?
  
  private var recordingSession: AVAudioSession {
    return AVAudioSession.sharedInstance()
  }
  
  private var audioRecorder: AVAudioRecorder?
  private var recordTimer: Timer?
  private var framesPower = [Float]()
  private var normalizedFramesPower = [Int]()
  private var recordingDuration: TimeInterval = 0
  
  func startRecording() {
    do {
      try recordingSession.setActive(true)
      recordingSession.requestRecordPermission() { [weak self] allowed in
        guard let self = self else {
          return
        }
        
        DispatchQueue.main.async { [self] in
          if allowed {
            let audioFileURL = self.getFileURL()
            
            guard let audioFileURL = audioFileURL else {
              return
            }
            
            let settings = [
              AVFormatIDKey: Int(kAudioFormatMPEG4AAC),
              AVSampleRateKey: 32000,
              AVNumberOfChannelsKey: 1,
              AVEncoderAudioQualityKey: AVAudioQuality.high.rawValue
            ]
            
            do {
              self.audioRecorder = try AVAudioRecorder(url: audioFileURL, settings: settings)
              
              guard let audioRecorder = self.audioRecorder else {
                return
              }
              
              audioRecorder.delegate = self
              try self.recordingSession.setCategory(.playAndRecord, mode: .spokenAudio)
              audioRecorder.isMeteringEnabled = true
              
              self.framesPower = []
              self.normalizedFramesPower = []
              
              audioRecorder.record()
              self.delegate?.recordingDidStart()
              
              self.recordTimer = Timer.scheduledTimer(withTimeInterval: kFramePowerInterval, repeats: true) { [weak self] timer in
                guard let self = self,
                      let audioRecorder = self.audioRecorder else {
                  return
                }
                
                audioRecorder.updateMeters()
                let averageFramePower = audioRecorder.averagePower(forChannel: 0)
                self.framesPower.append(averageFramePower)
                
                self.delegate?.framePowerDidUpdate(framePower: self.normalizeFramePower(value: averageFramePower))
              }
            } catch {
              self.finishRecording(success: false)
            }
          } else {
            self.delegate?.recordingNotPermitted()
          }
        }
      }
    } catch let error {
      print(error.localizedDescription)
    }
  }
  
  func finishRecording(success: Bool) {
    if let audioRecorder = audioRecorder, audioRecorder.isRecording {
      recordingDuration = audioRecorder.currentTime
      audioRecorder.stop()
    }
    
    do {
      try recordingSession.setActive(false)
      try recordingSession.setCategory(.playback, mode: .default)
    } catch(let error) {
      print(error.localizedDescription)
    }
  }
  
  // MARK: AVRecorderDelegate
  
  func audioRecorderDidFinishRecording(_ recorder: AVAudioRecorder, successfully flag: Bool) {
    do {
      recordTimer?.invalidate()
      normalizedFramesPower = normalizePower(values: framesPower)
      delegate?.recordingDidFinish(fileURL: recorder.url, framesPower: normalizedFramesPower, duration: recordingDuration)
      recordingDuration = 0
      self.audioRecorder = nil
      
      try recordingSession.setActive(false)
      try recordingSession.setCategory(.playback, mode: .default)
      
    } catch let error as NSError {
      print(error.localizedDescription)
      
    }
  }
  
  func audioRecorderEncodeErrorDidOccur(_ recorder: AVAudioRecorder, error: Error?) {
    do {
      try recordingSession.setActive(false)
      try recordingSession.setCategory(.playback, mode: .default)
    } catch(let error) {
      print(error.localizedDescription)
      
    }
  }
  
  // MARK: Utils
  
  func getFileURL() -> URL? {
    let fileName = NSString.getPatternName(for: VOICE, andDate: Date())
    let path = FileHelper.shared.getDocumentVoiceDirectoryPath()?.appendingPathComponent(fileName)
    
    return path
  }
  
  func normalizeFramePower(value: Float) -> Int {
    switch(value) {
    case _ where value > -2:
      return 16
    case _ where value > -5:
      return 15
    case _ where value > -8:
      return 14
    case _ where value > -10:
      return 13
    case _ where value > -13:
      return 12
    case _ where value > -16:
      return 11
    case _ where value > -19:
      return 10
    case _ where value > -21:
      return 9
    case _ where value > -23:
      return 8
    case _ where value > -25:
      return 7
    case _ where value > -27:
      return 6
    case _ where value > -29:
      return 5
    case _ where value > -31:
      return 4
    case _ where value > -33:
      return 3
    case _ where value > -35:
      return 2
    default:
      return 1
    }
  }
  
  func normalizePower(values: [Float]) -> [Int] {
    let normalizedValues = values.map {
      normalizeFramePower(value: $0)
    }
    
    if normalizedValues.count > kMaxFramePowerCount {
      var balancedFramesPower = [Int]()
      let factor = Double(framesPower.count) / Double(kMaxFramePowerCount);
      
      for index in 0..<kMaxFramePowerCount {
        var frameIndex = Int(floor(Double(index) * factor))
        
        if frameIndex > framesPower.count - 1 {
          frameIndex = framesPower.count - 1
        }
        
        balancedFramesPower.append(normalizedValues[frameIndex])
      }
      
      return balancedFramesPower
    }
    
    return normalizedValues
  }
  
  
}
