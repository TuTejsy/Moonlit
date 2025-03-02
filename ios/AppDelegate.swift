//
//  AppDelegate.swift
//  AIVoice
//
//  Created by VASILI HRYB on 02.03.25.
//

import UIKit
import React
import React_RCTAppDelegate
import ReactAppDependencyProvider
import Firebase

@main
class AppDelegate: RCTAppDelegate {
  override func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey : Any]? = nil) -> Bool {
    FirebaseApp.configure()
    self.moduleName = "AIVoice"
    self.dependencyProvider = RCTAppDependencyProvider()
    
    FileHelper.shared

    // You can add your custom initial props in the dictionary below.
    // They will be passed down to the ViewController used by React Native.
    self.initialProps = [:]
    
    let result = super.application(application, didFinishLaunchingWithOptions: launchOptions)
    
    if (result) {
      let rootView: RCTSurfaceHostingProxyRootView = window.rootViewController?.view as! RCTSurfaceHostingProxyRootView;
      let storyboard = UIStoryboard(name: "LaunchScreen", bundle: nil)
      
      guard let storyboardVew = storyboard.instantiateInitialViewController()?.view else {
        return result
      }
      
      rootView.loadingView = storyboardVew
      
      let imageView = UIImageView.init(image: UIImage(named: "LaunchScreen"))
    
      if (imageView.bounds.size.height > rootView.bounds.size.height) {
        let heightDiff = imageView.bounds.size.height - rootView.bounds.size.height;
        
        imageView.layer.frame = CGRectMake(rootView.bounds.origin.x, -heightDiff / 2, rootView.bounds.size.width, imageView.bounds.size.height);
      } else {
        let widthRatio = rootView.bounds.size.width / imageView.bounds.size.width;
        let newImageHeight = imageView.bounds.size.height * widthRatio;
        let heightDiff = newImageHeight - rootView.bounds.size.height;
        
        if (heightDiff > 0) {
          imageView.layer.frame = CGRectMake(rootView.bounds.origin.x, -heightDiff / 2, imageView.bounds.size.width * widthRatio, newImageHeight);
        } else {
          imageView.layer.frame = rootView.bounds;
        }
      }
          
      rootView.layer.insertSublayer(imageView.layer, at: 0)
    }

    return result
  }

  override func sourceURL(for bridge: RCTBridge) -> URL? {
    self.bundleURL()
  }

  override func bundleURL() -> URL? {
#if DEBUG
    RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index")
#else
    Bundle.main.url(forResource: "main", withExtension: "jsbundle")
#endif
  }
}

