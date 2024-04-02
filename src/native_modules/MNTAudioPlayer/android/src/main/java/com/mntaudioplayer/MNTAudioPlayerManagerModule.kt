package com.mntaudioplayer;

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.WritableMap

class MNTAudioPlayerManagerModule(reactContext: ReactApplicationContext) : NativeMNTAudioPlayerManagerSpec(reactContext) {

  override fun getName() = NAME
  override fun getCurrentState(): WritableMap {
    TODO("Not yet implemented")
  }

  override fun pausePlaying(): WritableMap {
    TODO("Not yet implemented")
  }

  override fun rewindPlayingToTime(time: Double): Boolean {
    TODO("Not yet implemented")
  }

  override fun setToPlayFile(fileInfo: ReadableMap?): Boolean {
    TODO("Not yet implemented")
  }

  override fun startPlayingFromTime(time: Double): Boolean {
    TODO("Not yet implemented")
  }

  override fun stopPlaying(): Boolean {
    TODO("Not yet implemented")
  }

  override fun addListener(eventType: String) {
    TODO("Not yet implemented")
  }

  override fun removeListeners(count: Double) {
    TODO("Not yet implemented")
  }

  companion object {
    const val NAME = "MNTAudioPlayerManager"
  }
}