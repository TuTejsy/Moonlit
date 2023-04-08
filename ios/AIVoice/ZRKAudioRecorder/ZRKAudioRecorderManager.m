#import "React/RCTBridgeModule.h"
#import "React/RCTEventEmitter.h"

@interface RCT_EXTERN_MODULE(ZRKAudioRecorderManager, RCTEventEmitter)

RCT_EXTERN_METHOD(startAudioRecording)
RCT_EXTERN_METHOD(stopAudioRecording: (RCTPromiseResolveBlock)resolve
                  rejecter: (RCTPromiseRejectBlock)reject)


@end
