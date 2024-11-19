import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image, Linking } from 'react-native';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import YandexLogoSvg from "@/components/svg/YandexLogoSvg";
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import CustomModal from '@/components/CustomModal';
import AuthLinks from "@/components/AuthLinks";
import VkLogoSvg from "@/components/svg/VkLogoSvg";
import MessageLogo from "@/components/svg/MessageLogo";
import { TextInputMask } from 'react-native-masked-text';
import { createIndividualOrder } from "@/api/createIndividualOrder";
import { validatePhone } from "@/utils/validatePhone";
import { NavigationContainer } from "@react-navigation/native";
import CakeIconSvg from '@/components/svg/CakeIconSvg';
import CupcakeIconSvg from '@/components/svg/CupcakeIconSvg';
import HomeIconSvg from '@/components/svg/HomeIconSvg';

export default function TabsLayout() {
    const colorScheme = useColorScheme();
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [isModalmesage, setIsModalmesage] = useState<boolean>(false);
    const [isSecondModalVisible, setIsSecondModalVisible] = useState<boolean>(false);
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const sizeIcon = 32;
    const [phone, setPhone] = useState('');
    const [phoneError, setPhoneError] = useState<string | null>(null);
    const [response, setResponse] = useState('');

    const handleImagePick = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
        }
    };

    const handleSubmit = () => {
        if (phoneNumber.trim() === '') {
            alert('Пожалуйста, введите номер телефона');
            return;
        }
        console.log('Телефон:', phoneNumber);
        console.log('Изображение:', selectedImage);
        setIsModalVisible(false);
    };

    const handlePhoneChange = (value: string) => { // Указали тип для value
        setPhone(value);
        setPhoneError(null); // Сбрасываем ошибку при изменении ввода
    };

    const handleFormSubmit = async () => {
        // Проверка номера телефона
        if (!phone) {
            setPhoneError('Пожалуйста, введите номер телефона');
            return;
        }

        // Валидация номера телефона
        const error = validatePhone(phone);
        if (error) {
            setPhoneError(error);
            return;
        }

        try {
            const responseOrder = await createIndividualOrder(phone, null); // Отправляем данные на сервер и сохраняем ответ
            console.log('Ответ от сервера:', responseOrder);

            if (responseOrder.success) {
                setResponse('Ожидайте звонка — мы свяжемся с вами в ближайшее время.');
            } else {
                setResponse('Произошла ошибка при обработке вашего запроса. Попробуйте снова позже.');
            }
        } catch (err) {
            setResponse('Ошибка при создании заказа. Попробуйте снова позже.');
            console.error(err);
        }
    };

    return (
        <View style={{ flex: 1 }}>
            {/* Кнопка для заказа торта */}
            {/*<TouchableOpacity style={styles.orderCustomButton} onPress={() => setIsModalVisible(true)}>*/}
            {/*    <Text style={styles.orderCustomButtonText}>Заказать индивидуальный торт</Text>*/}
            {/*</TouchableOpacity>*/}

            <TouchableOpacity style={styles.messageLogo} onPress={() => setIsModalmesage(true)}>
                <MessageLogo width={50} height={50} />
            </TouchableOpacity>

            {/* Навигационное меню */}
            <Tabs
                screenOptions={{
                    tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                    headerShown: false,
                    tabBarStyle: {
                        zIndex: 10, // Устанавливаем zIndex
                        elevation: 10, // Для Android добавьте elevation (аналог zIndex)
                    },
                }}>
                <Tabs.Screen
                    name="index"
                    options={{
                        title: 'Главная',
                        tabBarIcon: ({ color, focused }) => (
                            <HomeIconSvg color={focused ? '#FF8C52' : color} size={sizeIcon} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="cakes"
                    options={{
                        title: 'Торты',
                        tabBarIcon: ({ color, focused }) => (
                            <CakeIconSvg color={focused ? '#FF849C' : color} size={sizeIcon} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="cupcakes"
                    options={{
                        title: 'Капкейки',
                        tabBarIcon: ({ color, focused }) => (
                            <CupcakeIconSvg color={focused ? '#FF849C' : color} size={sizeIcon} />
                        ),
                    }}
                />
            </Tabs>

            {/* Первое модальное окно для индивидуального заказа */}
            <CustomModal visible={isModalVisible} onClose={() => setIsModalVisible(false)}>
                <Text style={styles.modalTitle}>Индивидуальный заказ</Text>
                <TouchableOpacity style={styles.imagePicker} onPress={handleImagePick}>
                    <Text style={styles.imagePickerText}>Нажмите для загрузки фото</Text>
                    {selectedImage && (
                        <Image source={{ uri: selectedImage }} style={styles.imagePreview} />
                    )}
                </TouchableOpacity>
                <Text style={styles.imageFormats}>Форматы: SVG, PNG, JPG или GIF (Макс. 800x400 пикселей)</Text>
                <TextInput
                    style={styles.phoneInput}
                    placeholder="+7 (___) ___-__-__"
                    keyboardType="phone-pad"
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                />
                <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
                    <Text style={styles.submitButtonText}>Отправить</Text>
                </TouchableOpacity>
            </CustomModal>

            {/* Второе модальное окно */}
            <CustomModal visible={isSecondModalVisible} onClose={() => setIsSecondModalVisible(false)}>
                <AuthLinks />
            </CustomModal>

            <CustomModal visible={isModalmesage} onClose={() => setIsModalmesage(false)}>
                <View style={styles.container}>
                    <Text style={styles.headerText}>Свяжитесь с нами</Text>

                    <View style={styles.linksContainer}>
                        <TouchableOpacity onPress={() => Linking.openURL('https://t.me/+79004972740')}>
                            <Text style={styles.telegramLink}>Telegram</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => Linking.openURL('https://wa.me/79004972740')}>
                            <Text style={styles.whatsappLink}>WhatsApp</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => Linking.openURL('https://vk.com/odeshop')}>
                            <Text style={styles.vkLink}>VK</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.formContainer}>
                        <Text style={styles.label}>Номер телефона:</Text>
                        <TextInputMask
                            type={'custom'}
                            options={{
                                mask: '+7 (999) 999-99-99'
                            }}
                            value={phone}
                            onChangeText={handlePhoneChange}
                            keyboardType="phone-pad"
                            style={[styles.input, phoneError ? styles.inputError : null]}
                            placeholder="+7 (___) ___-__-__"
                        />
                        {phoneError && <Text style={styles.errorText}>{phoneError}</Text>}
                    </View>

                    <TouchableOpacity style={styles.submitButton} onPress={handleFormSubmit}>
                        <Text style={styles.submitButtonText}>Отправить</Text>
                    </TouchableOpacity>

                    {response ? (
                        typeof response === 'string' ? (
                            <Text style={styles.responseText}>{response}</Text>
                        ) : (
                            <Text style={styles.responseText}>Ошибка: Некорректный формат данных</Text>
                        )
                    ) : null}

                </View>
            </CustomModal>
        </View>
    );
}

const styles = StyleSheet.create({
    orderCustomButton: {
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0,
        backgroundColor: '#111827',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 30,
        alignItems: 'center',
        alignSelf: 'center',
        zIndex: 10,
    },
    orderCustomButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    imagePicker: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
        marginBottom: 10,
    },
    imagePickerText: {
        fontSize: 16,
        color: '#555',
    },
    imagePreview: {
        width: 100,
        height: 100,
        marginTop: 10,
        borderRadius: 10,
    },
    imageFormats: {
        fontSize: 12,
        color: '#777',
        textAlign: 'center',
        marginBottom: 20,
    },
    phoneInput: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 20,
        fontSize: 16,
    },
    submitButton: {
        backgroundColor: '#2563EB',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: 'center',
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    messageLogo: {
        position: 'absolute',
        zIndex: 10, // Используем camelCase вместо z-index
        right: 7, // Без px, просто указываем значение
        bottom: 50, // Также без px
    },
    container: {
        marginTop: 16,
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    headerText: {
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 16,
    },
    linksContainer: {
        marginBottom: 16,
    },
    telegramLink: {
        color: '#1DA1F2',
        textAlign: 'center',
        marginVertical: 4,
    },
    whatsappLink: {
        color: '#25D366',
        textAlign: 'center',
        marginVertical: 4,
    },
    vkLink: {
        color: '#4C75A3',
        textAlign: 'center',
        marginVertical: 4,
    },
    formContainer: {
        marginBottom: 16,
    },
    label: {
        marginBottom: 8,
        fontSize: 16,
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
        padding: 10,
    },
    inputError: {
        borderColor: 'red',
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: 4,
    },
    responseText: {
        textAlign: 'center',
        marginTop: 16,
        color: 'green',
        fontSize: 16,
    },
});