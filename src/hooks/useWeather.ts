import { useState, useEffect } from 'react';
import { WeatherData, ForecastData, AirQualityData, WeatherAlert, UVIndex, MoonPhase } from '../types/weather';
import { weatherApi } from '../services/weatherApi';

export const useWeather = (lat?: number, lon?: number) => {
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [airQuality, setAirQuality] = useState<AirQualityData | null>(null);
  const [alerts, setAlerts] = useState<WeatherAlert[]>([]);
  const [uvIndex, setUVIndex] = useState<UVIndex | null>(null);
  const [moonPhase, setMoonPhase] = useState<MoonPhase | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeatherData = async (latitude: number, longitude: number) => {
    if (!latitude || !longitude) return;
    
    setLoading(true);
    setError(null);

    try {
      const [weatherData, forecastData, airQualityData, alertsData, uvData, moonData] = await Promise.all([
        weatherApi.getCurrentWeather(latitude, longitude),
        weatherApi.getForecast(latitude, longitude),
        weatherApi.getAirQuality(latitude, longitude),
        weatherApi.getWeatherAlerts(latitude, longitude),
        weatherApi.getUVIndex(latitude, longitude),
        weatherApi.getMoonPhase()
      ]);

      setCurrentWeather(weatherData as WeatherData);
      setForecast(forecastData as ForecastData);
      setAirQuality(airQualityData as AirQualityData);
      setAlerts(alertsData as WeatherAlert[]);
      setUVIndex(uvData as UVIndex);
      setMoonPhase(moonData as MoonPhase);
    } catch (err) {
      setError('Failed to fetch weather data');
      console.error('Weather API error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (lat && lon) {
      fetchWeatherData(lat, lon);
    }
  }, [lat, lon]);

  return {
    currentWeather,
    forecast,
    airQuality,
    alerts,
    uvIndex,
    moonPhase,
    loading,
    error,
    refetch: () => lat && lon && fetchWeatherData(lat, lon)
  };
};