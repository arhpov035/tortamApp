import React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';

const HomeIconSvg = ({ color = '#FF8C52', size = 24 }) => (
    <Svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
    >
        {/* Основной корпус дома */}
        <Path
            d="M12 28 L32 12 L52 28 V52 H12 V28 Z"
            fill="#FFD9B3"
            stroke="#FFA86C"
            strokeWidth="2"
        />
        {/* Крыша */}
        <Path
            d="M8 28 L32 8 L56 28"
            fill={color}
            stroke="#FF7034"
            strokeWidth="2"
        />
        {/* Дверь */}
        <Rect
            x="26"
            y="38"
            width="12"
            height="14"
            fill="#FFC1CC"
            stroke="#FF849C"
            strokeWidth="2"
        />
        {/* Окна */}
        <Rect
            x="16"
            y="32"
            width="8"
            height="8"
            fill="#FFF5CC"
            stroke="#FFDC99"
            strokeWidth="2"
        />
        <Rect
            x="40"
            y="32"
            width="8"
            height="8"
            fill="#FFF5CC"
            stroke="#FFDC99"
            strokeWidth="2"
        />
    </Svg>
);

export default HomeIconSvg;
