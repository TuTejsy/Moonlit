package com.mntaudioplayer;

import com.facebook.react.TurboReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.model.ReactModuleInfo
import com.facebook.react.module.model.ReactModuleInfoProvider

class MNTAudioPlayerManagerPackage : TurboReactPackage() {
  override fun getModule(name: String, reactContext: ReactApplicationContext): NativeModule? =
    if (name == MNTAudioPlayerManagerModule.NAME) {
      MNTAudioPlayerManagerModule(reactContext)
    } else {
      null
    }
 override fun getReactModuleInfoProvider() = ReactModuleInfoProvider {
   mapOf(
     MNTAudioPlayerManagerModule.NAME to ReactModuleInfo(
       MNTAudioPlayerManagerModule.NAME,
       MNTAudioPlayerManagerModule.NAME,
       false, // canOverrideExistingModule
       false, // needsEagerInit
       false, // isCxxModule
       true // isTurboModule
     )
   )
 }
}