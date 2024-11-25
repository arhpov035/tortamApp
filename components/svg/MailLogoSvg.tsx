import React from 'react';
import Svg, { G, Path, Rect } from 'react-native-svg';
import { StyleProp, ViewStyle } from 'react-native';

interface LogoSvgProps {
    width?: number;
    height?: number;
    style?: StyleProp<ViewStyle>;
}

// Компонент SVG
const MailLogoSvg: React.FC<LogoSvgProps> = ({ width = 32, height = 32, style }) => {
    return (
        <Svg
            aria-label="Mail"
            role="img"
            style={[{ width, height }, style]}
            viewBox="0 0 512 512"
        >
            <Rect
                width="512"
                height="512"
                rx="15%"
                fill="#328cff"
            />
            <Path
                d="m250 186c-46 0-69 35-69 74 0 44 29 72 68 72 43 0 73-32 73-75 0-44-34-71-72-71zm-1-37c30 0 57 13 77 33 0-22 35-22 35 1v150c-1 10 10 16 16 9 25-25 54-128-14-187-64-56-149-47-195-15-48 33-79 107-49 175 33 76 126 99 182 76 28-12 41 26 12 39-45 19-168 17-225-82-38-68-36-185 67-248 78-46 182-33 244 32 66 69 62 197-2 246-28 23-71 1-71-32v-11c-20 20-47 32-77 32-57 0-108-51-108-108 0-58 51-110 108-110"
                fill="#fff"
            />
        </Svg>
    );
};

export default MailLogoSvg;
