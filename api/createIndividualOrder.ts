import { Platform } from 'react-native';
import axios from "axios";

// Определяем типы для фото
type WebPhoto = File;
type MobilePhoto = {
    uri: string;
    type: string;
    name: string;
};
type PhotoType = WebPhoto | MobilePhoto | null;

const apiUrl = 'https://sb-api.tortam.ru/api/v1';

if (!apiUrl) {
    throw new Error('REACT_NATIVE_API_URL не определён в конфигурации');
}

const apiClient = axios.create({
    baseURL: apiUrl,
});

export const createIndividualOrder = async (
    phone: string,
    photo?: PhotoType
) => {
    const formData = new FormData();
    formData.append("phone", phone);

    if (photo) {
        if (Platform.OS === 'web') {
            // Для веб-платформы
            if (photo instanceof File) {
                formData.append("photo", photo);
            }
        } else {
            // Для мобильных платформ
            if ('uri' in photo) {
                formData.append("photo", {
                    uri: photo.uri,
                    type: photo.type || 'image/jpeg', // Добавляем значение по умолчанию
                    name: photo.name || 'photo.jpg',  // Добавляем значение по умолчанию
                } as any);
            }
        }
    }

    try {
        const response = await apiClient.post('/individual-orders', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data;
    } catch (error: any) {
        throw new Error("Ошибка при отправке данных на сервер: " + error.message);
    }
};