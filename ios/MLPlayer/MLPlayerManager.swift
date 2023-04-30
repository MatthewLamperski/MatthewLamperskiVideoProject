//
//  MLPlayerManager.swift
//  MatthewLamperskiVideoProject
//
//  Created by Matthew Lamperski on 4/27/23.
//

import AVFoundation
import React

@objc(MLPlayerManager)
class MLPlayerManager: RCTViewManager {
  
  override func view() -> UIView! {
    return MLPlayer()
  }
  
  override class func requiresMainQueueSetup() -> Bool {
    return true
  }
}
