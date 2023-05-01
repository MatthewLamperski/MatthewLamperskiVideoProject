package com.matthewlamperskivideoproject.mlplayer

import android.graphics.Color
import android.os.Environment
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp
import com.google.android.exoplayer2.MediaItem
import com.google.android.exoplayer2.source.ProgressiveMediaSource
import com.google.android.exoplayer2.upstream.DefaultDataSource
import com.google.android.exoplayer2.upstream.FileDataSource
import com.google.android.exoplayer2.util.MimeTypes
import java.io.File

class MLPlayerComponentManager : SimpleViewManager<MLPlayerComponent>() {

    private lateinit var context: ThemedReactContext

    override fun getName(): String {
        return "MLPlayer"
    }

    // Create the actual view instance
    override fun createViewInstance(reactContext: ThemedReactContext):
            MLPlayerComponent {
        context = reactContext
        return MLPlayerComponent(reactContext)
    }

    // Remap event emitter to onUpdateTime as its named in the JS layer
    override fun getExportedCustomBubblingEventTypeConstants(): Map<String, Any> {
        return mapOf(
            "topChangeTime" to mapOf(
                "phasedRegistrationNames" to mapOf(
                    "bubbled" to "onUpdateTime"
                )
            )
        )
    }

    // Exposed react props that call functions on player in the MLPlayerComponent view.


    @ReactProp(name = "src")
    fun setSrc(view: MLPlayerComponent, src: ReadableMap) {
        println("SRC$src")
        val type = src.getString("type") as? String ?: "link"
        val url = src.getString("url")
        if (type == "file") {
            print("fileList: " + context.fileList())
            print("filesDir: " + context.filesDir.absolutePath)
            val file =
                url?.let { File(context.filesDir.absolutePath, it) }
            val path = file?.absolutePath ?: ""
            val mediaSource = ProgressiveMediaSource.Factory(FileDataSource.Factory())
                .createMediaSource(MediaItem.fromUri(path))
            println("PATH$path")
            view.setupPlayer(mediaSource)
        } else if (type == "link") {
            val mediaItem = MediaItem.Builder()
                .setUri(url)
                .setMimeType(MimeTypes.APPLICATION_MP4)
                .build()
            val mediaSource = ProgressiveMediaSource.Factory(DefaultDataSource.Factory(context))
                .createMediaSource(mediaItem)
            println("MEDIA SOURCE$mediaSource")
            view.setupPlayer(mediaSource)
        }
    }

    @ReactProp(name = "paused")
    fun setPaused(view: MLPlayerComponent, paused: Boolean) {
        println("[PAUSED] $paused")
        view.setPaused(paused)
    }

    @ReactProp(name = "muted")
    fun setMuted(view: MLPlayerComponent, muted: Boolean) {
        println("[MUTED] $muted")
        view.setMuted(muted)
    }

    @ReactProp(name = "speed")
    fun setSpeed(view: MLPlayerComponent, speed: Double) {
        println("[SPEED] $speed")
        view.setSpeed(speed)
    }

    @ReactProp(name = "seek")
    fun setSeek(view: MLPlayerComponent, seek: Double) {
        println("[SEEK] $seek")
        view.setSeek(seek)
    }
}