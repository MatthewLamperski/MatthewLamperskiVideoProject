//
//  MLPlayer.swift
//  MatthewLamperskiVideoProject
//
//  Created by Matthew Lamperski on 4/27/23.
//

import Foundation
import AVFoundation
import AVKit

class MLPlayer: UIView {
  
  override static var layerClass: AnyClass { AVPlayerLayer.self }
  
  private var _player:AVPlayer? {
    get { playerLayer.player }
    set { playerLayer.player = newValue }
  }
  
  private var currentTime: Double = 0 {
    didSet {
      sendUpdateTime(time: currentTime, duration: self.duration)
    }
  }
  private var duration: Double = 1 {
    didSet {
      sendUpdateTime(time: self.currentTime, duration: duration)
    }
  }
  
  private let rootLayer = CALayer()
  private var playerLayer: AVPlayerLayer { layer as! AVPlayerLayer }
  
  var timeObserverToken: Any?
  
  init() {
    super.init(frame: CGRect(x: 0, y: 0, width: 200, height: 100))
    self.backgroundColor = .black
  }
  
  required init?(coder: NSCoder) {
    super.init(coder: coder)
    self.backgroundColor = .black
  }
  
  @objc
  func setSrc(_ src:NSDictionary) {
    let type = src["type"] as! String
    let url = src["url"] as! String
    var videoURL = URL(string: "")
    
    if (type == "file") {
      let documentsPath = NSSearchPathForDirectoriesInDomains(.documentDirectory, .userDomainMask, true)[0]
      videoURL = URL(fileURLWithPath: documentsPath.appendingFormat("/" + url))
    } else {
      videoURL = URL(string: url)
    }
    print("URL", videoURL!.absoluteString)
    
    setupPlayerLayer(src: videoURL)
  }
  
  @objc
  func setPaused(_ paused:Bool) {
    print("setPaused Called with", paused)
    if paused {
      _player?.pause()
    } else if (_player?.rate != 1.0) {
      _player?.playImmediately(atRate: 1)
    }
  }
  
  @objc
  func setMuted(_ muted:Bool) {
    _player?.isMuted = muted
  }
  
  @objc
  func setSpeed(_ speed:Double) {
    _player?.rate = Float(speed)
  }
  
  @objc var onUpdateTime: RCTDirectEventBlock?
  
  @objc func sendUpdateTime(time: Double, duration: Double) {
    if onUpdateTime != nil {
      onUpdateTime!(["time": time, "duration": duration])
    }
  }
  
  func addPeriodicTimeObserver() {
    let timeScale = CMTimeScale(NSEC_PER_SEC)
    let time = CMTime(seconds: 0.5, preferredTimescale: timeScale)
    timeObserverToken = _player?.addPeriodicTimeObserver(forInterval: time, queue: .main, using: { [weak self] time in
      self?.currentTime = Double(time.value) / Double(time.timescale)
      self?.duration = Double((self?._player?.currentItem?.duration.value) ?? 0) / Double((self?._player?.currentItem?.duration.timescale) ?? 1)
    })
  }
  
  @objc
  func setSeek(_ seek: Double) {
    print("setSeekCalled")
    let seekSeconds = seek * self.duration
    let timeScale: CMTimeScale = 1000
    let seekTime = CMTimeMakeWithSeconds(seekSeconds, preferredTimescale: timeScale)
    self._player?.seek(to: seekTime, toleranceBefore: CMTime.zero, toleranceAfter: CMTime.zero) { success in
      print("Success seek", success)
    }
  }
  
}

private extension MLPlayer {
  func setupPlayerLayer(src: URL?) {
    
    playerLayer.frame = bounds
    guard let videoURL = src else {return}
    let player = AVPlayer(url: videoURL)
    
    playerLayer.player = player
    playerLayer.videoGravity = .resizeAspect
    addPeriodicTimeObserver()
    player.play()
  }
}
