import * as React from 'react';
import Svg, {G, Path, SvgProps} from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: title */
const SoundOff = (props: SvgProps) => (
  <Svg height={props.height} width={props.width} viewBox="0 0 24 24" {...props}>
    <G
      fill="none"
      stroke={props.stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}>
      <Path d="m3 3 18 18M9.9 5.5 12 3v18l-5-5H2V9h6M21.4 16a8.5 8.5 0 0 0 1.1-4.2c0-4.3-3.1-7.8-7-7.8M15.5 20.5a5.2 5.2 0 0 0 3-1M18.3 13a2.7 2.7 0 0 0 .2-1.1 2.9 2.9 0 0 0-3-2.9" />
    </G>
  </Svg>
);
export default SoundOff;
