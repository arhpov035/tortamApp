const ENV = process.env.NODE_ENV; // 'development' или 'production'

export const CONFIG = {
  BASE_URL: ENV === 'production'
    ? 'https://sb-api.tortam.ru/api/v1'
    : 'https://sb-api.tortam.ru/api/v1',
};
