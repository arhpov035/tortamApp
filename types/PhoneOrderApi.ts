export interface PhoneOrder {
  id?: string; // UUID, генерируется сервером
  productId: number; // Идентификатор продукта
  phoneNumber: string; // Номер телефона (макс. 15 символов)
  createdAt?: string; // Время создания (ISO-строка)
  status: string; // Статус заказа (макс. 50 символов)
}
