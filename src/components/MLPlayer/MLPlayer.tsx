import React, {useEffect, useMemo} from 'react';
import {MLPlayerView} from './MLPlayerView';
import {ActivityIndicator, StyleSheet, View, ViewStyle} from 'react-native';
import MLPlayerSeekBar from './MLPlayerSeekBar';
import MLPlayerControlsView from './MLPlayerControlsView';
import RNFS from 'react-native-fs';
import {useIsLandscape} from '../../hooks/useIsLandscape';
import {MLPlayerProps} from './types';
import {useMLPlayerControls} from '../../hooks/useMLPlayerControls';

const MlPlayer = ({video}: MLPlayerProps) => {
  const isLandscape = useIsLandscape();
  const videoContainerStyle = useMemo<ViewStyle>(() => {
    if (isLandscape) {
      return {
        height: '100%',
        width: '100%',
      };
    } else {
      return {
        width: '100%',
        aspectRatio: 16 / 9,
      };
    }
  }, [isLandscape]);
  const {src, setSrc, seek, paused, muted, speed, onUpdateTime} =
    useMLPlayerControls();
  useEffect(() => {
    const path = `${RNFS.DocumentDirectoryPath}/${video.id}.mp4`;
    RNFS.exists(path)
      .then(exists => {
        if (exists) {
          setSrc({
            url: `${video.id}.mp4`,
            type: 'file',
            id: video.id,
          });
        } else {
          setSrc({
            url: video.url,
            type: 'link',
            id: video.id,
          });
        }
      })
      .catch(err => {
        console.log(err);
        setSrc({
          url: video.url,
          type: 'link',
          id: video.id,
        });
      });
  }, [setSrc, video.id, video.url]);
  return (
    <View style={videoContainerStyle}>
      {src === null ? (
        <View style={styles.player}>
          <ActivityIndicator />
        </View>
      ) : (
        <>
          <MLPlayerView
            style={styles.player}
            src={src}
            paused={paused}
            muted={muted}
            seek={seek}
            speed={speed}
            onUpdateTime={onUpdateTime}
          />
          <MLPlayerControlsView />
          <MLPlayerSeekBar />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  player: {
    width: '100%',
    height: '100%',
  },
});
export default MlPlayer;
