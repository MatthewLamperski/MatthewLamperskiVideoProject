import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: title */
const ArrowLeft = (props: SvgProps) => (
  <Svg height={props.height} width={props.width} viewBox="0 0 20 20" {...props}>
    <Path
      fill={props.fill}
      fillRule="evenodd"
      d="M8.88 19.707a1 1 0 0 0 1.414-1.411l-6.44-6.43a.499.499 0 0 1 .353-.851H19c.552 0 1-.456 1-1.007v-.004a.989.989 0 0 0-1-.986H4.207a.5.5 0 0 1-.353-.852l6.47-6.461a.997.997 0 0 0 0-1.413 1.002 1.002 0 0 0-1.413 0L.586 8.604a1.994 1.994 0 0 0 0 2.823l8.294 8.28"
    />
  </Svg>
);
export default ArrowLeft;
