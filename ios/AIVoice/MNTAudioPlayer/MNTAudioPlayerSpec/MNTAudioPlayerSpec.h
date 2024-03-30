/**
 * This code was generated by [react-native-codegen](https://www.npmjs.com/package/react-native-codegen).
 *
 * Do not edit this file as changes may cause incorrect behavior and will be lost
 * once the code is regenerated.
 *
 * @generated by codegen project: GenerateModuleObjCpp
 *
 * We create an umbrella header (and corresponding implementation) here since
 * Cxx compilation in BUCK has a limitation: source-code producing genrule()s
 * must have a single output. More files => more genrule()s => slower builds.
 */

#ifndef __cplusplus
#error This file must be compiled as Obj-C++. If you are importing it, you must change your file extension to .mm.
#endif
#import <Foundation/Foundation.h>
#import <RCTRequired/RCTRequired.h>
#import <RCTTypeSafety/RCTConvertHelpers.h>
#import <RCTTypeSafety/RCTTypedModuleConstants.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTCxxConvert.h>
#import <React/RCTManagedPointer.h>
#import <ReactCommon/RCTTurboModule.h>
#import <optional>
#import <vector>

namespace JS {
  namespace NativeAudioPlayer {
    struct SpecSetToPlayFileFileInfo {
      NSString *coverPath() const;
      NSString *filePath() const;
      NSString *fileTitle() const;

      SpecSetToPlayFileFileInfo(NSDictionary *const v) : _v(v) {}
    private:
      NSDictionary *_v;
    };
  }
}

@interface RCTCxxConvert (NativeAudioPlayer_SpecSetToPlayFileFileInfo)
+ (RCTManagedPointer *)JS_NativeAudioPlayer_SpecSetToPlayFileFileInfo:(id)json;
@end
@protocol NativeAudioPlayerSpec <RCTBridgeModule, RCTTurboModule>

- (NSDictionary *)getCurrentState;
- (NSDictionary *)pausePlaying;
- (bool)rewindPlayingToTime:(double)time;
- (bool)setToPlayFile:(JS::NativeAudioPlayer::SpecSetToPlayFileFileInfo &)fileInfo;
- (bool)startPlayingFromTime:(double)time;
- (bool)stopPlaying;
- (void)addListener:(NSString *)eventType;
- (void)removeListeners:(double)count;


@end
namespace facebook {
  namespace react {
    /**
     * ObjC++ class for module 'NativeAudioPlayer'
     */
    class JSI_EXPORT NativeAudioPlayerSpecJSI : public ObjCTurboModule {
    public:
      NativeAudioPlayerSpecJSI(const ObjCTurboModule::InitParams &params);
    };
  } // namespace react
} // namespace facebook
inline NSString *JS::NativeAudioPlayer::SpecSetToPlayFileFileInfo::coverPath() const
{
  id const p = _v[@"coverPath"];
  return RCTBridgingToString(p);
}
inline NSString *JS::NativeAudioPlayer::SpecSetToPlayFileFileInfo::filePath() const
{
  id const p = _v[@"filePath"];
  return RCTBridgingToString(p);
}
inline NSString *JS::NativeAudioPlayer::SpecSetToPlayFileFileInfo::fileTitle() const
{
  id const p = _v[@"fileTitle"];
  return RCTBridgingToString(p);
}
