const API_KEY = 'demo_key'; // In production, use environment variable
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Mock data for demo purposes
const mockCurrentWeather = {
  id: 2643743,
  name: 'London',
  country: 'GB',
  coord: { lat: 51.5074, lon: -0.1278 },
  weather: [{
    id: 801,
    main: 'Clouds',
    description: 'few clouds',
    icon: '02d'
  }],
  main: {
    temp: 22,
    feels_like: 24,
    temp_min: 19,
    temp_max: 25,
    pressure: 1013,
    humidity: 65
  },
  wind: {
    speed: 3.5,
    deg: 230
  },
  visibility: 10000,
  clouds: { all: 20 },
  dt: Date.now() / 1000,
  sys: {
    country: 'GB',
    sunrise: 1640591400,
    sunset: 1640621400
  },
  timezone: 0
};

const mockForecast = {
  list: Array.from({ length: 40 }, (_, i) => ({
    dt: Date.now() / 1000 + i * 3 * 3600,
    main: {
      temp: 20 + Math.random() * 10,
      feels_like: 22 + Math.random() * 8,
      temp_min: 18 + Math.random() * 6,
      temp_max: 24 + Math.random() * 8,
      pressure: 1010 + Math.random() * 20,
      humidity: 50 + Math.random() * 30
    },
    weather: [{
      id: 800 + Math.floor(Math.random() * 4),
      main: ['Clear', 'Clouds', 'Rain', 'Snow'][Math.floor(Math.random() * 4)],
      description: 'clear sky',
      icon: '01d'
    }],
    clouds: { all: Math.random() * 100 },
    wind: {
      speed: Math.random() * 10,
      deg: Math.random() * 360
    },
    visibility: 10000,
    pop: Math.random() * 0.5,
    dt_txt: new Date(Date.now() + i * 3 * 3600 * 1000).toISOString()
  })),
  city: {
    id: 2643743,
    name: 'London',
    coord: { lat: 51.5074, lon: -0.1278 },
    country: 'GB',
    population: 8982000,
    timezone: 0,
    sunrise: 1640591400,
    sunset: 1640621400
  }
};

const mockAirQuality = {
  coord: { lon: -0.1278, lat: 51.5074 },
  list: [{
    main: { aqi: 2 },
    components: {
      co: 233.6,
      no: 0.01,
      no2: 13.4,
      o3: 54.3,
      so2: 3.73,
      pm2_5: 8.32,
      pm10: 15.4,
      nh3: 2.21
    },
    dt: Date.now() / 1000
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
  async getCurrentWeather(lat: number, lon: number) {
    // In production, use real API call:
    // const response = await fetch(`${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
    // return response.json();
    
    return new Promise(resolve => {
      setTimeout(() => resolve(mockCurrentWeather), 500);
    });
  },

  async getForecast(lat: number, lon: number) {
    // In production:
    // const response = await fetch(`${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
    // return response.json();
    
    return new Promise(resolve => {
      setTimeout(() => resolve(mockForecast), 700);
    });
  },

  async getAirQuality(lat: number, lon: number) {
    // In production:
    // const response = await fetch(`${BASE_URL}/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
    // return response.json();
    
    return new Promise(resolve => {
      setTimeout(() => resolve(mockAirQuality), 600);
    });
  },

  async searchCities(query: string) {
    // In production:
    // const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`);
    // return response.json();
    
    return new Promise(resolve => {
      setTimeout(() => {
        const filtered = mockCities.filter(city => 
          city.name.toLowerCase().includes(query.toLowerCase())
        );
        resolve(filtered);
      }, 300);
    });
  },

  async getReverseGeocode(lat: number, lon: number) {
    return new Promise(resolve => {
      setTimeout(() => resolve([mockCities[0]]), 400);
    });
  },

  async getWeatherAlerts(lat: number, lon: number) {
    return new Promise(resolve => {
      setTimeout(() => resolve(mockAlerts), 300);
    });
  },

  async getUVIndex(lat: number, lon: number) {
    return new Promise(resolve => {
      setTimeout(() => resolve(mockUVIndex), 200);
    });
  },

  async getMoonPhase() {
    return new Promise(resolve => {
      setTimeout(() => resolve(mockMoonPhase), 200);
    });
  }
};