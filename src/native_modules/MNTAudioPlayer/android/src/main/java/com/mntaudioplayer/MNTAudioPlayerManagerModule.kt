package com.mntaudioplayer;

import android.content.ComponentName
import androidx.core.net.toUri
import androidx.media3.common.MediaItem
import androidx.media3.common.MediaMetadata
import androidx.media3.session.MediaController
import androidx.media3.session.SessionToken
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.WritableMap
import com.google.common.util.concurrent.MoreExecutors
import java.lang.Exception

class MNTAudioPlayerManagerModule(reactContext: ReactApplicationContext) : NativeMNTAudioPlayerManagerSpec(reactContext) {
  private val mediaPlayerControllerFactory = MediaController.Builder(
    reactContext,
    SessionToken(reactContext, ComponentName(reactContext, MNTPlaybackService::class.java))
  ).buildAsync()

  private var mediaPlayerController: MediaController? = null

  private var filePath: String? = null

  init {
    super.initialize()

    mediaPlayerControllerFactory?.addListener(
      {
        // MediaController is available here with controllerFuture.get()
        mediaPlayerController = mediaPlayerControllerFactory?.let {
          if (it.isDone)
            it.get()
          else
            null
        }
      },
      MoreExecutors.directExecutor()
    )
  }

  override fun getName() = NAME
  override fun getCurrentState(): WritableMap {
    val map = Arguments.createMap()

    mediaPlayerController?.let {
      map.putDouble("playingTime", it.currentPosition.toDouble() / 1000)
      map.putBoolean("isPlaying", it.isPlaying)
      map.putString("filePath", filePath)
    }

    return map
  }

  override fun pausePlaying(): WritableMap {
    var hasError = false
    try {
      mediaPlayerController?.pause()
    } catch (error: Exception) {
      hasError = true
    }

    val map = Arguments.createMap()

    mediaPlayerController?.let {     map.putDouble("playingTime", it.currentPosition.toDouble() / 1000)
    }

    return map
  }

  override fun rewindPlayingToTime(time: Double): Boolean {
    var hasError = false
    try {
      mediaPlayerController?.seekTo((time * 1000).toLong())
    } catch (error: Exception) {
      hasError = true
    }

    return !hasError
  }

  override fun setToPlayFile(fileInfo: ReadableMap?): Boolean {
    filePath = fileInfo?.getString("filePath")
    val coverPath = fileInfo?.getString("coverPath")?.toUri()
    val fileTitle = fileInfo?.getString("fileTitle")

    var hasError = false
    try {
      val mediaItem =
        MediaItem.Builder()
          .setUri(filePath)
          .setMediaMetadata(
            MediaMetadata.Builder()
              .setTitle(fileTitle)
              .setArtworkUri(coverPath)
              .build()
          )
          .build()

      mediaPlayerController?.setMediaItem(mediaItem)
    } catch (error: Exception) {
      hasError = true
    }

    return !hasError
  }

  override fun startPlayingFromTime(time: Double): Boolean {
    var hasError = false
    try {
      if (mediaPlayerController?.isPlaying === true) {
        mediaPlayerController?.seekTo((time * 1000).toLong())
      } else {
        mediaPlayerController?.prepare()
        mediaPlayerController?.seekTo((time * 1000).toLong())
        mediaPlayerController?.play()
      }
    } catch (error: Exception) {
      hasError = true
    }

    return !hasError
  }

  override fun stopPlaying(): Boolean {
    var hasError = false
    try {
      mediaPlayerController?.stop()
    } catch (error: Exception) {
      hasError = true
    }

    return !hasError
  }

  companion object {
    const val NAME = "MNTAudioPlayerManager"
  }
}