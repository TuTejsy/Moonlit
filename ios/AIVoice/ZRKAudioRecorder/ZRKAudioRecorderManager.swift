import Foundation
import MobileCoreServices
import AVFAudio

enum AudioRecorderEvents: String {
    case RECORDING_DID_START
    case RECORDING_DID_FINISH
    case RECORDING_DID_FAILED
    case RECORDING_NOT_PERMITTED
    case RECORDING_DID_INTERRUPT
}

let kAudioMimeType = "audio/x-m4a"

@objc(ZRKAudioRecorderManager)
class ZRKAudioRecorderManager: RCTEventEmitter, ZRKAudioRecorderDelegate {
    private let audioRecorder = ZRKAudioRecorder.shared
    
    private var recordingDidFinishResolveBlock: RCTPromiseResolveBlock?
    
    override init() {
        super.init()
        audioRecorder.delegate = self
        NotificationCenter.default.addObserver(self, selector: #selector(handleInterruption(notification:)), name: AVAudioSession.interruptionNotification, object: AVAudioSession.sharedInstance())
    }
    
    override class func requiresMainQueueSetup() -> Bool {
        return false
    }
    
    override func supportedEvents() -> [String]! {
        return [
            AudioRecorderEvents.RECORDING_DID_START.rawValue,
            AudioRecorderEvents.RECORDING_DID_FINISH.rawValue,
            AudioRecorderEvents.RECORDING_DID_FAILED.rawValue,
            AudioRecorderEvents.RECORDING_NOT_PERMITTED.rawValue,
            AudioRecorderEvents.RECORDING_DID_INTERRUPT.rawValue,
        ]
    }
    
    deinit {
        NotificationCenter.default.removeObserver(self)
    }
    
    
    @objc func startAudioRecording() {
        audioRecorder.startRecording()
    }
    
    @objc func stopAudioRecording(_ resolve: @escaping RCTPromiseResolveBlock,
                                  rejecter reject: RCTPromiseRejectBlock) {
        recordingDidFinishResolveBlock = resolve
        audioRecorder.finishRecording(success: true)
    }
        
    func recordingNotPermitted() {
        sendEvent(withName: AudioRecorderEvents.RECORDING_NOT_PERMITTED.rawValue, body: [
        ])
    }
    
    func recordingDidStart() {
        sendEvent(withName: AudioRecorderEvents.RECORDING_DID_START.rawValue, body: [
        ])
        
        ZRKKeepAwake.activate()
    }
    
    @objc func handleInterruption(notification: NSNotification) {
        guard let value = (notification.userInfo?[AVAudioSessionInterruptionTypeKey] as? NSNumber)?.uintValue,
              let interruptionType =  AVAudioSession.InterruptionType(rawValue: value)
        else {
            print("notification.userInfo?[AVAudioSessionInterruptionTypeKey]", notification.userInfo?[AVAudioSessionInterruptionTypeKey])
            return
        }
        switch interruptionType {
        case .began:
            sendEvent(withName: AudioRecorderEvents.RECORDING_DID_INTERRUPT.rawValue, body: [])
           
            ZRKKeepAwake.deactivate()
        default :
            return
        }
    }
    
    func recordingDidFinish(fileURL: URL, framesPower: [Int], duration: Double) {
        ZRKKeepAwake.deactivate()
        
        var fileSize: Int?
        
        do {
            let fileAttributes = try FileManager.default.attributesOfItem(atPath: fileURL.path)
            fileSize = fileAttributes[.size] as? Int
        } catch let error {
          print(error.localizedDescription)
        }
        
        let response: [String: Any] = [
            "size": fileSize ?? 0,
            "mime": kAudioMimeType,
            "duration": duration,
            "cachedName": fileURL.lastPathComponent,
            "framesPower": framesPower,
        ]
        
        if let recordingDidFinishResolveBlock = recordingDidFinishResolveBlock {
            recordingDidFinishResolveBlock(response)
        }
        
        sendEvent(withName: AudioRecorderEvents.RECORDING_DID_FINISH.rawValue, body: response)
    }
}
