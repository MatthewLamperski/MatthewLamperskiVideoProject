package com.matthewlamperskivideoproject.mlplayer

import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewManager
import java.util.*

// Packages for exposure to React Native
class MLPlayerComponentPackage : ReactPackage {

    override fun createViewManagers(reactContext: ReactApplicationContext) : MutableList<ViewManager<*, *>> {
        return mutableListOf(MLPlayerComponentManager())
    }

    override fun createNativeModules(reactContext: ReactApplicationContext): MutableList<NativeModule> {
        return Collections.emptyList()
    }
}