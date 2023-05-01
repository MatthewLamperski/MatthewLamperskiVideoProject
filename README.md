# Matthew Lamperski Video Project
___

A React Native video application implementing native UI components. This project implements both **iOS and Android** native components using **AVPlayer and ExoPlayer**, respectively.

## Requirements Met
___
- [x] App contains a video player with play, pause, and seek functionality
- [x] UI including video player controls should be implemented in Typescript layer
- [x] Video playback should be implemented natively and exposed to the TypeScript layer using a Native UI Component
  - [x] iOS implements AVPlayer natively
  - [x] Android implements ExoPlayer natively
- [x] Include README on how to run the app (see section below)

## Installing and Running
___
Navigate to the root directory `MatthewLamperskiVideoProject` and install dependencies using yarn:
```shell
yarn install
```
Install iOS pods:
```shell
cd ios && pod install
```

### For iOS
___
Open the `ios` directory in Xcode, choose a device or emulator, and press 'Run'.
Or, ensure that an emulator is running, navigatr to the root directory (`MatthewLamperskiVideoProject`) and run:
```shell
npx react-native run-ios --variant=release
```

### For Android
___
Ensure that either an emulator is running or a device is connected, then from the root directory (`MatthewLamperskiVideoProject`), run:
```shell
npx react-native run-android --variant=release
```

## Other Features
- Videos are not stored on device by default, instead links are provided to the `MLPlayer` component. **However, offline access is available after downloading from the player's interface**
- Video format is `.mp4` for all videos, but can be easily extended to other formats.
- There is a selection of many videos to choose from, each video is provided to the public from [this Gist.](https://gist.github.com/jsturgis/3b19447b304616f18657)
- Additional video playback features are included:
  - Manipulating playback speed (0.5x, 1x, 1.25x, 1.5x, 1.75x, 2x)
  - Play, pause functionality
  - Seeking functionality (just drag your finger across the orange bar!)
  - Skip forward/backwards by 15 seconds
  - Replay after video finishes
  - Download video for offline availability

### Project Dependencies
___
- `@react-navigation/native` & `@react-navigation/native-stack` 
  - Used for simple stack push/pop features
  - Codependencies:
    - `react-native-screens`
    - `react-native-safe-area-context`
- `react-native-fs`
  - Used for downloading video files
- `react-native-svg`
  - Used for displaying icons


