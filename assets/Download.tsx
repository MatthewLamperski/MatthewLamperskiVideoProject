import * as React from 'react';
import Svg, {G, Path, SvgProps} from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: title */
const Download = (props: SvgProps) => (
  <Svg width={props.width} height={props.height} viewBox="0 0 24 24" {...props}>
    <G
      fill="none"
      stroke={props.stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}>
      <Path d="M3 12.3v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <Path d="m7.9 12.3 4.1 4 4.1-4" data-name="Right" />
      <Path d="M12 2.7v11.5" />
    </G>
  </Svg>
);
export default Download;
