package com.matthewlamperskivideoproject.mlplayer

import android.annotation.SuppressLint
import android.net.Uri
import android.os.Handler
import android.os.Looper
import android.widget.LinearLayout
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactContext
import com.facebook.react.modules.core.DeviceEventManagerModule
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.events.RCTEventEmitter
import com.facebook.react.uimanager.events.RCTModernEventEmitter
import com.google.android.exoplayer2.ExoPlayer
import com.google.android.exoplayer2.ui.PlayerControlView
import com.google.android.exoplayer2.MediaItem
import com.google.android.exoplayer2.Player
import com.google.android.exoplayer2.source.MediaSource
import com.google.android.exoplayer2.source.ProgressiveMediaSource
import com.google.android.exoplayer2.ui.StyledPlayerView
import com.google.android.exoplayer2.upstream.DefaultDataSource
import com.google.android.exoplayer2.util.MimeTypes
import com.matthewlamperskivideoproject.R
import java.net.URL
import java.util.EventListener
import java.util.Timer
import java.util.TimerTask

@SuppressLint("ViewConstructor")
class MLPlayerComponent(context: ThemedReactContext) : LinearLayout(context) {
    private val reactContext: ThemedReactContext = context

    // Declare actual player and view
    private lateinit var player: ExoPlayer
    private lateinit var playerView: StyledPlayerView

    // Holds current position of player
    private var currentTime: Double = 0.0
        set(value) {
            field = value
            sendUpdateTime(field, duration)
        }

    // Holds duration of player
    private var duration: Double = 1.0
        set(value) {
            field = value
            sendUpdateTime(currentTime, field)
        }

    init {
        inflate(reactContext, R.layout.mlplayer_layout, this)
    }

    // Set up with specific media source (either file or link)
    fun setupPlayer(mediaSource: MediaSource) {
        // Initialize ExoPlayer
        player = ExoPlayer.Builder(context).build()

        // Bind player to playback control view
        playerView = findViewById(R.id.playerView)

        // Don't show any controls
        playerView.useController = false

        // Set up player to view
        playerView.player = player

        // Set Media source
        player.setMediaSource(mediaSource)

        // Play immediately
        player.playWhenReady = true

        // Start from beginning
        player.seekTo(0, 0L)

        // Change state from idle
        player.prepare()


        // Add listener for time updates
        player.addListener(playerListener)
    }

    // Listens for changes in current position every 0.5s
    private val playerListener = object : Player.Listener {
        private val handler = Handler(Looper.getMainLooper())

        override fun onPlaybackStateChanged(playbackState: Int) {
            if (playbackState == Player.STATE_READY) {
                val timer = Timer()
                timer.schedule(object: TimerTask() {
                    override fun run() {
                        handler.post {
                            val position = player.currentPosition / 1000.0
                            val duration = player.duration / 1000.0
                            println("[TIME] Position: $position, Duration: $duration")
                            sendUpdateTime(position, duration)
                        }
                    }
                }, 0, 500)
            }
        }
    }

    // React exposed event emitter
    private fun sendUpdateTime(currentTime: Double, duration: Double) {
        val event = Arguments.createMap().apply {
            putDouble("time", currentTime)
            putDouble("duration", duration)
        }
        println("[EVENT]: $event")

        // NOTE: this is deprecated. Should move over to the new native architecture
        reactContext
            .getJSModule(RCTEventEmitter::class.java)
            .receiveEvent(id, "topChangeTime", event)
    }

    // Plays/Pauses video
    fun setPaused(paused: Boolean) {
        if (paused) {
            player.pause()
        } else {
            player.play()
        }
    }

    // Mutes/unmutes video
    fun setMuted(muted: Boolean) {
        if (muted) {
            player.volume = 0.0f
        } else {
            player.volume = 1.0f
        }
    }

    // Manipulates playback speed
    fun setSpeed(speed: Double) {
        player.setPlaybackSpeed(speed.toFloat())
    }

    // Seeks to new position
    fun setSeek(seek: Double) {
        val seekSeconds = seek * (player.duration / 1000.0)
        val timeScale = 1000
        val seekTime = seekSeconds * timeScale
        println("[SEEKING] $seekTime")
        player.seekTo(seekTime.toLong())
    }

}