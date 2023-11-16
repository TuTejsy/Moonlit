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
    let commandCenter = MPRemoteCommandCenter.shared()
    commandCenter.skipForwardCommand.isEnabled = true
    commandCenter.skipForwardCommand.preferredIntervals = [15]
    commandCenter.skipBackwardCommand.isEnabled = true
    commandCenter.skipBackwardCommand.preferredIntervals = [15]
    commandCenter.nextTrackCommand.isEnabled = false
    commandCenter.previousTrackCommand.isEnabled = false
    
    commandCenter.playCommand.addTarget { [unowned self] event in
      MPNowPlayingInfoCenter.default().nowPlayingInfo?[MPNowPlayingInfoPropertyElapsedPlaybackTime] = audioPlayer.playingTime
      
      let result = audioPlayer.play(audioPlayer.playingTime)

      
      return result ? .success : .commandFailed
    }
    
    commandCenter.pauseCommand.addTarget { [unowned self] event in
      let result = audioPlayer.pause()
      
      MPNowPlayingInfoCenter.default().nowPlayingInfo?[MPNowPlayingInfoPropertyElapsedPlaybackTime] = audioPlayer.playingTime
      return result ? .success : .commandFailed
    }
    
    commandCenter.changePlaybackPositionCommand.addTarget { [unowned self] event in
      let time = (event as? MPChangePlaybackPositionCommandEvent)?.positionTime ?? 0
      
      let result = audioPlayer.play(time)
      
      MPNowPlayingInfoCenter.default().nowPlayingInfo?[MPNowPlayingInfoPropertyElapsedPlaybackTime] = time

      return result ? .success : .commandFailed
    }
    
    commandCenter.skipForwardCommand.addTarget { [unowned self] event in
      let skipInterval = (event as? MPSkipIntervalCommandEvent)?.interval ?? 0
      
      var time = audioPlayer.playingTime + skipInterval
      if (time > audioPlayer.duration) {
        time = 0
        let result = audioPlayer.stop()
        
        MPNowPlayingInfoCenter.default().nowPlayingInfo?[MPNowPlayingInfoPropertyElapsedPlaybackTime] = audioPlayer.playingTime

        return result ? .success : .commandFailed
      } else {
        let result = audioPlayer.play(time)
        
        MPNowPlayingInfoCenter.default().nowPlayingInfo?[MPNowPlayingInfoPropertyElapsedPlaybackTime] = audioPlayer.playingTime

        return result ? .success : .commandFailed
      }
    }
    
    commandCenter.skipBackwardCommand.addTarget { [unowned self] event in
      let skipInterval = (event as? MPSkipIntervalCommandEvent)?.interval ?? 0
      
      var time = audioPlayer.playingTime - skipInterval
      if (time < 0) {
        time = 0
      }
      
      let result = audioPlayer.play(time)
      
      MPNowPlayingInfoCenter.default().nowPlayingInfo?[MPNowPlayingInfoPropertyElapsedPlaybackTime] = time
      
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
    nowPlayingInfo[MPMediaItemPropertyArtist] = "Moonlit"
    nowPlayingInfo[MPMediaItemPropertyAlbumTrackCount] = 1
    
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
      
      MPNowPlayingInfoCenter.default().nowPlayingInfo?[MPNowPlayingInfoPropertyElapsedPlaybackTime] = time
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
  
  @objc func getCurrentState(_ resolve: RCTPromiseResolveBlock,
                                 rejecter reject: RCTPromiseRejectBlock) {
    resolve(["playingTime": audioPlayer.playingTime,
             "isPlaying": audioPlayer.isPlaying])
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

