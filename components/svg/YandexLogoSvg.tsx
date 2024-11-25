import React from 'react';
import Svg, {G, Path} from 'react-native-svg';
import {StyleProp, ViewStyle} from "react-native";


interface LogoSvgProps {
    width?: number;
    height?: number;
    style?: StyleProp<ViewStyle>;
}

// Компонент SVG
const YandexLogoSvg: React.FC<LogoSvgProps> = ({width = 32, height = 32, style,}) => {
    return (<Svg
            width={width}
            height={height}
            viewBox="0 0 512 512"
        >
            <G>
                <Path
                    d="M510.689,478.854c0,17.561-14.275,31.836-31.836,31.836H33.146c-17.559,0-31.836-14.275-31.836-31.836 V33.146c0-17.56,14.277-31.836,31.836-31.836h445.707c17.561,0,31.836,14.276,31.836,31.836V478.854z"
                    fill="#ED1F24"
                />
            </G>
            <Path
                d="M313.475,105.366h-45.648c-44.854,0-82.892,34.142-82.892,100.427  c0,39.765,18.42,69.084,51.25,83.547l-61.262,110.869c-2.005,3.619,0,6.426,3.202,6.426h28.433c2.4,0,4.01-0.801,4.81-2.807  l55.659-108.863h20.021v108.863c0,1.197,1.197,2.807,2.799,2.807h24.832c2.4,0,3.203-1.205,3.203-3.205V109.383  C317.881,106.571,316.279,105.366,313.475,105.366z M287.047,269.26h-16.818c-26.427,0-52.053-19.281-52.053-67.483  c0-50.22,24.024-70.705,48.448-70.705h20.424V269.26z"
                fill="#FFFFFF"
            />
        </Svg>
    );
};
export default YandexLogoSvg;
