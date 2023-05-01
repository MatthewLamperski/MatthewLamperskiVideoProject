import {requireNativeComponent} from 'react-native';
import {MLPlayerViewProps} from './types';

// Get native UI component from native layer
export const MLPlayerView =
  requireNativeComponent<MLPlayerViewProps>('MLPlayer');
