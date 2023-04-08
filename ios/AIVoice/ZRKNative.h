@import UIKit;

#import <React/RCTBridgeModule.h>

@interface ZRKNative : NSObject <RCTBridgeModule>

+ (BOOL)isTestFlight;
+ (NSString *)bundleID;

@end
