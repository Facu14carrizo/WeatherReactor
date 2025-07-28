// Temperature conversion functions
export const convertTemperature = (temp: number, fromUnit: 'metric' | 'imperial', toUnit: 'metric' | 'imperial'): number => {
  if (fromUnit === toUnit) return temp;
  
  if (fromUnit === 'metric' && toUnit === 'imperial') {
    return (temp * 9/5) + 32; // Celsius to Fahrenheit
  } else if (fromUnit === 'imperial' && toUnit === 'metric') {
    return (temp - 32) * 5/9; // Fahrenheit to Celsius
  }
  
  return temp;
};

export const getTemperatureUnit = (units: 'metric' | 'imperial'): string => {
  return units === 'metric' ? '°C' : '°F';
};

export const convertSpeed = (speed: number, fromUnit: 'metric' | 'imperial', toUnit: 'metric' | 'imperial'): number => {
  if (fromUnit === toUnit) return speed;
  
  if (fromUnit === 'metric' && toUnit === 'imperial') {
    return speed * 2.237; // m/s to mph
  } else if (fromUnit === 'imperial' && toUnit === 'metric') {
    return speed / 2.237; // mph to m/s
  }
  
  return speed;
};

export const getSpeedUnit = (units: 'metric' | 'imperial'): string => {
  return units === 'metric' ? 'm/s' : 'mph';
};

// Language translations
export const translations = {
  es: {
    // UI Elements
    'Weather Forecast': 'Pronóstico del Tiempo',
    'Hourly Forecast': 'Pronóstico por Horas',
    '7-Day Forecast': 'Pronóstico de 7 Días',
    'Today': 'Hoy',
    'Temperature': 'Temperatura',
    'Feels Like': 'Sensación Térmica',
    'Precipitation': 'Precipitación',
    'Wind Speed': 'Velocidad del Viento',
    'Humidity': 'Humedad',
    'Pressure': 'Presión',
    'Air Quality Index': 'Índice de Calidad del Aire',
    'Sunrise': 'Amanecer',
    'Sunset': 'Atardecer',
    'Visibility': 'Visibilidad',
    'Loading Weather Data': 'Cargando Datos Meteorológicos',
    'Getting latest conditions': 'Obteniendo las condiciones más recientes',
    // Weather conditions
    'clear sky': 'cielo despejado',
    'few clouds': 'pocas nubes',
    'scattered clouds': 'nubes dispersas',
    'broken clouds': 'nubes rotas',
    'shower rain': 'lluvia ligera',
    'rain': 'lluvia',
    'thunderstorm': 'tormenta',
    'snow': 'nieve',
    'mist': 'neblina',
    'fog': 'niebla',
    'haze': 'bruma',
    'dust': 'polvo',
    'sand': 'arena',
    'ash': 'ceniza',
    'squall': 'ráfaga',
    'tornado': 'tornado',
    // Weather main categories
    'Clear': 'Despejado',
    'Clouds': 'Nublado',
    'Rain': 'Lluvia',
    'Drizzle': 'Llovizna',
    'Thunderstorm': 'Tormenta',
    'Snow': 'Nieve',
    'Mist': 'Neblina',
    'Smoke': 'Humo',
    'Haze': 'Bruma',
    'Dust': 'Polvo',
    'Fog': 'Niebla',
    'Sand': 'Arena',
    'Ash': 'Ceniza',
    'Squall': 'Ráfaga',
    'Tornado': 'Tornado',
    // Days of week
    'Monday': 'Lunes',
    'Tuesday': 'Martes',
    'Wednesday': 'Miércoles',
    'Thursday': 'Jueves',
    'Friday': 'Viernes',
    'Saturday': 'Sábado',
    'Sunday': 'Domingo',
    // Months
    'January': 'Enero',
    'February': 'Febrero',
    'March': 'Marzo',
    'April': 'Abril',
    'May': 'Mayo',
    'June': 'Junio',
    'July': 'Julio',
    'August': 'Agosto',
    'September': 'Septiembre',
    'October': 'Octubre',
    'November': 'Noviembre',
    'December': 'Diciembre'
  },
  en: {
    // UI Elements
    'Weather Forecast': 'Weather Forecast',
    'Hourly Forecast': 'Hourly Forecast',
    '7-Day Forecast': '7-Day Forecast',
    'Today': 'Today',
    'Temperature': 'Temperature',
    'Feels Like': 'Feels Like',
    'Precipitation': 'Precipitation',
    'Wind Speed': 'Wind Speed',
    'Humidity': 'Humidity',
    'Pressure': 'Pressure',
    'Air Quality Index': 'Air Quality Index',
    'Sunrise': 'Sunrise',
    'Sunset': 'Sunset',
    'Visibility': 'Visibility',
    'Loading Weather Data': 'Loading Weather Data',
    'Getting latest conditions': 'Getting latest conditions',
    // Weather conditions
    'clear sky': 'clear sky',
    'few clouds': 'few clouds',
    'scattered clouds': 'scattered clouds',
    'broken clouds': 'broken clouds',
    'shower rain': 'shower rain',
    'rain': 'rain',
    'thunderstorm': 'thunderstorm',
    'snow': 'snow',
    'mist': 'mist',
    'fog': 'fog',
    'haze': 'haze',
    // Weather main categories
    'Clear': 'Clear',
    'Clouds': 'Clouds',
    'Rain': 'Rain',
    'Drizzle': 'Drizzle',
    'Thunderstorm': 'Thunderstorm',
    'Snow': 'Snow',
    'Mist': 'Mist',
    'Smoke': 'Smoke',
    'Haze': 'Haze',
    'Dust': 'Dust',
    'Fog': 'Fog',
    'Sand': 'Sand',
    'Ash': 'Ash',
    'Squall': 'Squall',
    'Tornado': 'Tornado'
  },
  fr: {
    // UI Elements
    'Weather Forecast': 'Prévisions Météo',
    'Hourly Forecast': 'Prévisions Horaires',
    '7-Day Forecast': 'Prévisions 7 Jours',
    'Today': "Aujourd'hui",
    'Temperature': 'Température',
    'Feels Like': 'Ressenti',
    'Precipitation': 'Précipitation',
    'Wind Speed': 'Vitesse du Vent',
    'Humidity': 'Humidité',
    'Pressure': 'Pression',
    'Air Quality Index': 'Indice de Qualité de l\'Air',
    'Sunrise': 'Lever du Soleil',
    'Sunset': 'Coucher du Soleil',
    'Visibility': 'Visibilité',
    'Loading Weather Data': 'Chargement des Données Météo',
    'Getting latest conditions': 'Obtention des dernières conditions',
    // Weather main categories
    'Clear': 'Clair',
    'Clouds': 'Nuageux',
    'Rain': 'Pluie',
    'Snow': 'Neige',
    'Thunderstorm': 'Orage'
  },
  de: {
    // UI Elements
    'Weather Forecast': 'Wettervorhersage',
    'Hourly Forecast': 'Stündliche Vorhersage',
    '7-Day Forecast': '7-Tage Vorhersage',
    'Today': 'Heute',
    'Temperature': 'Temperatur',
    'Feels Like': 'Gefühlt',
    'Precipitation': 'Niederschlag',
    'Wind Speed': 'Windgeschwindigkeit',
    'Humidity': 'Luftfeuchtigkeit',
    'Pressure': 'Druck',
    'Air Quality Index': 'Luftqualitätsindex',
    'Sunrise': 'Sonnenaufgang',
    'Sunset': 'Sonnenuntergang',
    'Visibility': 'Sichtweite',
    'Loading Weather Data': 'Wetterdaten Laden',
    'Getting latest conditions': 'Neueste Bedingungen abrufen',
    // Weather main categories
    'Clear': 'Klar',
    'Clouds': 'Bewölkt',
    'Rain': 'Regen',
    'Snow': 'Schnee',
    'Thunderstorm': 'Gewitter'
  }
};

export const translateText = (text: string, language: string): string => {
  const lang = translations[language as keyof typeof translations];
  if (!lang) return text;
  
  return lang[text as keyof typeof lang] || text;
};

export const getWeatherIcon = (weatherId: number, isDay: boolean = true): string => {
  const iconMap: { [key: number]: string } = {
    200: '⛈️', 201: '⛈️', 202: '⛈️', 210: '🌩️', 211: '🌩️', 212: '🌩️', 221: '🌩️', 230: '⛈️', 231: '⛈️', 232: '⛈️',
    300: '🌦️', 301: '🌦️', 302: '🌦️', 310: '🌦️', 311: '🌦️', 312: '🌦️', 313: '🌦️', 314: '🌦️', 321: '🌦️',
    500: '🌧️', 501: '🌧️', 502: '⛈️', 503: '⛈️', 504: '⛈️', 511: '🌨️', 520: '🌦️', 521: '🌦️', 522: '🌧️', 531: '🌧️',
    600: '🌨️', 601: '❄️', 602: '❄️', 611: '🌨️', 612: '🌨️', 613: '🌨️', 615: '🌨️', 616: '🌨️', 620: '🌨️', 621: '❄️', 622: '❄️',
    701: '🌫️', 711: '💨', 721: '🌫️', 731: '💨', 741: '🌫️', 751: '💨', 761: '💨', 762: '🌋', 771: '💨', 781: '🌪️',
    800: isDay ? '☀️' : '🌙',
    801: isDay ? '🌤️' : '☁️', 802: '⛅', 803: '☁️', 804: '☁️'
  };
  
  return iconMap[weatherId] || (isDay ? '☀️' : '🌙');
};

export const getWeatherMessage = (weather: string, temp: number): string => {
  const messages: { [key: string]: string[] } = {
    Clear: [
      "¡Perfecto día para salir y disfrutar del sol!",
      "El cielo está despejado, ¡aprovecha este hermoso día!",
      "Día soleado ideal para actividades al aire libre"
    ],
    Clouds: [
      "Día nublado pero perfecto para un paseo",
      "Las nubes crean un ambiente relajante",
      "Día tranquilo bajo un cielo nublado"
    ],
    Rain: [
      "Día perfecto para quedarse en casa con un buen libro",
      "La lluvia trae frescura al ambiente",
      "Sonido relajante de la lluvia"
    ],
    Snow: [
      "¡Paisaje invernal mágico!",
      "Día perfecto para chocolate caliente",
      "La nieve crea un ambiente único"
    ]
  };

  const weatherMessages = messages[weather] || messages.Clear;
  const randomMessage = weatherMessages[Math.floor(Math.random() * weatherMessages.length)];

  if (temp > 25) return `${randomMessage} 🌡️ ¡Hace calor!`;
  if (temp < 5) return `${randomMessage} 🧥 ¡Abrígate bien!`;
  return randomMessage;
};

export const formatTime = (timestamp: number, timezone: number = 0): string => {
  const locale = 'en-US'; // Will be handled by component level
  return new Date((timestamp + timezone) * 1000).toLocaleTimeString(locale, {
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const formatDate = (timestamp: number): string => {
  const locale = 'en-US'; // Will be handled by component level  
  return new Date(timestamp * 1000).toLocaleDateString(locale, {
    weekday: 'long',
    month: 'short',
    day: 'numeric'
  });
};

export const getAirQualityStatus = (aqi: number): { label: string; color: string } => {
  const statuses = [
    { label: 'Excelente', color: 'text-green-500' },
    { label: 'Buena', color: 'text-green-400' },
    { label: 'Moderada', color: 'text-yellow-500' },
    { label: 'Mala', color: 'text-orange-500' },
    { label: 'Muy Mala', color: 'text-red-500' }
  ];
  
  return statuses[Math.min(aqi - 1, 4)] || statuses[0];
};

export const getWindDirection = (deg: number): string => {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  return directions[Math.round(deg / 22.5) % 16];
};

export const getLocale = (language: string): string => {
  const localeMap: { [key: string]: string } = {
    'es': 'es-ES',
    'en': 'en-US',
    'fr': 'fr-FR',
    'de': 'de-DE'
  };
  
  return localeMap[language] || 'en-US';
};