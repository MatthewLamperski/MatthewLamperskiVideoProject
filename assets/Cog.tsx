import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

const Cog = (props: SvgProps) => (
  <Svg
    width={props.width}
    height={props.height}
    fill="none"
    viewBox="0 0 24 24"
    {...props}>
    <Path
      stroke={props.stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10.255 4.188a1.894 1.894 0 0 1-2.542.987c-1.61-.743-3.28.928-2.538 2.538.45.974.003 2.13-.987 2.542-1.551.646-1.551 2.844 0 3.49a1.894 1.894 0 0 1 .987 2.542c-.743 1.61.928 3.28 2.538 2.538a1.895 1.895 0 0 1 2.542.987c.646 1.551 2.844 1.551 3.49 0a1.894 1.894 0 0 1 2.542-.987c1.61.743 3.28-.928 2.538-2.538a1.894 1.894 0 0 1 .987-2.542c1.551-.646 1.551-2.844 0-3.49a1.895 1.895 0 0 1-.987-2.542c.743-1.61-.928-3.28-2.538-2.538-.973.45-2.13.003-2.542-.987-.646-1.551-2.844-1.551-3.49 0Z"
    />
    <Path
      stroke={props.stroke}
      strokeWidth={2}
      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
    />
  </Svg>
);
export default Cog;
