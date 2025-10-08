// Configuración usando WeatherAPI.com (gratuita y confiable)
export const API_CONFIG = {
  // WeatherAPI.com (gratuita, 1 millón de llamadas/mes)
  WEATHERAPI_BASE_URL: 'https://api.weatherapi.com/v1',
  API_KEY: '256c0be032f848bfa5315031250810', // Clave real de WeatherAPI.com
  
  // Default location (Madrid, Spain) for fallback
  DEFAULT_LOCATION: {
    lat: 40.4168,
    lon: -3.7038,
    name: 'Madrid',
    country: 'ES'
  }
};

// WeatherAPI.com es gratuita y confiable
export const isUsingRealAPI = () => true;

// Información sobre WeatherAPI
export const getAPIInfo = () => {
  return {
    name: 'WeatherAPI.com',
    description: 'API meteorológica gratuita y confiable',
    features: [
      '✅ 1 millón de llamadas gratuitas por mes',
      '✅ Datos en tiempo real',
      '✅ Pronóstico de 3 días',
      '✅ Calidad del aire',
      '✅ Geocodificación',
      '✅ Datos en español',
      '✅ Muy estable y confiable'
    ],
    website: 'https://www.weatherapi.com/',
    documentation: 'https://www.weatherapi.com/docs/'
  };
};
