#import <AVFAudio/AVFAudio.h>
#import "MNTAudioPlayerSpec.h"
#import "MNTAudioPlayerManager.h"

@interface MNTAudioPlayerManager()

@property (nonatomic, strong) MNTAudioPlayer* audioPlayer;

@end

@implementation MNTAudioPlayerManager

RCT_EXPORT_MODULE()


- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeAudioPlayerSpecJSI>(params);
}

- (instancetype)init
{
  self = [super init];
  if (self) {
    self.audioPlayer = MNTAudioPlayer.shared;
    self.audioPlayer.delegate = self;
    
    [NSNotificationCenter.defaultCenter addObserver:self selector:@selector(handleInterruption:) name:AVAudioSessionInterruptionNotification object:AVAudioSession.sharedInstance];
  }
  return self;
}

- (void)dealloc
{
  [[NSNotificationCenter defaultCenter] removeObserver:self];
}

+ (BOOL)requiresMainQueueSetup {
  return true;
}

- (NSArray<NSString *> *)supportedEvents {
  return @
  [
    @"PLAYING_DID_FINISH",
    @"PLAYING_DID_INTERRUPT",
    @"PLAYING_DID_START",
    @"PLAYING_DID_PAUSE"
  ];
}

- (bool)setToPlayFile:(JS::NativeAudioPlayer::SpecSetToPlayFileFileInfo &)fileInfo {
  NSError *error = [_audioPlayer initFileToPlayAt:fileInfo.filePath()];
  
  if (error != nil) {
    NSLog(@"file init erorr: %@", error.localizedDescription);
    
    return false;
  }
  
  [_audioPlayer setupNowPlayingWithTitle:fileInfo.fileTitle() coverRemotePath:fileInfo.coverPath()];
  
  return true;
}

- (bool)startPlayingFromTime:(double)time {
  return [_audioPlayer play:time];;
}

- (bool)stopPlaying {
  return [_audioPlayer stop];
}

- (NSDictionary *)getCurrentState { 
  NSString *filePath = _audioPlayer.filePath;
  
  if (filePath == nil) {
    filePath = @"";
  }
  
  return @{
    @"playingTime": @(_audioPlayer.playingTime),
    @"isPlaying": @(_audioPlayer.isPlaying),
    @"filePath": filePath,
  };
}

- (NSDictionary *)pausePlaying { 
  BOOL isPlayingPaused = [_audioPlayer pause];
  
  if (isPlayingPaused) {
    return @{@"playingTime": @(_audioPlayer.playingTime)};
  } else {
    return nil;
  }
}

- (bool)rewindPlayingToTime:(double)time {
  [_audioPlayer rewind:time];
  
  return true;
}

- (void)handleInterruption:(NSNotification *)notification {
  NSUInteger interruptionType = [[notification.userInfo valueForKey:AVAudioSessionInterruptionTypeKey] integerValue];
  
  switch (interruptionType) {
    case AVAudioSessionInterruptionTypeBegan: {
      BOOL paused = [_audioPlayer pause];
      
      [self sendEventWithName:@"PLAYING_DID_INTERRUPT" body:@{ @"playingTime": @(_audioPlayer.playingTime)}];
      
      break;
    }
      
    default:
      break;
  }
}

#pragma mark - MNTAudioPlayerDelegate

- (void)playerDidFinishPlaying {
  [self sendEventWithName:@"PLAYING_DID_FINISH" body: @{}];
}

- (void)playerDidStartPlayingWithPlayingTime:(double)playingTime {
  [self sendEventWithName:@"PLAYING_DID_START" body:@{ @"playingTime": @(playingTime)}];
}

- (void)playerDidPausedPlayingWithPlayingTime:(double)playingTime {
  [self sendEventWithName:@"PLAYING_DID_PAUSE" body:@{ @"playingTime": @(playingTime)}];
}

@end
