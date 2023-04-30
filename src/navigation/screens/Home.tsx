import React, {useCallback} from 'react';
import {FlatList, SafeAreaView, StyleSheet} from 'react-native';
import {theme, Video, VIDEOS} from '../../constants';
import VideoThumbnail from '../../components/VideoThumbnail/VideoThumbnail';
import {useIsDarkMode} from '../../hooks/useIsDarkMode';

const Home = () => {
  const {colors} = theme;
  const isDarkMode = useIsDarkMode();
  const renderThumbnail = useCallback(
    ({item}: {item: Video}) => <VideoThumbnail {...item} />,
    [],
  );
  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: isDarkMode
            ? colors.background.dark
            : colors.background.light,
        },
      ]}>
      <FlatList data={VIDEOS} renderItem={renderThumbnail} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default Home;
