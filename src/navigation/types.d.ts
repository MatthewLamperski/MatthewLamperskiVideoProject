import {Video} from '../constants';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackParams = {
  Home: undefined;
  VideoDetail: {video: Video};
};

export type VideoDetailProps = NativeStackScreenProps<
  RootStackParams,
  'VideoDetail'
>;
