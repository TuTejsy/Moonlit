import Foundation
import AVFAudio

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
    
    override class func requiresMainQueueSetup() -> Bool {
        return false
    }
    
    @objc func setToPlayFileAtPath(_ path: String,
                                   resolver resolve: RCTPromiseResolveBlock,
                                   rejecter reject: RCTPromiseRejectBlock) {
        let initError = audioPlayer.initFileToPlay(at: path)
        
        if let initError = initError {
            reject("File init failed", initError.localizedDescription, initError)
        } else {
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

