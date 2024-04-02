//
//  MNTShareManager.cpp
//  AIVoice
//
//  Created by VASILI HRYB on 31.01.24.
//

#import <React/RCTUtils.h>
#import <React/RCTConvert.h>
#import <AVFoundation/AVFoundation.h>
#import "MNTShareManagerSpec.h"
#import "MNTShareManager.h"
#import "AIVoice-Swift.h"

@implementation MNTShareManager

RCT_EXPORT_MODULE()


- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeShareManagerSpecJSI>(params);
}


- (void)presentViewController:(UIViewController *)alertController
       onParentViewController:(UIViewController *)parentViewController
{
  alertController.modalPresentationStyle = UIModalPresentationPopover;
  UIView *sourceView = parentViewController.view;

  {
    alertController.popoverPresentationController.permittedArrowDirections = 0;
  }
  alertController.popoverPresentationController.sourceView = sourceView;
  alertController.popoverPresentationController.sourceRect = sourceView.bounds;
  [parentViewController presentViewController:alertController animated:YES completion:nil];
}

- (void)share:(JS::NativeShareManager::ShareOptions &)options {
  NSMutableArray<id> *items = [NSMutableArray array];
  NSString *message = options.message();
  
  if (message) {
    [items addObject:message];
  }
  
  NSURL *url = [NSURL URLWithString:options.url()];
  
  if (url) {
    MNTActivityItemSource *activityItemSource = [[MNTActivityItemSource alloc] initWithTitle:options.title() text:message url: url subtitle:options.subtitle()];
    
    [items addObject:activityItemSource];
  }
  
  if (items.count == 0) {
    NSLog(@"%@", @"No `url` or `message` to share");
    
    return;
  }
  
  UIActivityViewController *shareController = [[UIActivityViewController alloc] initWithActivityItems:items
                                                                                applicationActivities:nil];
  
  UIViewController *controller = RCTPresentedViewController();
  UIColor *tintColor = [RCTConvert UIColor:options.tintColor() ? options.tintColor() : nil];
  NSString *userInterfaceStyle = [RCTConvert NSString:options.userInterfaceStyle()];
  
  dispatch_async(dispatch_get_main_queue(), ^{
    shareController.view.tintColor = tintColor;
    
    if (userInterfaceStyle == nil || [userInterfaceStyle isEqualToString:@""]) {
      shareController.overrideUserInterfaceStyle = UIUserInterfaceStyleUnspecified;
    } else if ([userInterfaceStyle isEqualToString:@"dark"]) {
      shareController.overrideUserInterfaceStyle = UIUserInterfaceStyleDark;
    } else if ([userInterfaceStyle isEqualToString:@"light"]) {
      shareController.overrideUserInterfaceStyle = UIUserInterfaceStyleLight;
    }
    
    [self presentViewController:shareController onParentViewController:controller];
  });
}

@end
