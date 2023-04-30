import * as React from 'react';
import Svg, {G, Path, SvgProps} from 'react-native-svg';

const SoundOn = (props: SvgProps) => (
  <Svg width={props.width} height={props.height} viewBox="0 0 24 24" {...props}>
    <G
      fill="none"
      stroke={props.stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}>
      <Path d="M2.9 9h4l5-6v18l-5-5h-5V9h1zM15.5 19.5a7.3 7.3 0 0 0 7-7.5 7.3 7.3 0 0 0-7-7.5" />
      <Path d="M15.5 15a3 3 0 0 0 0-6" />
    </G>
  </Svg>
);
export default SoundOn;
