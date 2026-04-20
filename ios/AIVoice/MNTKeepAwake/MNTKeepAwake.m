#import "MNTKeepAwake.h"
#import "UIKit/UIKit.h"


@interface MNTKeepAwake()
  @property(class) int activateCount;
@end


@implementation MNTKeepAwake
RCT_EXPORT_MODULE();

static int _activateCount = 0;

+ (int)activateCount {
  return _activateCount;
}
+ (void)setActivateCount: (int)activateCount {
  _activateCount = activateCount;
}

+ (void)activate {
  dispatch_async(dispatch_get_main_queue(), ^{
      [[UIApplication sharedApplication] setIdleTimerDisabled:YES];
  });
  
  _activateCount++;
};

+ (void)deactivate {
  _activateCount--;
  
  if (_activateCount <= 0) {
    dispatch_async(dispatch_get_main_queue(), ^{
        [[UIApplication sharedApplication] setIdleTimerDisabled:NO];
    });
    
    _activateCount = 0;
  }
}

RCT_EXPORT_METHOD(activate) {
  [MNTKeepAwake activate];
}

RCT_EXPORT_METHOD(deactivate) {
  [MNTKeepAwake deactivate];
}

@end
