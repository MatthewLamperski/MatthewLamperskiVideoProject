import React, {useCallback, useState} from 'react';
import useOnAppBlur from './hooks/useOnAppBlur';
import {
  MLPlayerControls,
  UpdateTimeEvent,
  VideoSource,
} from './components/MLPlayer/types';

export const MLPlayerContext = React.createContext<MLPlayerControls>({
  src: null,
  setSrc: () => {},
  paused: false,
  setPaused: () => {},
  muted: false,
  setMuted: () => {},
  speed: 1,
  setSpeed: () => {},
  seek: 0,
  setSeek: () => {},
  currentTime: 0,
  setCurrentTime: () => {},
  duration: 1,
  setDuration: () => {},
  showControls: false,
  setShowControls: () => {},
  seeking: false,
  setSeeking: () => {},
  onUpdateTime: () => {},
});

const MLPlayerProvider = ({children}: {children: React.ReactNode}) => {
  const [src, setSrc] = useState<VideoSource>(null);
  const [paused, setPaused] = useState<boolean>(false);
  const [muted, setMuted] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(1);
  const [seek, setSeek] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(1);
  const [showControls, setShowControls] = useState<boolean>(false);
  const [seeking, setSeeking] = useState<boolean>(false);

  useOnAppBlur(() => {
    console.log('pausing...');
    setPaused(true);
  });
  const onUpdateTime = useCallback((e: UpdateTimeEvent) => {
    setCurrentTime(e.nativeEvent.time);
    if (e.nativeEvent.duration !== 0) {
      setDuration(e.nativeEvent.duration);
    }
  }, []);

  const contextValue = {
    src,
    setSrc,
    paused,
    setPaused,
    muted,
    setMuted,
    speed,
    setSpeed,
    seek,
    setSeek,
    currentTime,
    setCurrentTime,
    duration,
    setDuration,
    showControls,
    setShowControls,
    seeking,
    setSeeking,
    onUpdateTime,
  };

  return (
    <MLPlayerContext.Provider value={contextValue}>
      {children}
    </MLPlayerContext.Provider>
  );
};

export default MLPlayerProvider;
