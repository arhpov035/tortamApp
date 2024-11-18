// utils/validatePhone.ts

/**
 * Валидация номера телефона в формате +7 (999) 999-99-99.
 * @param phone - Номер телефона в виде строки.
 * @returns Сообщение об ошибке или null, если номер телефона корректный.
 */
export const validatePhone = (phone: string): string | null => {
    const phoneRegex = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;

    if (!phone) {
        return "Пожалуйста, введите номер телефона";
    }

    if (!phoneRegex.test(phone)) {
        return "Некорректный формат номера телефона";
    }

    return null; // Возвращаем null, если ошибок нет
};
