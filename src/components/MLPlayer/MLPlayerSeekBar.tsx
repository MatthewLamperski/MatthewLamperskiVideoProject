import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  Alert,
  Animated,
  GestureResponderEvent,
  PanResponder,
  PanResponderGestureState,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import RNFS from 'react-native-fs';
import {formatSeconds} from '../../utils';
import SoundOn from '../../../assets/SoundOn';
import SoundOff from '../../../assets/SoundOff';
import Download from '../../../assets/Download';
import CheckMark from '../../../assets/CheckMark';
import {useMLPlayerControls} from '../../hooks/useMLPlayerControls';
import {theme} from '../../constants';
import timing = Animated.timing;

// Keeps track of downloading state
const DOWNLOADING_STATE = {
  DOWNLOADING: 0,
  DOWNLOADED: 1,
  NOTDOWNLOADED: 2,
};
const MlPlayerSeekBar = () => {
  const {colors} = theme;
  const {
    setSeek,
    currentTime,
    duration,
    showControls,
    seeking,
    setSeeking,
    muted,
    setMuted,
    speed,
    setSpeed,
    src,
  } = useMLPlayerControls();
  let maxX = useRef(10);

  // Animation values used for animating seek bar
  const thumbPanX = useRef(new Animated.Value(0)).current;
  const thumbScale = useRef(new Animated.Value(1)).current;
  const width = useRef(new Animated.Value(0)).current;
  const seekBarScaleY = thumbScale.interpolate({
    inputRange: [1, 2],
    outputRange: [1, 5],
    extrapolate: 'clamp',
  });
  const containerPadding = useRef(new Animated.Value(0)).current;

  // Automatically animate in response to showing controls
  useEffect(() => {
    if (showControls) {
      timing(containerPadding, {
        toValue: 10,
        useNativeDriver: false,
        duration: 175,
      }).start();
    } else {
      timing(containerPadding, {
        toValue: 0,
        useNativeDriver: false,
        duration: 175,
      }).start();
    }
  }, [containerPadding, showControls]);

  // Used to move the track along as the video is played
  useEffect(() => {
    const newPercent = (currentTime / duration) * 100;
    if (!seeking) {
      if (newPercent > 0) {
        timing(width, {
          useNativeDriver: false,
          toValue: newPercent,
          duration: 0,
        }).start();
      }
    }
  }, [currentTime, duration, seeking, width]);
  let prevLeft = useRef(0);

  // Animate in response to seeking
  const _onPanResponderMove = useCallback(
    (evt: GestureResponderEvent, gestureState: PanResponderGestureState) => {
      const activeTouches = evt.nativeEvent.changedTouches.length;

      let newX = prevLeft.current + gestureState.dx;
      if (newX / maxX.current <= 0.001) {
        newX = 0;
      }
      if (activeTouches === 1 && newX >= 0 && newX <= maxX.current) {
        thumbPanX.setValue(newX);
        timing(width, {
          useNativeDriver: false,
          toValue: (newX / maxX.current) * 100,
          duration: 0,
        }).start();
        setSeek(newX / maxX.current);
      } else {
        console.log(
          activeTouches === 1,
          newX >= 0,
          newX <= maxX.current,
          newX,
          maxX.current,
        );
      }
    },
    [maxX, prevLeft, setSeek, thumbPanX, width],
  );
  const _onPanResponderGrant = useCallback(() => {
    timing(thumbScale, {
      toValue: 2,
      duration: 100,
      useNativeDriver: true,
    }).start();
    setSeeking(true);
  }, [setSeeking, thumbScale]);
  const _onPanResponderEnd = useCallback(
    (evt: GestureResponderEvent, gestureState: PanResponderGestureState) => {
      const newLeft = prevLeft.current + gestureState.dx;
      if (newLeft >= maxX.current) {
        prevLeft.current = maxX.current;
      } else if (newLeft <= 0) {
        prevLeft.current = 0;
      } else {
        prevLeft.current += gestureState.dx;
      }
      Animated.timing(thumbScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }).start(() => setSeeking(false));
    },
    [setSeeking, thumbScale],
  );
  const seekPanResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: _onPanResponderGrant,
      onPanResponderMove: _onPanResponderMove,
      onPanResponderEnd: _onPanResponderEnd,
    }),
  ).current;

  // Shows/hides time / duration when seeking
  const timeOpacity = useRef(new Animated.Value(0)).current;
  const showTime = useCallback(() => {
    timing(timeOpacity, {
      duration: 100,
      toValue: 1,
      useNativeDriver: true,
    }).start();
  }, [timeOpacity]);
  const hideTime = useCallback(() => {
    timing(timeOpacity, {
      duration: 100,
      toValue: 0,
      useNativeDriver: true,
    }).start();
  }, [timeOpacity]);
  useEffect(() => {
    if (seeking || showControls) {
      showTime();
    } else {
      hideTime();
    }
  }, [hideTime, seeking, showControls, showTime]);
  const currentTimeDisplay = useMemo(() => {
    if (isNaN(currentTime)) {
      return '00:00';
    } else {
      return formatSeconds(currentTime);
    }
  }, [currentTime]);
  const durationDisplay = useMemo(() => {
    if (isNaN(duration)) {
      return '00:00';
    } else {
      return formatSeconds(duration);
    }
  }, [duration]);

  const mutePressed = useCallback(() => {
    setMuted(prevState => !prevState);
  }, [setMuted]);

  const speedPressed = useCallback(() => {
    setSpeed(prevState => {
      if (prevState === 2) {
        return 0.5;
      } else if (prevState === 0.5) {
        return 1;
      } else {
        return prevState + 0.25;
      }
    });
  }, [setSpeed]);
  const speedDisplay = useMemo(() => {
    return `${speed}x`;
  }, [speed]);

  // Manages downloading functionality
  const [downloadingState, setDownloadingState] = useState(
    DOWNLOADING_STATE.NOTDOWNLOADED,
  );
  const [downloadingProgress, setDownloadingProgress] = useState(0);
  const downloadProgressDisplay = useMemo(() => {
    return `${(downloadingProgress * 100).toFixed(0)}%`;
  }, [downloadingProgress]);

  useEffect(() => {
    const path = `${RNFS.DocumentDirectoryPath}/${src?.id}.mp4`;
    RNFS.exists(path)
      .then(exists => {
        if (exists) {
          setDownloadingState(DOWNLOADING_STATE.DOWNLOADED);
        } else {
          setDownloadingState(DOWNLOADING_STATE.NOTDOWNLOADED);
        }
      })
      .catch(console.error);
  }, [src?.id]);
  const downloadVideo = useCallback(() => {
    if (downloadingState === DOWNLOADING_STATE.NOTDOWNLOADED) {
      const path = `${RNFS.DocumentDirectoryPath}/${src?.id}.mp4`;
      RNFS.downloadFile({
        fromUrl: src?.url ?? '',
        toFile: path,
        begin: res => {
          console.log(res);
          setDownloadingState(DOWNLOADING_STATE.DOWNLOADING);
        },
        progress: res => {
          console.log(res.bytesWritten / res.contentLength, res);
          setDownloadingProgress(res.bytesWritten / res.contentLength);
          if (res.bytesWritten / res.contentLength === 1) {
            setDownloadingState(DOWNLOADING_STATE.DOWNLOADED);
          }
        },
      })
        .promise.then(value => {
          console.log('DOWNLOADED', value);
          setDownloadingState(DOWNLOADING_STATE.DOWNLOADED);
        })
        .catch(err => console.error(err));
    } else if (downloadingState === DOWNLOADING_STATE.DOWNLOADED) {
      Alert.alert(
        'Remove Download?',
        'Are you sure you want to remove this download?',
        [
          {text: 'Cancel'},
          {
            text: 'Remove',
            style: 'destructive',
            onPress: () => {
              RNFS.unlink(`${RNFS.DocumentDirectoryPath}/${src?.id}.mp4`)
                .then(res => {
                  console.log(res);
                  setDownloadingState(DOWNLOADING_STATE.NOTDOWNLOADED);
                })
                .catch(console.error);
            },
          },
        ],
      );
    }
  }, [downloadingState, src]);
  return (
    <View style={styles.seekBarContainer}>
      <SafeAreaView style={{alignSelf: 'stretch'}}>
        <Animated.View
          style={{
            opacity: timeOpacity,
            ...styles.infoContainer,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                fontVariant: ['tabular-nums'],
              }}>
              {currentTimeDisplay}
            </Text>
            <Text
              style={{
                color: '#DDDDDD',
                fontWeight: 'bold',
                fontVariant: ['tabular-nums'],
              }}>
              {` / ${durationDisplay}`}
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity
              onPress={speedPressed}
              style={{paddingHorizontal: 10, paddingTop: 10}}>
              <Text style={{color: 'white', fontWeight: 'bold'}}>
                {speedDisplay}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{paddingHorizontal: 10, paddingTop: 10}}
              onPress={downloadVideo}>
              {downloadingState === DOWNLOADING_STATE.NOTDOWNLOADED ? (
                <Download height={20} width={20} stroke="white" />
              ) : downloadingState === DOWNLOADING_STATE.DOWNLOADED ? (
                <CheckMark height={23} width={23} stroke="white" />
              ) : (
                <Text
                  style={{
                    color: 'white',
                    fontWeight: 'bold',
                    fontVariant: ['tabular-nums'],
                  }}>
                  {downloadProgressDisplay}
                </Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={mutePressed}
              style={{paddingHorizontal: 10, paddingTop: 10}}>
              {muted ? (
                <SoundOff height={23} width={23} stroke="white" />
              ) : (
                <SoundOn height={23} width={23} stroke="white" />
              )}
            </TouchableOpacity>
          </View>
        </Animated.View>
      </SafeAreaView>
      <View
        {...seekPanResponder.panHandlers}
        style={{
          flex: 1,
          alignSelf: 'stretch',
          paddingTop: 5,
        }}>
        <SafeAreaView style={{flex: 1, alignSelf: 'stretch'}}>
          <Animated.View
            style={{
              padding: containerPadding,
              alignSelf: 'stretch',
            }}>
            <Animated.View
              onLayout={e => {
                maxX.current =
                  e.nativeEvent.layout.x + e.nativeEvent.layout.width;
              }}
              style={[
                styles.seekBar,
                {
                  transform: [
                    {
                      scaleY: seekBarScaleY,
                    },
                  ],
                },
              ]}>
              <View
                style={{
                  flex: 1,
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  display: 'flex',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                }}>
                <Animated.View
                  style={{
                    width: width.interpolate({
                      inputRange: [0, 100],
                      outputRange: ['0%', '100%'],
                      extrapolate: 'clamp',
                    }),
                    backgroundColor: colors.brand.orange,
                    height: 20,
                  }}
                />
              </View>
            </Animated.View>
          </Animated.View>
        </SafeAreaView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  seekBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  seekBar: {
    backgroundColor: '#DDDDDD',
    height: 2,
    alignSelf: 'stretch',
    borderRadius: 100,
    overflow: 'hidden',
  },
});
export default MlPlayerSeekBar;
