import {requireNativeComponent} from 'react-native';
import {MLPlayerViewProps} from './types';

export const MLPlayerView =
  requireNativeComponent<MLPlayerViewProps>('MLPlayer');
