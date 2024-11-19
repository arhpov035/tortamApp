import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';

const CupcakeIconSvg = ({ color = '#FF849C', size = 24 }) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
  >
    {/* Нижняя часть капкейка */}
    <Path
      d="M16 40h32l-4 12H20l-4-12z"
      fill={color}
      stroke="#FF849C"
      strokeWidth="2"
    />
    {/* Верхняя часть капкейка */}
    <Path
      d="M32 12c-8 0-14 6-14 12s6 10 14 10 14-4 14-10-6-12-14-12z"
      fill="#FF849C"
      stroke="#FF576B"
      strokeWidth="2"
    />
    {/* Вишенка */}
    <Circle cx="32" cy="10" r="4" fill="#FF3E58" />
  </Svg>
);

export default CupcakeIconSvg;
