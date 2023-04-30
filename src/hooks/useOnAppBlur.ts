import {useEffect, useRef} from 'react';
import {AppState} from 'react-native';

const useOnAppBlur = (callback: Function) => {
  const appState = useRef(AppState.currentState);
  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState.match(/inactive|background/)) {
        callback();
      }

      appState.current = nextAppState;
    });
    return () => {
      subscription.remove();
    };
  }, [callback]);
};

export default useOnAppBlur;
