import Foundation
import AVFoundation

@objc protocol ZRKAudioPlayerDelegate {
  func playerDidFinishPlaying()
}

class ZRKAudioPlayer: NSObject, AVAudioPlayerDelegate {
  static let shared = ZRKAudioPlayer()
  weak var delegate: ZRKAudioPlayerDelegate?
  
  private var audioPlayer: AVAudioPlayer?
  
  private var playingSession: AVAudioSession {
    return AVAudioSession.sharedInstance()
  }
  
  var duration: Double {
    audioPlayer?.duration ?? 0
  }
  
  var isPlaying: Bool {
    audioPlayer?.isPlaying ?? false
  }
  
  var filePath: String?
  
  var playingTime: Double { audioPlayer?.currentTime ?? 0 }
  
  func initFileToPlay(at path: String) -> NSError? {
    var initError: NSError?
    
    do {
      let fileURL = URL(fileURLWithPath: path)
      
      audioPlayer = try AVAudioPlayer(contentsOf: fileURL)
      try playingSession.setCategory(.playback)
      try playingSession.setActive(true)
      self.filePath = path
    } catch let error as NSError {
      initError = error
      audioPlayer = nil
      
      print(error.description)
    }
    
    guard let audioPlayer = audioPlayer else {
      return initError
    }
    
    audioPlayer.delegate = self
    audioPlayer.volume = 1.0
    audioPlayer.prepareToPlay()
    
    return nil
  }
  
  func play(_ fromTime: Double) -> Bool {
    guard let audioPlayer = audioPlayer else {
      return false
    }
    
    audioPlayer.currentTime = fromTime
    
    return audioPlayer.play()
  }
  
  func rewind(_ toTime: Double) {
    audioPlayer?.currentTime = toTime
  }
  
  func stop() -> Bool {
    guard let audioPlayer = audioPlayer else {
      return false
    }
    
    audioPlayer.stop()
    audioPlayer.currentTime = 0
    
    do {
      try playingSession.setActive(false)
      try playingSession.setCategory(.playback, mode: .default)
    } catch(let error) {
      print(error.localizedDescription)
    }
    
    return true
  }
  
  func pause() -> Bool {
    guard let audioPlayer = audioPlayer else {
      return false
    }
    
    audioPlayer.pause()
    
    return true
  }
  
  // MARK: AVAudioPlayerDelegate
  
  func audioPlayerDidFinishPlaying(_ player: AVAudioPlayer, successfully flag: Bool) {
    self.delegate?.playerDidFinishPlaying()
  }
}

