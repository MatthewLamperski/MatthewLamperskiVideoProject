import {Video} from '../../constants';
import {BaseSyntheticEvent, Dispatch, SetStateAction} from 'react';
import {ViewStyle} from 'react-native';

export type UpdateTime = {
  time: number;
  duration: number;
};
export type UpdateTimeEvent = BaseSyntheticEvent<UpdateTime>;

export type VideoSource = {
  type: 'file' | 'link';
  url: string;
  id: string;
} | null;

export type MLPlayerControls = {
  src: VideoSource;
  setSrc: Dispatch<SetStateAction<VideoSource>>;
  paused: boolean;
  setPaused: Dispatch<SetStateAction<boolean>>;
  muted: boolean;
  setMuted: Dispatch<SetStateAction<boolean>>;
  speed: number;
  setSpeed: Dispatch<SetStateAction<number>>;
  seek: number;
  setSeek: Dispatch<SetStateAction<number>>;
  currentTime: number;
  setCurrentTime: Dispatch<SetStateAction<number>>;
  duration: number;
  setDuration: Dispatch<SetStateAction<number>>;
  showControls: boolean;
  setShowControls: Dispatch<SetStateAction<boolean>>;
  seeking: boolean;
  setSeeking: Dispatch<SetStateAction<boolean>>;
  onUpdateTime: function;
};

/**
 * Props for custom components
 */
export type MLPlayerProps = {
  video: Video;
};

export type MLPlayerViewProps = {
  style?: ViewStyle;
  src: VideoSource;
  seek: number;
  paused: boolean;
  muted: boolean;
  speed: number;
  onUpdateTime: (UpdateTimeEvent) => void;
};

export type MLPlayerControlsProps = {
  showControls: boolean;
  currentTime: number;
  duration: number;
  setSeek: (number) => void;
};
