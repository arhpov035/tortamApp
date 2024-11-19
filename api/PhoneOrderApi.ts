import { PhoneOrder } from '@/types/PhoneOrderApi';
import axios from 'axios';
import { CONFIG } from '@/config';

// Базовый URL для API
const BASE_URL = CONFIG.BASE_URL + "/phone-orders";



class PhoneOrderApi {
  // Получить все заказы
  static async getAllPhoneOrders(): Promise<PhoneOrder[]> {
    const response = await axios.get<PhoneOrder[]>(`${BASE_URL}`);
    return response.data;
  }

  // Получить заказ по ID
  static async getPhoneOrderById(id: string): Promise<PhoneOrder> {
    const response = await axios.get<PhoneOrder>(`${BASE_URL}/${id}`);
    return response.data;
  }

  // Создать новый заказ
  static async createPhoneOrder(phoneOrder: PhoneOrder): Promise<PhoneOrder> {
    const response = await axios.post<PhoneOrder>(`${BASE_URL}`, phoneOrder);
    return response.data;
  }

  // Обновить заказ по ID
  static async updatePhoneOrder(id: string, phoneOrder: PhoneOrder): Promise<PhoneOrder> {
    const response = await axios.put<PhoneOrder>(`${BASE_URL}/${id}`, phoneOrder);
    return response.data;
  }

  // Удалить заказ по ID
  static async deletePhoneOrder(id: string): Promise<void> {
    await axios.delete(`${BASE_URL}/${id}`);
  }
}

export default PhoneOrderApi;
