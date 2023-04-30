import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

const FastForward = (props: SvgProps) => (
  <Svg
    width={props.width}
    height={props.height}
    fill="none"
    viewBox="0 0 24 24"
    {...props}>
    <Path
      stroke={props.stroke ?? 'white'}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M15.96 10.83H12.9l-.76 2.29h2.29a1.53 1.53 0 1 1 0 3.06h-2.29M9.54 16.17v-5.34l-1.5 1.67M13.98 4.47 12 2"
    />
    <Path
      stroke={props.stroke ?? 'white'}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M19.09 7.8c1.11 1.48 1.8 3.31 1.8 5.31A8.89 8.89 0 0 1 12 22a8.89 8.89 0 0 1-8.89-8.89A8.89 8.89 0 0 1 12 4.22c.68 0 1.34.09 1.98.24"
    />
  </Svg>
);
export default FastForward;
