import axios from 'axios';
import { CONFIG } from '@/config';


// Получаем URL API из expoConfig
// const apiUrl = 'https://sb-api.tortam.ru/api/v1';
const apiUrl = CONFIG.BASE_URL;

console.log("apiUrl: " + apiUrl);


// Проверяем, что URL не пустой
if (!apiUrl) {
    throw new Error('REACT_NATIVE_API_URL не определён в конфигурации');
}

// Создаем экземпляр axios с базовым URL для удобства
const apiClient = axios.create({
    baseURL: apiUrl,
});

// Тип данных для продуктов
export interface Product {
    id: string;
    productname: string;
    description: string;
    price: number;
    image_url: string;
    // Добавьте другие поля, если они есть
}

// Функция для получения списка продуктов с указанием начала и количества
export const fetchProducts = async (start: number, count: number): Promise<Product[]> => {
    try {
        const response = await apiClient.get('/products/page', {
            params: { start, count },
        });
        // console.log('Ответ от сервера:', JSON.stringify(response.data, null, 2));
        return response.data as Product[];
    } catch (error) {
        console.error('Ошибка при получении продуктов:', error);
        throw error;
    }
};
