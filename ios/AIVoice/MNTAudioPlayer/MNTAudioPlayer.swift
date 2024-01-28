import Foundation
import AVFoundation
import MediaPlayer

@objc protocol MNTAudioPlayerDelegate {
  func playerDidFinishPlaying()
}

@objc(MNTAudioPlayer)
class MNTAudioPlayer: NSObject, AVAudioPlayerDelegate {
  @objc static let shared = MNTAudioPlayer()
  @objc weak var delegate: MNTAudioPlayerDelegate?
  
  private var audioPlayer: AVAudioPlayer?
  
  private var playingSession: AVAudioSession {
    return AVAudioSession.sharedInstance()
  }
  
  @objc var duration: Double {
    audioPlayer?.duration ?? 0
  }
  
  @objc var isPlaying: Bool {
    audioPlayer?.isPlaying ?? false
  }
  
  @objc var filePath: String?
  
  @objc var playingTime: Double { audioPlayer?.currentTime ?? 0 }
  
  override init() {
    super.init()
    setupRemoteTransportControls()
  }
  
  @objc func initFileToPlay(at path: String) -> NSError? {
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
  
  @objc func play(_ fromTime: Double) -> Bool {
    guard let audioPlayer = audioPlayer else {
      return false
    }
    
    audioPlayer.currentTime = fromTime
    
    let success = audioPlayer.play()
    
    if success {
      MPNowPlayingInfoCenter.default().nowPlayingInfo?[MPNowPlayingInfoPropertyElapsedPlaybackTime] = fromTime
    }
    
    return success
  }
  
  @objc func rewind(_ toTime: Double) {
    audioPlayer?.currentTime = toTime
  }
  
  @objc func stop() -> Bool {
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
  
  @objc func pause() -> Bool {
    guard let audioPlayer = audioPlayer else {
      return false
    }
    
    audioPlayer.pause()
    
    return true
  }
  
  private func setupRemoteTransportControls() {
    let commandCenter = MPRemoteCommandCenter.shared()
    commandCenter.skipForwardCommand.isEnabled = true
    commandCenter.skipForwardCommand.preferredIntervals = [15]
    commandCenter.skipBackwardCommand.isEnabled = true
    commandCenter.skipBackwardCommand.preferredIntervals = [15]
    commandCenter.nextTrackCommand.isEnabled = false
    commandCenter.previousTrackCommand.isEnabled = false
    
    commandCenter.playCommand.addTarget { [unowned self] event in
      MPNowPlayingInfoCenter.default().nowPlayingInfo?[MPNowPlayingInfoPropertyElapsedPlaybackTime] = playingTime
      
      let result = play(playingTime)

      
      return result ? .success : .commandFailed
    }
    
    commandCenter.pauseCommand.addTarget { [unowned self] event in
      let result = pause()
      
      MPNowPlayingInfoCenter.default().nowPlayingInfo?[MPNowPlayingInfoPropertyElapsedPlaybackTime] = playingTime
      return result ? .success : .commandFailed
    }
    
    commandCenter.changePlaybackPositionCommand.addTarget { [unowned self] event in
      let time = (event as? MPChangePlaybackPositionCommandEvent)?.positionTime ?? 0
      
      let result = play(time)
      
      MPNowPlayingInfoCenter.default().nowPlayingInfo?[MPNowPlayingInfoPropertyElapsedPlaybackTime] = time

      return result ? .success : .commandFailed
    }
    
    commandCenter.skipForwardCommand.addTarget { [unowned self] event in
      let skipInterval = (event as? MPSkipIntervalCommandEvent)?.interval ?? 0
      
      var time = playingTime + skipInterval
      if (time > duration) {
        time = 0
        let result = stop()
        
        MPNowPlayingInfoCenter.default().nowPlayingInfo?[MPNowPlayingInfoPropertyElapsedPlaybackTime] = playingTime

        return result ? .success : .commandFailed
      } else {
        let result = play(time)
        
        MPNowPlayingInfoCenter.default().nowPlayingInfo?[MPNowPlayingInfoPropertyElapsedPlaybackTime] = playingTime

        return result ? .success : .commandFailed
      }
    }
    
    commandCenter.skipBackwardCommand.addTarget { [unowned self] event in
      let skipInterval = (event as? MPSkipIntervalCommandEvent)?.interval ?? 0
      
      var time = playingTime - skipInterval
      if (time < 0) {
        time = 0
      }
      
      let result = play(time)
      
      MPNowPlayingInfoCenter.default().nowPlayingInfo?[MPNowPlayingInfoPropertyElapsedPlaybackTime] = time
      
      return result ? .success : .commandFailed
    }
  }
  
  @objc func setupNowPlaying(title: String, coverRemotePath: String) {
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
    
    nowPlayingInfo[MPNowPlayingInfoPropertyElapsedPlaybackTime] = playingTime
    nowPlayingInfo[MPMediaItemPropertyPlaybackDuration] = duration
    
    // Set the metadata
    MPNowPlayingInfoCenter.default().nowPlayingInfo = nowPlayingInfo
  }
  
  // MARK: AVAudioPlayerDelegate
  
  func audioPlayerDidFinishPlaying(_ player: AVAudioPlayer, successfully flag: Bool) {
    self.delegate?.playerDidFinishPlaying()
  }
}

