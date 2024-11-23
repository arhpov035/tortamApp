import axios, { AxiosInstance } from 'axios';
import { CONFIG } from '@/config';
import { Product } from '@/types/Product';

// Проверяем, что URL не пустой
const apiUrl = CONFIG.BASE_URL;
if (!apiUrl) {
    throw new Error('BASE_URL не определён в конфигурации');
}

// Класс для работы с API продуктов
class ProductApiService {
    private apiClient: AxiosInstance;

    constructor(baseURL: string) {
        // Создаем экземпляр axios
        this.apiClient = axios.create({
            baseURL,
        });
    }

    /**
     * Получить список продуктов
     * @param start Начало (offset) списка
     * @param count Количество продуктов
     */
    async fetchProducts(start: number, count: number): Promise<Product[]> {
        try {
            const response = await this.apiClient.get('/products/page', {
                params: { start, count },
            });
            return response.data as Product[];
        } catch (error) {
            console.error('Ошибка при получении списка продуктов:', error);
            throw error;
        }
    }

    /**
     * Получить продукт по ID
     * @param id ID продукта
     */
    async fetchProductById(id: number): Promise<Product> {
        try {
            const response = await this.apiClient.get(`/products/${id}`);
            return response.data as Product;
        } catch (error) {
            console.error(`Ошибка при получении продукта с ID ${id}:`, error);
            throw error;
        }
    }
}

// Экземпляр ProductApiService
const productApiService = new ProductApiService(apiUrl);

export default productApiService;
