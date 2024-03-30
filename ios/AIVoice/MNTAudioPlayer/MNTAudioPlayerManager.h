#import <React/RCTEventEmitter.h>
#import "MNTAudioPlayerSpec.h"
#import "AIVoice-Swift.h"

NS_ASSUME_NONNULL_BEGIN

@interface MNTAudioPlayerManager: RCTEventEmitter<NativeAudioPlayerSpec, MNTAudioPlayerDelegate>

@end

NS_ASSUME_NONNULL_END
