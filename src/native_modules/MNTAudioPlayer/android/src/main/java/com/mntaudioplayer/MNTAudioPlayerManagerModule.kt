package com.mntaudioplayer;

import android.content.ComponentName
import androidx.core.net.toUri
import androidx.media3.common.MediaItem
import androidx.media3.common.MediaMetadata
import androidx.media3.common.Player
import androidx.media3.session.MediaController
import androidx.media3.session.SessionToken
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.LifecycleEventListener
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.WritableMap
import com.facebook.react.modules.core.DeviceEventManagerModule.RCTDeviceEventEmitter
import com.google.common.util.concurrent.MoreExecutors
import java.lang.Exception

class MNTAudioPlayerManagerModule(reactContext: ReactApplicationContext) : NativeMNTAudioPlayerManagerSpec(reactContext),
  LifecycleEventListener {
  private val mediaPlayerControllerFactory = MediaController.Builder(
    reactContext.applicationContext,
    SessionToken(reactContext.applicationContext, ComponentName(reactContext.applicationContext, MNTPlaybackService::class.java))
  ).buildAsync()

  private var mediaPlayerController: MediaController? = null

  private var filePath: String? = null

  private val playerListener = object : Player.Listener {
    override fun onIsPlayingChanged(isPlaying: Boolean) {
      if (isPlaying) {
        emitPlayerEvent(EVENT_PLAYING_DID_START)
      }
    }

    override fun onPlaybackStateChanged(playbackState: Int) {
      if (playbackState == Player.STATE_ENDED) {
        emitPlayerEvent(EVENT_PLAYING_DID_FINISH, includePlayingTime = false)
      }
    }

    override fun onPlayWhenReadyChanged(playWhenReady: Boolean, reason: Int) {
      if (playWhenReady) {
        return
      }

      if (mediaPlayerController?.playbackState == Player.STATE_ENDED) {
        return
      }

      val eventName = when (reason) {
        Player.PLAY_WHEN_READY_CHANGE_REASON_AUDIO_FOCUS_LOSS,
        Player.PLAY_WHEN_READY_CHANGE_REASON_AUDIO_BECOMING_NOISY -> EVENT_PLAYING_DID_INTERRUPT
        else -> EVENT_PLAYING_DID_PAUSE
      }

      emitPlayerEvent(eventName)
    }
  }

  init {
    super.initialize()
    reactContext.addLifecycleEventListener(this)

    mediaPlayerControllerFactory?.addListener(
      {
        mediaPlayerController = mediaPlayerControllerFactory?.let {
          if (it.isDone)
            it.get()
          else
            null
        }
        mediaPlayerController?.addListener(playerListener)
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

  override fun addListener(eventName: String) {
    // Required by NativeEventEmitter / RN 0.87 codegen. Events are emitted via RCTDeviceEventEmitter.
  }

  override fun removeListeners(count: Double) {
    // Required by NativeEventEmitter / RN 0.87 codegen.
  }

  companion object {
    const val NAME = "MNTAudioPlayerManager"
    const val EVENT_PLAYING_DID_FINISH = "PLAYING_DID_FINISH"
    const val EVENT_PLAYING_DID_INTERRUPT = "PLAYING_DID_INTERRUPT"
    const val EVENT_PLAYING_DID_PAUSE = "PLAYING_DID_PAUSE"
    const val EVENT_PLAYING_DID_START = "PLAYING_DID_START"
  }

  override fun onHostResume() {
  }

  override fun onHostPause() {
  }

  override fun onHostDestroy() {
    mediaPlayerController?.removeListener(playerListener)
    mediaPlayerControllerFactory?.let {
      MediaController.releaseFuture(it)

    }
    mediaPlayerController?.release()
    mediaPlayerController = null
  }

  private fun emitPlayerEvent(eventName: String, includePlayingTime: Boolean = true) {
    if (!reactApplicationContext.hasActiveReactInstance()) {
      return
    }

    val params = Arguments.createMap()
    if (includePlayingTime) {
      val playingTime = (mediaPlayerController?.currentPosition ?: 0).toDouble() / 1000
      params.putDouble("playingTime", playingTime)
    }

    reactApplicationContext
      .getJSModule(RCTDeviceEventEmitter::class.java)
      .emit(eventName, params)
  }
}
