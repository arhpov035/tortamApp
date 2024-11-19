/**
 * Преобразует номер телефона в формат без символов и пробелов.
 * @param phone - номер телефона в формате "+7 (920) 471-87-31"
 * @returns номер телефона в формате "79204718731"
 */
export const normalizePhoneNumber = (phone: string): string => {
  // Убираем все ненужные символы, оставляя только цифры
  return phone.replace(/[\s()+-]/g, "");
};
