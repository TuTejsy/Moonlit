#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

typedef enum : NSUInteger {
  PHOTO,
  VIDEO,
  VOICE,
} AssetType;

@interface NSString (Helper)

-(NSString*)cachedName;
-(NSString*)changeImageName;
-(NSString*)changeVideoName;
-(NSString*)changeCloudImageName;
-(NSString*)changeCloudVideoName;
-(NSString*)extenstionToLowercase;
-(NSString*)nameFromAdjustmentPath;
-(NSString*)normalizeExtensionForImage;
-(NSString*)normalizeExtensionForVideo;
+(NSString*)getPatternNameForType: (AssetType) type andDate: (NSDate*)date;
-(NSString*)changeImageNameWithCustomExtension: (nullable NSString *) customExtension;
-(NSString*)changeVideoNameWithCustomExtension: (nullable NSString *) customExtension;
+(NSString*)getPatternNameForType: (AssetType) type andDate: (NSDate*)date extension: (nullable NSString *)extension;
-(NSString*)normalizeExtensionForImageWithExtension: (nullable NSString *) customExtension;
-(NSString*)extenstionToLowercaseWithCustomExtension: (nullable NSString *) customExtension;
+(NSString*)getPatternNameForType: (AssetType) type andDate: (NSDate*)date extension: (nullable NSString *)extension;
+(NSString*)changeNameWithURL:(NSURL*) url withType:(AssetType) type withDate: (nullable NSDate*) date;
+(NSString*)changeNameWithURL:(NSURL*) url withType:(AssetType) type withDate: (nullable NSDate*) date withExtension: (nullable NSString*)customExtension;

-(BOOL)isCloudName;
-(BOOL)isGalleryName;
-(BOOL)isPatternName;

@end

NS_ASSUME_NONNULL_END
