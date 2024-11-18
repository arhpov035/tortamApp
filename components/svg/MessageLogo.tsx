import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import Svg, { Defs, LinearGradient, Rect, Stop, Mask, Use, Path, G } from 'react-native-svg';

interface LogoSvgProps {
    width?: number;
    height?: number;
    style?: StyleProp<ViewStyle>;
}

const MessageLogo: React.FC<LogoSvgProps> = ({
                                                 width = 32,
                                                 height = 32,
                                                 style,
                                             }) => {
    return (
        <Svg
            width={width}
            height={height}
            viewBox="0 0 120 120"
            style={style}
        >
            <Defs>
                <LinearGradient id="linearGradient-1" x1="50%" x2="50%" y1="0%" y2="100%">
                    <Stop offset="0%" stopColor="#91FC8A" />
                    <Stop offset="100%" stopColor="#00DD35" />
                </LinearGradient>
                <Rect id="path-2" width="120" height="120" x="0" y="0" rx="28" />
            </Defs>
            <G fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
                <G>
                    <Mask id="mask-3" fill="#fff">
                        <Use href="#path-2" />
                    </Mask>
                    <Use href="#path-2" fill="url(#linearGradient-1)" />
                    <Path
                        fill="#FFF"
                        d="M47.881 91.617C51.731 92.517 55.797 93 60 93c24.3 0 44-16.118 44-36S84.3 21 60 21 16 37.118 16 57c0 12.976 8.39 24.348 20.975 30.683-.69 4.907-2.683 8.512-5.975 10.817 6.58 0 12.207-2.294 16.881-6.883z"
                        mask="url(#mask-3)"
                    />
                </G>
            </G>
        </Svg>
    );
};

export default MessageLogo;
