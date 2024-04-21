package com.mntaudioplayer;

import android.media.AudioAttributes
import android.media.MediaPlayer
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.WritableMap
import java.lang.Exception

class MNTAudioPlayerManagerModule(reactContext: ReactApplicationContext) : NativeMNTAudioPlayerManagerSpec(reactContext) {
  private var mediaPlayer = MediaPlayer().apply {
    setAudioAttributes(
      AudioAttributes.Builder()
        .setContentType(AudioAttributes.CONTENT_TYPE_MUSIC)
        .setUsage(AudioAttributes.USAGE_MEDIA)
        .build()
    )
  };

  private var filePath: String? = null

  override fun getName() = NAME
  override fun getCurrentState(): WritableMap {
    val map = Arguments.createMap()
    map.putDouble("playingTime", mediaPlayer.currentPosition.toDouble() / 1000)
    map.putBoolean("isPlaying", mediaPlayer.isPlaying)
    map.putString("filePath", filePath)

    return map
  }

  override fun pausePlaying(): WritableMap {
    var hasError = false
    try {
      mediaPlayer.pause()
    } catch (error: Exception) {
      hasError = true
    }

    val map = Arguments.createMap()
    map.putDouble("playingTime", mediaPlayer.currentPosition.toDouble() / 1000)

    return map
  }

  override fun rewindPlayingToTime(time: Double): Boolean {
    var hasError = false
    try {
      mediaPlayer.seekTo((time * 1000).toInt())
    } catch (error: Exception) {
      hasError = true
    }

    return !hasError
  }

  override fun setToPlayFile(fileInfo: ReadableMap?): Boolean {
    filePath = fileInfo?.getString("filePath")

    var hasError = false
    try {
      mediaPlayer.reset()
      mediaPlayer.setDataSource(filePath)
    } catch (error: Exception) {
      hasError = true
    }

    return !hasError
  }

  override fun startPlayingFromTime(time: Double): Boolean {
    var hasError = false
    try {
      if (mediaPlayer.isPlaying) {
        mediaPlayer.seekTo((time * 1000).toInt())
      } else {
        mediaPlayer.prepare()
        mediaPlayer.seekTo((time * 1000).toInt())
        mediaPlayer.start()
      }
    } catch (error: Exception) {
      hasError = true
    }

    return !hasError
  }

  override fun stopPlaying(): Boolean {
    var hasError = false
    try {
      mediaPlayer.stop()
    } catch (error: Exception) {
      hasError = true
    }

    return !hasError
  }

  companion object {
    const val NAME = "MNTAudioPlayerManager"
  }
}