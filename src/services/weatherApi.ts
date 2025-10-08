import { API_CONFIG } from '../config/api';

// Helper function to handle API errors
const handleAPIError = (error: any, context: string) => {
  console.error(`API Error in ${context}:`, error);
  
  if (error.message?.includes('404')) {
    throw new Error('Ubicación no encontrada.');
  } else if (error.message?.includes('429')) {
    throw new Error('Demasiadas solicitudes. Intenta más tarde.');
  } else {
    throw new Error(`Error al obtener datos meteorológicos: ${error.message || 'Error desconocido'}`);
  }
};

// Fallback data for when API is not available
const getFallbackWeather = (lat: number, lon: number) => {
  const now = Math.floor(Date.now() / 1000);
  // Buenos Aires GMT-3
  const nowDate = new Date(Date.now() - 3 * 3600 * 1000); // Corrige a hora local GMT-3
  nowDate.setHours(0, 0, 0, 0);
  const startOfDay = Math.floor(nowDate.getTime() / 1000) + 3 * 3600; // Corrige de vuelta a UTC
  // Amanecer a las 6:30 AM, atardecer a las 19:00 (7:00 PM) hora local
  const sunrise = startOfDay + 6 * 3600 + 30 * 60;
  const sunset = startOfDay + 19 * 3600;
  return {
    id: 999999,
    name: 'Buenos Aires',
    country: 'AR',
    coord: { lat, lon },
    weather: [{
      id: 800,
      main: 'Clear',
      description: 'cielo despejado',
      icon: '01d'
    }],
    main: {
      temp: 24,
      feels_like: 25,
      temp_min: 22,
      temp_max: 27,
      pressure: 1012,
      humidity: 60
    },
    wind: {
      speed: 3.5,
      deg: 120
    },
    visibility: 10000,
    clouds: { all: 0 },
    dt: now,
    sys: {
      country: 'AR',
      sunrise,
      sunset
    },
    timezone: -10800 // GMT-3
  };
};

const mockForecast = (() => {
  const now = Date.now();
  const base = now - (now % 3600000); // redondea a la hora actual
  // Buenos Aires GMT-3
  const nowDate = new Date(now - 3 * 3600 * 1000);
  nowDate.setHours(0, 0, 0, 0);
  const startOfDay = Math.floor(nowDate.getTime() / 1000) + 3 * 3600;
  const sunrise = startOfDay + 6 * 3600 + 30 * 60;
  const sunset = startOfDay + 19 * 3600;
  return {
    list: Array.from({ length: 24 }, (_, i) => {
      const dt = Math.floor((base + i * 3600000) / 1000);
      // Simula variaciones realistas
      const temp = 24 + Math.sin(i / 3) * 2;
      const feels_like = temp + Math.cos(i / 2) * 1.5;
      const humidity = 55 + Math.round(20 * Math.abs(Math.sin(i / 6)));
      const wind = 2 + Math.abs(Math.sin(i / 4)) * 4 + Math.random();
      const pressure = 1010 + Math.round(8 * Math.sin(i / 5));
      const pop = Math.max(0, Math.sin(i / 3 - 1) * 0.4 + Math.random() * 0.1); // 0-0.5
      return {
        dt,
        main: {
          temp,
          feels_like,
          temp_min: temp - 1,
          temp_max: temp + 1,
          pressure,
          humidity
        },
        weather: [{
          id: 800,
          main: 'Clear',
          description: 'cielo despejado',
          icon: '01d'
        }],
        clouds: { all: Math.round(20 + 30 * Math.abs(Math.sin(i / 4))) },
        wind: {
          speed: wind,
          deg: 120
        },
        visibility: 10000,
        pop,
        dt_txt: new Date(base + i * 3600000).toISOString()
      };
    }),
    city: {
      id: 999999,
      name: 'Buenos Aires',
      coord: { lat: -34.6037, lon: -58.3816 },
      country: 'AR',
      population: 15000000,
      timezone: -10800,
      sunrise,
      sunset
    }
  };
})();

const mockAirQuality = {
  coord: { lon: -58.3816, lat: -34.6037 },
  list: [{
    main: { aqi: 2 },
    components: {
      co: 200,
      no: 0.01,
      no2: 10,
      o3: 50,
      so2: 3,
      pm2_5: 8,
      pm10: 15,
      nh3: 2
    },
    dt: Math.floor(Date.now() / 1000)
  }]
};

const mockCities = [
  { id: 1, name: 'London', country: 'GB', coord: { lat: 51.5074, lon: -0.1278 } },
  { id: 2, name: 'New York', country: 'US', coord: { lat: 40.7128, lon: -74.0060 } },
  { id: 3, name: 'Tokyo', country: 'JP', coord: { lat: 35.6762, lon: 139.6503 } },
  { id: 4, name: 'Paris', country: 'FR', coord: { lat: 48.8566, lon: 2.3522 } },
  { id: 5, name: 'Sydney', country: 'AU', coord: { lat: -33.8688, lon: 151.2093 } }
];

const mockAlerts = [
  {
    id: '1',
    title: 'Alerta de Lluvia Intensa',
    description: 'Se esperan lluvias intensas en las próximas 6 horas. Posibles inundaciones en áreas bajas.',
    severity: 'moderate' as const,
    start: Date.now() / 1000,
    end: Date.now() / 1000 + 21600,
    tags: ['lluvia', 'inundación']
  }
];

const mockUVIndex = {
  value: 6,
  risk: 'High',
  color: 'text-orange-500'
};

const mockMoonPhase = {
  phase: 0.25,
  name: 'First Quarter',
  icon: '🌓'
};

export const weatherApi = {
  async getCurrentWeather(lat?: number, lon?: number) {
    try {
      const url = `${API_CONFIG.WEATHERAPI_BASE_URL}/current.json?key=${API_CONFIG.API_KEY}&q=${lat},${lon}&lang=es`;
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      const data = await response.json();
      // Amanecer y atardecer fijos
      const now = new Date();
      const localDate = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`;
      const sunrise = Math.floor(new Date(`${localDate} 06:30:00 GMT-0300`).getTime() / 1000);
      const sunset = Math.floor(new Date(`${localDate} 19:00:00 GMT-0300`).getTime() / 1000);
      return {
        id: Math.floor(Math.random() * 1000000),
        name: 'Buenos Aires',
        country: 'Argentina',
        coord: { lat: -34.6037, lon: -58.3816 },
        weather: [{
          id: data.current.condition?.code || 1000,
          main: data.current.condition?.text || 'Despejado',
          description: data.current.condition?.text || 'despejado',
          icon: '01d'
        }],
        main: {
          temp: Math.round(data.current.temp_c),
          feels_like: Math.round(data.current.feelslike_c),
          temp_min: Math.round(data.current.temp_c - 2),
          temp_max: Math.round(data.current.temp_c + 2),
          pressure: data.current.pressure_mb,
          humidity: data.current.humidity
        },
        wind: {
          speed: Math.round(data.current.wind_kph / 3.6),
          deg: data.current.wind_degree
        },
        visibility: data.current.vis_km * 1000,
        clouds: { all: data.current.cloud },
        dt: Math.floor(Date.now() / 1000),
        sys: {
          country: 'Argentina',
          sunrise,
          sunset
        },
        timezone: -10800
      };
    } catch (error) {
      return getFallbackWeather(lat ?? -34.6037, lon ?? -58.3816);
    }
  },
  async getForecast(lat?: number, lon?: number) {
    try {
      const url = `${API_CONFIG.WEATHERAPI_BASE_URL}/forecast.json?key=${API_CONFIG.API_KEY}&q=${lat},${lon}&days=3&lang=es`;
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      const data = await response.json();
      // Adaptar al formato esperado
      const forecast = data.forecast?.forecastday?.[0]?.hour || [];
      return {
        list: forecast.map((hour: any) => ({
          dt: Math.floor(new Date(hour.time).getTime() / 1000),
          main: {
            temp: Math.round(hour.temp_c),
            feels_like: Math.round(hour.feelslike_c),
            temp_min: Math.round(hour.temp_c - 1),
            temp_max: Math.round(hour.temp_c + 1),
            pressure: hour.pressure_mb ?? 1013,
            humidity: hour.humidity ?? 60
          },
          weather: [{
            id: hour.condition?.code || 1000,
            main: hour.condition?.text || 'Despejado',
            description: hour.condition?.text || 'despejado',
            icon: '01d'
          }],
          clouds: { all: hour.cloud ?? 0 },
          wind: {
            speed: Math.round(hour.wind_kph / 3.6),
            deg: hour.wind_degree ?? 0
          },
          visibility: hour.vis_km ? hour.vis_km * 1000 : 10000,
          pop: (typeof hour.chance_of_rain === 'number' && hour.chance_of_rain !== null)
            ? hour.chance_of_rain / 100
            : Math.random() * 0.4,
          dt_txt: hour.time
        })),
        city: {
          id: Math.floor(Math.random() * 1000000),
          name: data.location?.name || 'Ubicación Actual',
          coord: { lat: data.location?.lat || lat, lon: data.location?.lon || lon },
          country: data.location?.country || 'AR',
          population: 0,
          timezone: data.location?.tz_id || -10800,
          sunrise: Math.floor(new Date(data.location?.localtime).setHours(6,30,0,0) / 1000),
          sunset: Math.floor(new Date(data.location?.localtime).setHours(19,0,0,0) / 1000)
        }
      };
    } catch (error) {
      // Simula 8 horas con precipitación variada
      const now = Date.now();
      const base = now - (now % 3600000);
      return {
        list: Array.from({ length: 8 }, (_, i) => {
          const dt = Math.floor((base + i * 3600000) / 1000);
          return {
            dt,
            main: {
              temp: 22 + Math.sin(i) * 2,
              feels_like: 22 + Math.sin(i) * 2,
              temp_min: 20,
              temp_max: 25,
              pressure: 1010 + Math.round(5 * Math.sin(i)),
              humidity: 60 + Math.round(10 * Math.abs(Math.sin(i / 2)))
            },
            weather: [{
              id: 800,
              main: 'Clear',
              description: 'cielo despejado',
              icon: '01d'
            }],
            clouds: { all: 10 + Math.round(30 * Math.abs(Math.sin(i / 2))) },
            wind: {
              speed: 2 + Math.abs(Math.sin(i / 3)) * 3,
              deg: 120
            },
            visibility: 10000,
            pop: 0.2 + 0.2 * Math.abs(Math.sin(i)), // 0.2 a 0.4
            dt_txt: new Date(base + i * 3600000).toISOString()
          };
        }),
        city: {
          id: 999999,
          name: 'Buenos Aires',
          coord: { lat: -34.6037, lon: -58.3816 },
          country: 'AR',
          population: 15000000,
          timezone: -10800,
          sunrise: Math.floor(new Date().setHours(6,30,0,0) / 1000),
          sunset: Math.floor(new Date().setHours(19,0,0,0) / 1000)
        }
      };
    }
  },
  async getAirQuality(lat?: number, lon?: number) {
    try {
      const url = `${API_CONFIG.WEATHERAPI_BASE_URL}/current.json?key=${API_CONFIG.API_KEY}&q=${lat},${lon}&aqi=yes`;
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      const data = await response.json();
      const airQuality = data.current?.air_quality;
      return {
        coord: { lon: data.location?.lon || lon, lat: data.location?.lat || lat },
        list: [{
          main: { aqi: airQuality?.us_epa_index || 1 },
          components: {
            co: airQuality?.co || 0,
            no: 0,
            no2: airQuality?.no2 || 0,
            o3: airQuality?.o3 || 0,
            so2: airQuality?.so2 || 0,
            pm2_5: airQuality?.pm2_5 || 0,
            pm10: airQuality?.pm10 || 0,
            nh3: 0
          },
          dt: Math.floor(Date.now() / 1000)
        }]
      };
    } catch (error) {
      return mockAirQuality;
    }
  },
  async searchCities(query: string) {
    // Solo Buenos Aires
    if (query.toLowerCase().includes('buenos')) {
      return [{
        id: 999999,
        name: 'Buenos Aires',
        country: 'AR',
        coord: { lat: -34.6037, lon: -58.3816 }
      }];
    }
    return [];
  },
  async getReverseGeocode(lat?: number, lon?: number) {
    // Siempre Buenos Aires
    return [{
      id: 999999,
      name: 'Buenos Aires',
      country: 'AR',
      coord: { lat: -34.6037, lon: -58.3816 }
    }];
  },
  async getWeatherAlerts(lat?: number, lon?: number) {
    // Open-Meteo no tiene alertas meteorológicas en su API gratuita
    // Usaremos datos mock por ahora
    return new Promise(resolve => {
      setTimeout(() => resolve([]), 300);
    });
  },
  async getUVIndex(lat?: number, lon?: number) {
    // Open-Meteo no tiene índice UV en su API gratuita
    // Usaremos datos mock por ahora
    return new Promise(resolve => {
      setTimeout(() => resolve(mockUVIndex), 200);
    });
  },
  async getMoonPhase(lat?: number, lon?: number) {
    // Open-Meteo no tiene datos de fase lunar
    // Usaremos datos mock por ahora
    return new Promise(resolve => {
      setTimeout(() => resolve(mockMoonPhase), 200);
    });
  },

  // Funciones de conversión de formato WeatherAPI a formato compatible
  convertWeatherAPIToFormat(data: any, lat: number, lon: number) {
    const current = data.current;
    const location = data.location;
    
    return {
      id: Math.floor(Math.random() * 1000000),
      name: location?.name || 'Ubicación Actual',
      coord: { lat, lon },
      weather: [{
        id: current.condition?.code || 1000,
        main: this.getWeatherMain(current.condition?.code),
        description: current.condition?.text || 'despejado',
        icon: this.getWeatherIcon(current.condition?.code)
      }],
      main: {
        temp: Math.round(current.temp_c),
        feels_like: Math.round(current.feelslike_c),
        temp_min: Math.round(current.temp_c - 2),
        temp_max: Math.round(current.temp_c + 2),
        pressure: current.pressure_mb,
        humidity: current.humidity
      },
      wind: {
        speed: Math.round(current.wind_kph),
        deg: current.wind_degree
      },
      visibility: current.vis_km * 1000,
      clouds: { all: current.cloud },
      dt: Math.floor(Date.now() / 1000),
      sys: {
        country: location?.country || 'ES',
        sunrise: Math.floor(new Date(location?.localtime).getTime() / 1000) - 21600,
        sunset: Math.floor(new Date(location?.localtime).getTime() / 1000) + 21600
      },
      timezone: location?.tz_id || 'Europe/Madrid'
    };
  },

  convertWeatherAPIToForecastFormat(data: any, lat: number, lon: number) {
    const forecast = data.forecast?.forecastday || [];
    const location = data.location;
    
    // Crear lista de pronósticos por horas (próximas 24 horas)
    const forecastList = [];
    for (let i = 0; i < 24; i++) {
      const hour = forecast[0]?.hour?.[i];
      if (hour) {
        forecastList.push({
          dt: Math.floor(new Date(hour.time).getTime() / 1000),
          main: {
            temp: Math.round(hour.temp_c),
            feels_like: Math.round(hour.feelslike_c),
            temp_min: Math.round(hour.temp_c - 1),
            temp_max: Math.round(hour.temp_c + 1),
            pressure: hour.pressure_mb,
            humidity: hour.humidity
          },
          weather: [{
            id: hour.condition?.code || 1000,
            main: this.getWeatherMain(hour.condition?.code),
            description: hour.condition?.text || 'despejado',
            icon: this.getWeatherIcon(hour.condition?.code)
          }],
          clouds: { all: hour.cloud },
          wind: {
            speed: Math.round(hour.wind_kph),
            deg: hour.wind_degree
          },
          visibility: hour.vis_km * 1000,
          pop: hour.chance_of_rain / 100,
          dt_txt: hour.time
        });
      }
    }

    return {
      list: forecastList,
      city: {
        id: Math.floor(Math.random() * 1000000),
        name: location?.name || 'Ubicación Actual',
        coord: { lat, lon },
        country: location?.country || 'ES',
        population: 0,
        timezone: location?.tz_id || 'Europe/Madrid',
        sunrise: Math.floor(new Date(location?.localtime).getTime() / 1000) - 21600,
        sunset: Math.floor(new Date(location?.localtime).getTime() / 1000) + 21600
      }
    };
  },

  convertWeatherAPIToAirQualityFormat(data: any, lat: number, lon: number) {
    const airQuality = data.current?.air_quality;
    
    return {
      coord: { lon, lat },
      list: [{
        main: { 
          aqi: airQuality?.us_epa_index || 1
        },
        components: {
          co: airQuality?.co || 0,
          no: 0,
          no2: airQuality?.no2 || 0,
          o3: airQuality?.o3 || 0,
          so2: airQuality?.so2 || 0,
          pm2_5: airQuality?.pm2_5 || 0,
          pm10: airQuality?.pm10 || 0,
          nh3: 0
        },
        dt: Math.floor(Date.now() / 1000)
      }]
    };
  },

  getWeatherMain(code: number): string {
    const weatherMap: { [key: number]: string } = {
      1000: 'Clear',
      1003: 'Clouds',
      1006: 'Clouds',
      1009: 'Clouds',
      1030: 'Mist',
      1063: 'Rain',
      1066: 'Snow',
      1069: 'Snow',
      1072: 'Snow',
      1087: 'Thunderstorm',
      1114: 'Snow',
      1117: 'Snow',
      1135: 'Mist',
      1147: 'Mist',
      1150: 'Drizzle',
      1153: 'Drizzle',
      1168: 'Drizzle',
      1171: 'Drizzle',
      1180: 'Rain',
      1183: 'Rain',
      1186: 'Rain',
      1189: 'Rain',
      1192: 'Rain',
      1195: 'Rain',
      1198: 'Rain',
      1201: 'Rain',
      1204: 'Snow',
      1207: 'Snow',
      1210: 'Snow',
      1213: 'Snow',
      1216: 'Snow',
      1219: 'Snow',
      1222: 'Snow',
      1225: 'Snow',
      1237: 'Snow',
      1240: 'Rain',
      1243: 'Rain',
      1246: 'Rain',
      1249: 'Snow',
      1252: 'Snow',
      1255: 'Snow',
      1258: 'Snow',
      1261: 'Snow',
      1264: 'Snow',
      1273: 'Thunderstorm',
      1276: 'Thunderstorm',
      1279: 'Thunderstorm',
      1282: 'Thunderstorm'
    };
    return weatherMap[code] || 'Clear';
  },

  getWeatherIcon(code: number): string {
    const iconMap: { [key: number]: string } = {
      1000: '01d',
      1003: '02d',
      1006: '04d',
      1009: '04d',
      1030: '50d',
      1063: '10d',
      1066: '13d',
      1069: '13d',
      1072: '13d',
      1087: '11d',
      1114: '13d',
      1117: '13d',
      1135: '50d',
      1147: '50d',
      1150: '09d',
      1153: '09d',
      1168: '09d',
      1171: '09d',
      1180: '10d',
      1183: '10d',
      1186: '10d',
      1189: '10d',
      1192: '10d',
      1195: '10d',
      1198: '10d',
      1201: '10d',
      1204: '13d',
      1207: '13d',
      1210: '13d',
      1213: '13d',
      1216: '13d',
      1219: '13d',
      1222: '13d',
      1225: '13d',
      1237: '13d',
      1240: '10d',
      1243: '10d',
      1246: '10d',
      1249: '13d',
      1252: '13d',
      1255: '13d',
      1258: '13d',
      1261: '13d',
      1264: '13d',
      1273: '11d',
      1276: '11d',
      1279: '11d',
      1282: '11d'
    };
    return iconMap[code] || '01d';
  }
};