const ENV = process.env.NODE_ENV; // 'development' или 'production'

export const CONFIG = {
  BASE_URL:
    ENV === "production"
      ? "https://sb-api.tortam.ru/api/v1"
      : "https://sb-api.tortam.ru/api/v1",
  PRICE_TORT_KG: 1600, // Цена за килограмм
  PRICE_TORT_OT_4_KG: 1900, // Цена за килограммы от 4 кг
};
