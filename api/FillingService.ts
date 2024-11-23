import axios from 'axios';
import { CONFIG } from '../config'; // Убедитесь, что этот файл существует и содержит BASE_URL
import { Filling } from '@/types/Filling';

const apiUrl = CONFIG.BASE_URL;

export class FillingService {
  static async fetchAllFillings(): Promise<Filling[]> {
    const response = await axios.get(`${apiUrl}/fillings`);
    return response.data;
  }
}
