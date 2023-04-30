import {MLPlayerContext} from '../MLPlayerProvider';
import {useContext} from 'react';

export const useMLPlayerControls = () => {
  return useContext(MLPlayerContext);
};
