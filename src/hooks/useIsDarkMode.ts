import {useColorScheme} from 'react-native';
import {useMemo} from 'react';

export const useIsDarkMode = () => {
  const colorScheme = useColorScheme();
  return useMemo(() => {
    return colorScheme === 'dark';
  }, [colorScheme]);
};
