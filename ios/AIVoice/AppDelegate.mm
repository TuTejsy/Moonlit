#import "AppDelegate.h"

#import <React/RCTRootView.h>
#import <React/RCTBundleURLProvider.h>

#import <AVFoundation/AVFoundation.h>
#import <Firebase.h>

#import "AIVoice-Swift.h"


@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  [FIRApp configure];
  
  self.moduleName = @"AIVoice";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};
  
  [FileHelper shared];

  BOOL result = [super application:application didFinishLaunchingWithOptions:launchOptions];
  
  if (result) {
    RCTRootView *rootView = (RCTRootView *)self.window.rootViewController.view;
    UIStoryboard *storyboard = [UIStoryboard storyboardWithName:@"LaunchScreen" bundle:nil];
    [rootView setLoadingView:[[storyboard instantiateInitialViewController] view]];
    
//    CAGradientLayer *gradient = [CAGradientLayer layer];
//    gradient.frame = rootView.bounds;
//    gradient.colors = [NSArray arrayWithObjects:(id)[[UIColor colorNamed:@"Purple"] CGColor], (id)[[UIColor colorNamed:@"DarkPurple"] CGColor], nil];
    
    UIImageView *imageView = [[UIImageView alloc] initWithImage:[UIImage imageNamed:@"LaunchScreen"]];
  
    if (imageView.bounds.size.height > rootView.bounds.size.height) {
      double heightDiff = imageView.bounds.size.height - rootView.bounds.size.height;
      
      imageView.layer.frame = CGRectMake(rootView.bounds.origin.x, -heightDiff / 2, rootView.bounds.size.width, imageView.bounds.size.height);
    } else {
      double widthRatio = rootView.bounds.size.width / imageView.bounds.size.width;
      double newImageHeight = imageView.bounds.size.height * widthRatio;
      double heightDiff = newImageHeight - rootView.bounds.size.height;
      
      if (heightDiff > 0) {
        imageView.layer.frame = CGRectMake(rootView.bounds.origin.x, -heightDiff / 2, imageView.bounds.size.width * widthRatio, newImageHeight);
      } else {
        imageView.layer.frame = rootView.bounds;
      }
    }
        
    [rootView.layer insertSublayer:imageView.layer atIndex:0];
  }
    
  return result;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
  return [self getBundleURL];
}

- (NSURL *)getBundleURL
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

- (BOOL)bridgelessEnabled
{
    return NO;
}

@end
