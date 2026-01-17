//
//  AppDelegate.swift
//  AIVoice
//
//  Created by VASILI HRYB on 02.03.25.
//

import Firebase
import React
import ReactAppDependencyProvider
import React_RCTAppDelegate
import UIKit

@main
class AppDelegate: UIResponder, UIApplicationDelegate {
  var window: UIWindow?

  var reactNativeDelegate: ReactNativeDelegate?
  var reactNativeFactory: RCTReactNativeFactory?

  func application(
    _ application: UIApplication,
    didFinishLaunchingWithOptions launchOptions: [UIApplication
      .LaunchOptionsKey: Any]? = nil
  ) -> Bool {
    let delegate = ReactNativeDelegate()
    let factory = RCTReactNativeFactory(delegate: delegate)
    delegate.dependencyProvider = RCTAppDependencyProvider()

    // Need to init FileHelper that creates required directories
    FileHelper.shared

    reactNativeDelegate = delegate
    reactNativeFactory = factory

    window = UIWindow(frame: UIScreen.main.bounds)

    factory.startReactNative(
      withModuleName: "AIVoice",
      in: window,
      launchOptions: launchOptions
    )

    if let window = window {
      let rootView: RCTSurfaceHostingProxyRootView =
        window.rootViewController?.view as! RCTSurfaceHostingProxyRootView
      let storyboard = UIStoryboard(name: "LaunchScreen", bundle: nil)

      guard
        let storyboardVew = storyboard.instantiateInitialViewController()?.view
      else {
        return true
      }

      rootView.loadingView = storyboardVew

      let imageView = UIImageView.init(image: UIImage(named: "LaunchScreen"))

      if imageView.bounds.size.height > rootView.bounds.size.height {
        let heightDiff =
          imageView.bounds.size.height - rootView.bounds.size.height

        imageView.layer.frame = CGRectMake(
          rootView.bounds.origin.x,
          -heightDiff / 2,
          rootView.bounds.size.width,
          imageView.bounds.size.height
        )
      } else {
        let widthRatio =
          rootView.bounds.size.width / imageView.bounds.size.width
        let newImageHeight = imageView.bounds.size.height * widthRatio
        let heightDiff = newImageHeight - rootView.bounds.size.height

        if heightDiff > 0 {
          imageView.layer.frame = CGRectMake(
            rootView.bounds.origin.x,
            -heightDiff / 2,
            imageView.bounds.size.width * widthRatio,
            newImageHeight
          )
        } else {
          imageView.layer.frame = rootView.bounds
        }
      }

      rootView.layer.insertSublayer(imageView.layer, at: 0)
    }

    return true
  }
}

class ReactNativeDelegate: RCTDefaultReactNativeFactoryDelegate {
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
