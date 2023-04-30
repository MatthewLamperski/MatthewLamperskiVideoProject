import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: title */
const PauseButton = (props: SvgProps) => (
  <Svg width={props.width} height={props.height} viewBox="0 0 32 32" {...props}>
    <Path
      fill={props.fill}
      fillOpacity={props.fillOpacity ?? 1}
      d="M5.92 24.096q0 .832.576 1.408t1.44.608h4.032q.832 0 1.44-.608t.576-1.408V7.936q0-.832-.576-1.44t-1.44-.576H7.936q-.832 0-1.44.576t-.576 1.44v16.16zm12.096 0q0 .832.608 1.408t1.408.608h4.032q.832 0 1.44-.608t.576-1.408V7.936q0-.832-.576-1.44t-1.44-.576h-4.032q-.832 0-1.408.576t-.608 1.44v16.16z"
    />
  </Svg>
);
export default PauseButton;
