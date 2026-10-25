//
//  SceneDelegate.swift
//  AIVoice
//

import React
import UIKit

class SceneDelegate: UIResponder, UIWindowSceneDelegate {
  var window: UIWindow?

  func scene(
    _ scene: UIScene,
    willConnectTo _: UISceneSession,
    options connectionOptions: UIScene.ConnectionOptions
  ) {
    guard let windowScene = scene as? UIWindowScene,
      let appDelegate = UIApplication.shared.delegate as? AppDelegate,
      let factory = appDelegate.reactNativeFactory,
      window == nil
    else {
      return
    }

    let sceneWindow = UIWindow(windowScene: windowScene)

    factory.startReactNative(
      withModuleName: "AIVoice",
      in: sceneWindow,
      launchOptions: launchOptions(from: connectionOptions)
    )

    installLaunchOverlay(on: sceneWindow)

    window = sceneWindow
    appDelegate.window = sceneWindow
  }

  func scene(_: UIScene, openURLContexts URLContexts: Set<UIOpenURLContext>) {
    for context in URLContexts {
      RCTLinkingManager.application(
        UIApplication.shared,
        open: context.url,
        options: [:]
      )
    }
  }

  func scene(_: UIScene, continue userActivity: NSUserActivity) {
    RCTLinkingManager.application(
      UIApplication.shared,
      continue: userActivity,
      restorationHandler: { _ in }
    )
  }

  private func launchOptions(
    from connectionOptions: UIScene.ConnectionOptions
  ) -> [UIApplication.LaunchOptionsKey: Any] {
    var launchOptions: [UIApplication.LaunchOptionsKey: Any] = [:]

    if let url = connectionOptions.urlContexts.first?.url {
      launchOptions[.url] = url
    }

    if let activity = connectionOptions.userActivities.first {
      launchOptions[.userActivityDictionary] = [
        UIApplication.LaunchOptionsKey.userActivityType.rawValue: activity.activityType,
        "UIApplicationLaunchOptionsUserActivityKey": activity,
      ]
    }

    return launchOptions
  }

  private func installLaunchOverlay(on window: UIWindow) {
    guard
      let rootView = window.rootViewController?.view as? RCTSurfaceHostingProxyRootView,
      let storyboardView = UIStoryboard(name: "LaunchScreen", bundle: nil)
        .instantiateInitialViewController()?.view
    else {
      return
    }

    rootView.loadingView = storyboardView

    let imageView = UIImageView(image: UIImage(named: "LaunchScreen"))

    if imageView.bounds.size.height > rootView.bounds.size.height {
      let heightDiff = imageView.bounds.size.height - rootView.bounds.size.height

      imageView.layer.frame = CGRect(
        x: rootView.bounds.origin.x,
        y: -heightDiff / 2,
        width: rootView.bounds.size.width,
        height: imageView.bounds.size.height
      )
    } else if imageView.bounds.size.width > 0 {
      let widthRatio = rootView.bounds.size.width / imageView.bounds.size.width
      let newImageHeight = imageView.bounds.size.height * widthRatio
      let heightDiff = newImageHeight - rootView.bounds.size.height

      if heightDiff > 0 {
        imageView.layer.frame = CGRect(
          x: rootView.bounds.origin.x,
          y: -heightDiff / 2,
          width: imageView.bounds.size.width * widthRatio,
          height: newImageHeight
        )
      } else {
        imageView.layer.frame = rootView.bounds
      }
    } else {
      imageView.layer.frame = rootView.bounds
    }

    rootView.layer.insertSublayer(imageView.layer, at: 0)
  }
}
