import React from 'react';
import {Svg, G, Path} from 'react-native-svg'; // Импортируем компоненты из 'react-native-svg'
import {ViewStyle, StyleProp} from 'react-native';

interface LogoSvgProps {
    width?: number;
    height?: number;
    style?: StyleProp<ViewStyle>;
}

const VkLogoSvg: React.FC<LogoSvgProps> = ({
                                               width = 32,
                                               height = 32,
                                               style,
                                           }) => {
    return (
        <Svg
            viewBox="0 0 202 202"
            style={[{width, height}, style]} // Используем стили для задания размеров
        >
            <G>
                <Path
                    fill="#5181b8"
                    d="M71.6 5h58.9C184.3 5 197 17.8 197 71.6v58.9c0 53.8-12.8 66.5-66.6 66.5H71.5C17.7 197 5 184.2 5 130.4V71.5C5 17.8 17.8 5 71.6 5z"
                />
                <Path
                    fill="#fff"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M162.2 71.1c.9-3 0-5.1-4.2-5.1h-14c-3.6 0-5.2 1.9-6.1 4 0 0-7.1 17.4-17.2 28.6-3.3 3.3-4.7 4.3-6.5 4.3-.9 0-2.2-1-2.2-4V71.1c0-3.6-1-5.1-4-5.1H86c-2.2 0-3.6 1.7-3.6 3.2 0 3.4 5 4.2 5.6 13.6v20.6c0 4.5-.8 5.3-2.6 5.3-4.7 0-16.3-17.4-23.1-37.4-1.4-3.7-2.7-5.3-6.3-5.3H42c-4 0-4.8 1.9-4.8 4 0 3.7 4.7 22.1 22.1 46.4C70.9 133 87.2 142 102 142c8.9 0 10-2 10-5.4V124c0-4 .8-4.8 3.7-4.8 2.1 0 5.6 1 13.9 9 9.5 9.5 11.1 13.8 16.4 13.8h14c4 0 6-2 4.8-5.9-1.3-3.9-5.8-9.6-11.8-16.4-3.3-3.9-8.2-8-9.6-10.1-2.1-2.7-1.5-3.9 0-6.2 0-.1 17.1-24.1 18.8-32.3z"
                />
            </G>
        </Svg>
    );
};

export default VkLogoSvg;
