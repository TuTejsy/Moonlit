#import "ZRKNative.h"

#import <React/RCTLog.h>
#import <React/RCTConvert.h>

@implementation ZRKNative

RCT_EXPORT_MODULE();

- (instancetype)init {
    self = [super init];
    return self;
}

+ (BOOL)requiresMainQueueSetup {
    return YES;
}

- (NSDictionary *)constantsToExport {
    [ZRKNative getDeviceInformation];
    
    NSString *bundleId = [ZRKNative bundleID];
    
    return @{
        @"bundleId": bundleId,
        @"isAppStoreBuild": [NSNumber numberWithBool:[ZRKNative isAppStoreBuild]],
        @"isTestFlightBuild": [NSNumber numberWithBool:[ZRKNative isTestFlight]],
    };
}

+ (BOOL)isAppStoreBuild {
    #if DEBUG
    return false;
    #else
    return [ZRKNative isTestFlight] ? false : true;
    #endif
}

+ (BOOL)isTestFlight {
    NSURL *appStoreReceiptURL = NSBundle.mainBundle.appStoreReceiptURL;
    NSString *appStoreReceiptLastComponent = appStoreReceiptURL.lastPathComponent;
    BOOL isSandboxReceipt = [appStoreReceiptLastComponent isEqualToString:@"sandboxReceipt"];
    return isSandboxReceipt;
}

+ (NSString *)bundleID {
    return [[[NSBundle mainBundle] infoDictionary] objectForKey: @"CFBundleIdentifier"];
}

+ (void)getDeviceInformation {
    NSDictionary *infoDictionary = [[NSBundle mainBundle] infoDictionary];

    NSString *bundleId = [ZRKNative bundleID];
    NSString* version = [infoDictionary valueForKey:@"CFBundleVersion"];
    NSString* buildVersion = [infoDictionary valueForKey:@"DTPlatformVersion"];
    NSString* platformVersion = [infoDictionary valueForKey:@"CFBundleShortVersionString"];
}

@end
