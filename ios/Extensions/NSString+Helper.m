#import "NSString+Helper.h"

@implementation NSString (Helper)

-(NSString*)extenstionToLowercase {
  return [self extenstionToLowercaseWithCustomExtension: nil];
}

-(NSString*)extenstionToLowercaseWithCustomExtension: (nullable NSString *) customExtension {
  NSArray* pathArray = [[self componentsSeparatedByString:@"."] mutableCopy];
  NSString* extension = customExtension == nil ? [[pathArray lastObject] lowercaseString] : customExtension.lowercaseString;

  if (pathArray.count > 0) {
    return [NSString stringWithFormat:@"%@.%@", [pathArray firstObject], extension];
  } else {
    return self;
  }
}

-(NSString*)cachedName {
  NSArray* pathArray = [[self componentsSeparatedByString:@"/"] mutableCopy];
  NSString* fileName = [pathArray lastObject];

  if (pathArray.count >= 2) {
    return [NSString stringWithFormat:@"%@/%@", [pathArray objectAtIndex:pathArray.count - 2], fileName];
  } else {
    return self;
  }
}

-(NSString*)normalizeExtensionForImage {
  return [self normalizeExtensionForImageWithExtension:nil];
}

-(NSString*)normalizeExtensionForImageWithExtension: (nullable NSString *) customExtension {
  NSArray* pathArray = [[self componentsSeparatedByString:@"."] mutableCopy];
  NSString* extension = customExtension == nil ? [[pathArray lastObject] lowercaseString] : customExtension.lowercaseString;

  if (pathArray.count > 0) {
    return [NSString stringWithFormat:@"%@.%@", [pathArray firstObject], extension];
  } else {
    return self;
  }
}

-(NSString*)normalizeExtensionForVideo {
  NSArray* pathArray = [[self componentsSeparatedByString:@"."] mutableCopy];
  NSString* extension = [[pathArray lastObject] lowercaseString];

  if (pathArray.count > 0) {
    return [NSString stringWithFormat:@"%@.mp4", [pathArray firstObject]];
  } else {
    return self;
  }
}

-(BOOL)isCloudName {
  NSError *error = nil;
  NSString* regexp = @"\\b[\\s\\S]{8}\\b-[\\s\\S]{4}-[\\s\\S]{4}-[\\s\\S]{4}-\\b[\\s\\S]{12}\\b";
  NSRegularExpression *regex = [NSRegularExpression regularExpressionWithPattern:regexp options:0 error:&error];
  NSArray* matches = [regex matchesInString:self options:0 range:NSMakeRange(0, [self length])];

  return matches.count > 0;
}

-(BOOL)isGalleryName {
  NSError *error = nil;
  NSString* regexp = @"IMG_[0-9]{4}";
  NSRegularExpression *regex = [NSRegularExpression regularExpressionWithPattern:regexp options:0 error:&error];
  NSArray* matches = [regex matchesInString:self options:0 range:NSMakeRange(0, [self length])];

  return matches.count > 0;
}

-(NSString*)changeImageName {
  return [self changeImageNameWithCustomExtension:nil];
}

-(NSString*)changeImageNameWithCustomExtension: (nullable NSString *) customExtension {
  return [[self replaceNameWithRegxp:@"IMG_" toName:@"Photo "] extenstionToLowercaseWithCustomExtension:customExtension];
}

-(NSString*)changeCloudImageName {
  if ([self isGalleryName]) {
    return [self changeImageName];
  } else {
    return [NSString stringWithFormat:@"Photo %@.jpg", [[self substringToIndex:4] uppercaseString]];
  }
}

+ (NSString*)getPatternNameForType: (AssetType) type andDate: (NSDate*)date {
  return [NSString getPatternNameForType:type andDate:date extension:nil];
}

+ (NSString*)getPatternNameForType: (AssetType) type andDate: (NSDate*)date extension: (nullable NSString*)extension {
    NSDateFormatter *dateFormatter = [[NSDateFormatter alloc] init];
    [dateFormatter setDateFormat:@"yyyyMMddHHmmss"];
    
    switch (type) {
      case PHOTO:
        return [NSString stringWithFormat:@"Photo %@.%@", [dateFormatter stringFromDate:date], extension == nil ? @"jpg" : extension];
        break;
      
      case VIDEO:
        return [NSString stringWithFormat:@"Video %@.%@", [dateFormatter stringFromDate:date], extension == nil ? @"mp4" : extension];
        break;
        
      case VOICE:
        return [NSString stringWithFormat:@"Voice %@.%@", [dateFormatter stringFromDate:date], extension == nil ? @"m4a" : extension];
        break;
        
      default:
        break;
  }
}

+ (NSString*)changeNameWithURL:(NSURL*) url withType:(AssetType) type withDate: (nullable NSDate*) date {
  return [NSString changeNameWithURL:url withType:type withDate:date withExtension:nil];
}

+ (NSString*)changeNameWithURL:(NSURL*) url withType:(AssetType) type withDate: (nullable NSDate*) date withExtension: (nullable NSString*) customExtension {
  NSError* error;
  NSDictionary* attr = [[NSFileManager defaultManager] attributesOfItemAtPath:[url relativePath] error:&error];
  NSString* extension = customExtension == nil ? url.pathExtension.lowercaseString : customExtension.lowercaseString;
  
  if (!error) {
    NSDate* dateCreate = date == nil ? attr[NSFileCreationDate] : date;
    
    return [NSString getPatternNameForType:type andDate:dateCreate extension: extension];
  }
  
  return [url lastPathComponent];
}

-(NSString*)changeVideoName {
  return [self changeVideoNameWithCustomExtension:nil];
}

-(NSString*)changeVideoNameWithCustomExtension: (nullable NSString *) customExtension {
  return [[self replaceNameWithRegxp:@"IMG_" toName:@"Video "] extenstionToLowercaseWithCustomExtension:customExtension];
}

-(NSString*)changeCloudVideoName {
  if ([self isGalleryName]) {
    return [self changeVideoName];
  } else {
    return [NSString stringWithFormat:@"Video %@.mp4", [[self substringToIndex:4] uppercaseString]];
  }
}

- (BOOL)isPatternName {
  NSError *error = nil;
  NSRegularExpression *regex = [NSRegularExpression regularExpressionWithPattern:@"^(Photo |Video )"
                                                                         options:0
                                                                           error:&error];
  return [regex firstMatchInString:self
                           options:0
                             range:NSMakeRange(0, [self length])] != nil;
}

-(NSString*)replaceNameWithRegxp:(NSString*) regexp toName:(NSString*) name {
  NSError *error = nil;
  NSRegularExpression *regex = [NSRegularExpression regularExpressionWithPattern:regexp options:0 error:&error];
  NSString *modifiedString = [regex
                              stringByReplacingMatchesInString:self
                              options:0
                              range:NSMakeRange(0, [self length])
                              withTemplate:name];
  
  if (error) {
    return self;
  } else {
    return modifiedString;
  }
}

-(NSString*)nameFromAdjustmentPath {
  NSArray* components = [self componentsSeparatedByString:@"/"];
  NSString* extension = [[[self componentsSeparatedByString:@"."] lastObject] lowercaseString];

  for (NSString* component in components) {
    if ([component containsString:@"IMG_"]) {
      return [[NSString stringWithFormat:@"%@.%@", component, extension] changeImageName];
    }
  }

  return self;
}

@end
