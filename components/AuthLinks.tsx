import React, { useState } from "react";
import { View, StyleSheet } from 'react-native';
import YandexLogoSvg from "@/components/svg/YandexLogoSvg";
import VkLogoSvg from "@/components/svg/VkLogoSvg";
import OkLogoSvg from "@/components/svg/OkLogoSvg";
import MailLogoSvg from "@/components/svg/MailLogoSvg";
import TelegramLogoSvg from "@/components/svg/TelegramLogoSvg";

const AuthLinks: React.FC = () => {
    const [isSecondModalVisible, setIsSecondModalVisible] = useState<boolean>(false);

    return (
        <View style={styles.logoContainer}>
            <VkLogoSvg width={50} height={50} style={styles.logo} />
            <YandexLogoSvg width={50} height={50} style={styles.logo} />
            <OkLogoSvg width={50} height={50} style={styles.logo} />
            <MailLogoSvg width={50} height={50} style={styles.logo} />
            <TelegramLogoSvg width={50} height={50} style={styles.logo} />
        </View>
    );
};

const styles = StyleSheet.create({
    logoContainer: {
        flexDirection: 'row', // Размещаем элементы по горизонтали
        alignItems: 'center', // Выравниваем по вертикали по центру
        justifyContent: 'space-between', // Центрируем по горизонтали
    },
    logo: {
        marginHorizontal: 8, // Небольшой отступ по горизонтали между логотипами
    },
});

export default AuthLinks;
