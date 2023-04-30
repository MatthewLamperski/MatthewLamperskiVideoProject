import React, {useCallback, useMemo} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {theme, Video} from '../../constants';
import {formatSeconds} from '../../utils';
import {useIsDarkMode} from '../../hooks/useIsDarkMode';
import {useNavigation} from '@react-navigation/native';
import {RootStackParams} from '../../navigation/types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

const VideoThumbnail = (video: Video): JSX.Element => {
  const {colors} = theme;
  const isDarkMode = useIsDarkMode();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const onPress = useCallback(() => {
    navigation.navigate('VideoDetail', {
      video,
    });
  }, [navigation, video]);
  const durationDisplay = useMemo(() => {
    return formatSeconds(video.duration);
  }, [video.duration]);

  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={styles.thumbnailContainer}>
        <View style={styles.thumbnailWrapper}>
          <Image source={{uri: video.thumbnail}} style={styles.thumbnail} />
        </View>
        <View style={styles.durationContainer}>
          <Text style={styles.duration}>{durationDisplay}</Text>
        </View>
      </View>
      <View style={styles.titleContainer}>
        <Text
          numberOfLines={1}
          style={[
            styles.title,
            {color: isDarkMode ? colors.brand.white : colors.brand.ink},
          ]}>
          {video.title}
        </Text>
        <Text
          style={[
            styles.description,
            {
              color: isDarkMode ? colors.brand.gray : colors.brand.typewriter,
            },
          ]}>
          This is a great place for a video description. Click anywhere to view
          the native player!
        </Text>
      </View>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    display: 'flex',
  },
  thumbnailContainer: {
    padding: 10,
  },
  thumbnailWrapper: {
    borderRadius: 15,
  },
  thumbnail: {
    height: 200,
    alignSelf: 'stretch',
    borderRadius: 15,
  },
  titleContainer: {
    padding: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  durationContainer: {
    position: 'absolute',
    bottom: 15,
    right: 20,
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000a0',
  },
  duration: {color: 'white', fontVariant: ['tabular-nums'], fontWeight: 'bold'},
  description: {
    marginVertical: 10,
  },
});
export default VideoThumbnail;
