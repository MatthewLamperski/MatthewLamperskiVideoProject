import {useEffect, useState} from 'react';
import {Dimensions} from 'react-native';

export const useIsLandscape = () => {
  const [isLandscape, setIsLandscape] = useState(false);
  useEffect(() => {
    Dimensions.addEventListener('change', ({window}) => {
      if (window.height > window.width) {
        // We are in portrait orientation
        setIsLandscape(false);
      } else {
        // We are in landscape orientation
        setIsLandscape(true);
      }
    });
  }, []);
  return isLandscape;
};
