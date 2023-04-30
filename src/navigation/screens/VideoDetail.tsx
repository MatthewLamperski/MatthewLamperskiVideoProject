import React, {useCallback, useMemo} from 'react';
import {
  Linking,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MLPlayer from '../../components/MLPlayer/MLPlayer';
import {VideoDetailProps} from '../types';
import {useIsDarkMode} from '../../hooks/useIsDarkMode';
import ArrowLeft from '../../../assets/ArrowLeft';
import {useNavigation} from '@react-navigation/native';
import {theme} from '../../constants';
import {useIsLandscape} from '../../hooks/useIsLandscape';
import MLPlayerProvider from '../../MLPlayerProvider';

const VideoDetail = ({route}: VideoDetailProps) => {
  const {colors} = theme;
  const {
    params: {video},
  } = route;
  const isDarkMode = useIsDarkMode();
  const navigation = useNavigation();
  const isLandscape = useIsLandscape();
  const backgroundStyle = useMemo(() => {
    if (isLandscape) {
      return {backgroundColor: 'black'};
    } else {
      return {
        backgroundColor: isDarkMode
          ? colors.background.dark
          : colors.background.light,
      };
    }
  }, [
    isLandscape,
    isDarkMode,
    colors.background.dark,
    colors.background.light,
  ]);
  const openCredit = useCallback(() => {
    Linking.openURL(video.credit).catch(console.error);
  }, [video.credit]);
  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);
  return (
    <SafeAreaView style={[styles.container, backgroundStyle]}>
      <MLPlayerProvider>
        <MLPlayer video={video} />
      </MLPlayerProvider>
      <ScrollView
        contentContainerStyle={[
          styles.scrollContainer,
          {
            backgroundColor: isDarkMode
              ? colors.background.dark
              : colors.background.light,
          },
        ]}>
        <View style={styles.titleContainer}>
          <TouchableOpacity onPress={goBack} style={styles.goBackContainer}>
            <ArrowLeft
              height={18}
              width={18}
              fill={isDarkMode ? colors.brand.white : colors.brand.ink}
            />
          </TouchableOpacity>
          <Text
            numberOfLines={1}
            style={[
              styles.title,
              {color: isDarkMode ? colors.brand.lightGray : colors.brand.ink},
            ]}>
            {video.title}
          </Text>
        </View>
        <Text
          style={[
            styles.description,
            {
              color: isDarkMode ? colors.brand.gray : colors.brand.typewriter,
            },
          ]}>
          This is a great place for a video description. I do not own any of
          these videos, they are public test videos found on the internet. Click
          on 'Video Credit' below for the source of the videos.{'\n\n'}
          This player also works in landscape orientation! Try it out by
          rotating your device.
        </Text>
        <Text onPress={openCredit} style={styles.credit}>
          Video Source
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1},
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  scrollContainer: {flex: 1, padding: 15},
  title: {
    fontWeight: 'bold',
    fontSize: 25,
  },
  credit: {
    color: theme.colors.brand.electric,
    textDecorationLine: 'underline',
  },
  description: {
    marginVertical: 10,
  },
  goBackContainer: {
    padding: 5,
    paddingRight: 10,
  },
});
export default VideoDetail;
