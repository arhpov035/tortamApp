import React from 'react';
import Svg, { Rect, Path, Circle } from 'react-native-svg';

const CakeIconSvg = ({ color = '#000', size = 24 }) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
  >
    <Rect x="12" y="32" width="40" height="20" rx="4" fill={color} />
    <Path d="M12 32c0-8 8-14 20-14s20 6 20 14" fill={color} />
    <Rect x="30" y="10" width="4" height="12" fill="#FFD700" rx="1" />
    <Path d="M32 8c1 0 2 1 2 2s-1 3-2 3-2-2-2-3 1-2 2-2z" fill="#FFA500" />
    <Circle cx="20" cy="40" r="3" fill="#FFEA80" />
    <Circle cx="32" cy="40" r="3" fill="#80E1FF" />
    <Circle cx="44" cy="40" r="3" fill="#FFEA80" />
  </Svg>
);

export default CakeIconSvg;
