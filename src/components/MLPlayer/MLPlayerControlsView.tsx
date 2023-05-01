import React, {useCallback, useEffect, useMemo, useRef} from 'react';
import {
  Animated,
  Pressable,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import PlayButton from '../../../assets/PlayButton';
import PauseButton from '../../../assets/PauseButton';
import FastForward from '../../../assets/FastForward';
import Rewind from '../../../assets/Rewind';
import ReplayButton from '../../../assets/ReplayButton';
import {useMLPlayerControls} from '../../hooks/useMLPlayerControls';

const MLPlayerControlsView = () => {
  const {
    paused,
    setPaused,
    showControls,
    setShowControls,
    seeking,
    currentTime,
    setSeek,
    duration,
  } = useMLPlayerControls();
  const controlsOpacity = useRef(new Animated.Value(0)).current;
  const screenOpacity = useRef(new Animated.Value(0)).current;
  let maxX = useRef(10);
  const hide = useCallback(() => {
    Animated.timing(controlsOpacity, {
      toValue: 0,
      duration: 175,
      useNativeDriver: true,
    }).start();
    setShowControls(false);
  }, [controlsOpacity, setShowControls]);
  const show = useCallback(
    (autoHide: boolean) => {
      Animated.timing(controlsOpacity, {
        toValue: 1,
        duration: 175,
        useNativeDriver: true,
      }).start(() => {
        if (autoHide) {
          setTimeout(hide, 8000);
        } else {
          setShowControls(true);
        }
      });
    },
    [controlsOpacity, hide, setShowControls],
  );
  const blurScreen = useCallback(() => {
    Animated.timing(screenOpacity, {
      toValue: 1,
      duration: 175,
      useNativeDriver: true,
    }).start();
  }, [screenOpacity]);
  const unBlurScreen = useCallback(() => {
    Animated.timing(screenOpacity, {
      toValue: 0,
      duration: 175,
      useNativeDriver: true,
    }).start();
  }, [screenOpacity]);
  useEffect(() => {
    if (seeking || showControls) {
      blurScreen();
    } else {
      unBlurScreen();
    }
  }, [blurScreen, seeking, showControls, unBlurScreen]);
  useEffect(() => {
    if (showControls) {
      show(true);
    } else {
      hide();
    }
  }, [hide, show, showControls]);

  const goForward15Secs = useCallback(() => {
    const newSeek = (currentTime + 15) / duration;
    if (newSeek > 1) {
      setSeek(1);
    } else {
      setSeek(newSeek);
    }
  }, [duration, currentTime, setSeek]);
  const goBack15Secs = useCallback(() => {
    const newSeek = (currentTime - 15) / duration;
    // If negative, it will just restart
    setSeek(newSeek);
  }, [currentTime, setSeek, duration]);

  const onPlayerPress = useCallback(() => {
    setShowControls((prevState: Boolean) => !prevState);
  }, [setShowControls]);

  const pause = useCallback(() => {
    setPaused(prevState => {
      if (prevState) {
        setTimeout(hide, 1000);
      }
      return !prevState;
    });
  }, [setPaused, hide]);

  const ended = useMemo<boolean>(() => {
    if (currentTime / duration >= 1) {
      pause();
      show(false);
      return true;
    } else {
      return false;
    }
  }, [currentTime, duration, pause, show]);

  const replay = useCallback(() => {
    setSeek(-1);
  }, [setSeek]);
  return (
    <Animated.View
      onLayout={e => {
        maxX.current = e.nativeEvent.layout.width;
      }}
      style={[styles.container, {opacity: screenOpacity}]}>
      <SafeAreaView style={{flex: 1}}>
        <Pressable onPress={onPlayerPress} style={styles.fill}>
          <Animated.View
            style={{
              opacity: controlsOpacity,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              disabled={!showControls}
              onPress={goBack15Secs}
              style={{marginRight: 20}}>
              <Rewind stroke="white" height={45} width={45} />
            </TouchableOpacity>
            <Pressable
              disabled={!showControls}
              onPress={ended ? replay : pause}
              style={styles.pauseContainer}>
              {ended ? (
                <ReplayButton fill="white" height={37} width={37} />
              ) : paused ? (
                <PlayButton fill="white" height={37} width={37} />
              ) : (
                <PauseButton fill="white" height={50} width={50} />
              )}
            </Pressable>
            <TouchableOpacity
              disabled={!showControls}
              onPress={goForward15Secs}
              style={{marginLeft: 20}}>
              <FastForward stroke="white" height={45} width={45} />
            </TouchableOpacity>
          </Animated.View>
        </Pressable>
      </SafeAreaView>
    </Animated.View>
  );
};
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#000000A0',
  },
  fill: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pauseContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
  },
});

export default MLPlayerControlsView;
