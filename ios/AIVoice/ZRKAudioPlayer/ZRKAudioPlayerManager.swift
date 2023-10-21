import Foundation
import AVFAudio
import MediaPlayer

enum AudioPlayerEvents: String {
  case PLAYING_DID_FINISH
  case PLAYING_DID_INTERRUPT
}

@objc(ZRKAudioPlayerManager)
class ZRKAudioPlayerManager: RCTEventEmitter, ZRKAudioPlayerDelegate {
  let audioPlayer = ZRKAudioPlayer.shared
  
  override init() {
    super.init()
    audioPlayer.delegate = self
    setupRemoteTransportControls()
    
    NotificationCenter.default.addObserver(self, selector: #selector(handleInterruption(notification:)), name: AVAudioSession.interruptionNotification, object: AVAudioSession.sharedInstance())
  }
  
  deinit {
    NotificationCenter.default.removeObserver(self)
  }
  
  override func supportedEvents() -> [String]! {
    return [
      AudioPlayerEvents.PLAYING_DID_FINISH.rawValue,
      AudioPlayerEvents.PLAYING_DID_INTERRUPT.rawValue,
    ]
  }
  
  func setupRemoteTransportControls() {
    // Get the shared MPRemoteCommandCenter
    let commandCenter = MPRemoteCommandCenter.shared()
    
    // Add handler for Play Command
    commandCenter.playCommand.addTarget { [unowned self] event in
      let result = audioPlayer.play(audioPlayer.playingTime)
      return result ? .success : .commandFailed
    }
    
    // Add handler for Pause Command
    commandCenter.pauseCommand.addTarget { [unowned self] event in
      let result = audioPlayer.pause()
      return result ? .success : .commandFailed
    }
  }
  
  override class func requiresMainQueueSetup() -> Bool {
    return false
  }
  
  func setupNowPlaying(title: String, coverRemotePath: String) {
    // Define Now Playing Info
    var nowPlayingInfo = [String : Any]()
    nowPlayingInfo[MPMediaItemPropertyTitle] = title
    
    do {
      let url = URL(string: coverRemotePath)
      
      if let url = url {
        let data = try Data(contentsOf: url)
        let cover = UIImage(data: data)
        
        if let cover = cover {
          nowPlayingInfo[MPMediaItemPropertyArtwork] =
          MPMediaItemArtwork(boundsSize: cover.size) { size in
            return cover
          }
        }
      }
    }
    catch{
      print(error)
    }
    
    nowPlayingInfo[MPNowPlayingInfoPropertyElapsedPlaybackTime] = audioPlayer.playingTime
    nowPlayingInfo[MPMediaItemPropertyPlaybackDuration] = audioPlayer.duration
    
    // Set the metadata
    MPNowPlayingInfoCenter.default().nowPlayingInfo = nowPlayingInfo
  }
  
  @objc func setToPlayFile(_ fileInfo: Dictionary<String, String>,
                           resolver resolve: RCTPromiseResolveBlock,
                           rejecter reject: RCTPromiseRejectBlock) {
    let filePath = fileInfo["filePath"]
    let fileTitle = fileInfo["fileTitle"]
    let coverPath = fileInfo["coverPath"]
    
    let initError = audioPlayer.initFileToPlay(at: filePath.value)
    
    if let initError = initError {
      reject("File init failed", initError.localizedDescription, initError)
    } else {
      setupNowPlaying(title: fileTitle.value, coverRemotePath: coverPath.value)
      resolve(true)
    }
  }
  
  @objc func startPlayingFromTime(_ time: Double,
                                  resolver resolve: RCTPromiseResolveBlock,
                                  rejecter reject: RCTPromiseRejectBlock) {
    let isPlayingStarted = audioPlayer.play(time)
    
    if isPlayingStarted {
      resolve(true)
      
      //            ZRKKeepAwake.activate()
    } else {
      reject(nil, nil, nil)
    }
  }
  
  @objc func stopPlaying(_ resolve: RCTPromiseResolveBlock,
                         rejecter reject: RCTPromiseRejectBlock) {
    
    let isPlayingStopped = audioPlayer.stop()
    
    if isPlayingStopped {
      resolve(true)
      
      //            ZRKKeepAwake.deactivate()
    } else {
      reject(nil, nil, nil)
    }
  }
  
  @objc func getCurrentPlayingTime(_ resolve: RCTPromiseResolveBlock,
                                 rejecter reject: RCTPromiseRejectBlock) {
    resolve(audioPlayer.playingTime)
  }
  
  @objc func rewindPlayingToTime(_ time: Double,
                                 resolver resolve: RCTPromiseResolveBlock,
                                 rejecter reject: RCTPromiseRejectBlock) {
    audioPlayer.rewind(time)
    
    resolve(true)
  }
  
  @objc func pausePlaying(_ resolve: RCTPromiseResolveBlock,
                          rejecter reject: RCTPromiseRejectBlock) {
    let isPlayingPaused = audioPlayer.pause()
    
    if isPlayingPaused {
      resolve(["playingTime": audioPlayer.playingTime])
      
      //            ZRKKeepAwake.deactivate()
    } else {
      reject(nil, nil, nil)
    }
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
      
      audioPlayer.pause()
      
      sendEvent(withName: AudioPlayerEvents.PLAYING_DID_INTERRUPT.rawValue, body: ["playingTime": audioPlayer.playingTime])
      
      //            ZRKKeepAwake.deactivate()
    default :
      return
    }
  }
  
  
  // MARK: ZRKAudioPlayerDelegate
  
  func playerDidFinishPlaying() {
    sendEvent(withName: AudioPlayerEvents.PLAYING_DID_FINISH.rawValue, body: true)
    
    //        ZRKKeepAwake.deactivate()
  }
  
}

