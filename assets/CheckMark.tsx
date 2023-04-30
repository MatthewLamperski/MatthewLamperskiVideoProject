import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

const CheckMark = (props: SvgProps) => (
  <Svg height={props.height} width={props.width} viewBox="0 0 20 20" {...props}>
    {/*<Path stroke="none" fill="none" d="M0 0h20v20H0z" />*/}
    <Path
      stroke={props.stroke}
      fill={props.stroke}
      d="m15.3 5.3-6.8 6.8-2.8-2.8-1.4 1.4 4.2 4.2 8.2-8.2"
    />
  </Svg>
);
export default CheckMark;
