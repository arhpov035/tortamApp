import React from 'react';
import Svg, { G, Path, Rect } from 'react-native-svg';
import { StyleProp, ViewStyle } from 'react-native';

interface LogoSvgProps {
    width?: number;
    height?: number;
    style?: StyleProp<ViewStyle>;
}

// Компонент SVG
const TelegramLogoSvg: React.FC<LogoSvgProps> = ({ width = 32, height = 32, style }) => {
    return (
        <Svg
            aria-label="Telegram"
            role="img"
            style={[{ width, height }, style]}
            viewBox="0 0 512 512"
        >
            <Rect
                width="512"
                height="512"
                rx="15%"
                fill="#37aee2"
            />
            <Path fill="#c8daea" d="M199 404c-11 0-10-4-13-14l-32-105 245-144" />
            <Path fill="#a9c9dd" d="M199 404c7 0 11-4 16-8l45-43-56-34" />
            <Path
                fill="#f6fbfe"
                d="M204 319l135 99c14 9 26 4 30-14l55-258c5-22-9-32-24-25L79 245c-21 8-21 21-4 26l83 26 190-121c9-5 17-3 11 4"
            />
        </Svg>
    );
};

export default TelegramLogoSvg;
