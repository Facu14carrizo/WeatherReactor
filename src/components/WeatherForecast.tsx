import React from 'react';
import { motion } from 'framer-motion';
import { ForecastData } from '../types/weather';
import { getWeatherIcon, convertTemperature, getTemperatureUnit, translateText, getLocale } from '../utils/weatherHelpers';
import { WeatherSettings } from '../types/weather';

interface WeatherForecastProps {
  forecast: ForecastData;
  settings: WeatherSettings;
}

export const WeatherForecast: React.FC<WeatherForecastProps> = ({ forecast, settings }) => {
  // Group forecast by days (taking first forecast of each day)
  const dailyForecast = forecast.list.reduce((acc: any[], item) => {
    const date = new Date(item.dt * 1000).toDateString();
    if (!acc.find(day => new Date(day.dt * 1000).toDateString() === date)) {
      acc.push(item);
    }
    return acc;
  }, []).slice(0, 7);

  // Hourly forecast for today (next 24 hours)
  const hourlyForecast = forecast.list.slice(0, 8);
  
  const tempUnit = getTemperatureUnit(settings.units);

  return (
    <div className="space-y-6">
      {/* Hourly Forecast */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20"
      >
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
          <span className="mr-2">🕐</span>
          {translateText('Hourly Forecast', settings.language)}
        </h3>
        
        <div className="flex space-x-4 overflow-x-auto pb-2">
          {hourlyForecast.map((hour, index) => (
            <motion.div
              key={hour.dt}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="flex-shrink-0 bg-white/10 rounded-2xl p-4 text-center min-w-[120px] hover:bg-white/20 transition-all duration-300"
            >
              <div className="text-white/80 text-sm mb-2">
                {new Date(hour.dt * 1000).toLocaleTimeString(getLocale(settings.language), { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </div>
              
              <div className="text-2xl mb-2">
                {getWeatherIcon(hour.weather[0].id, true)}
              </div>
              
              <div className="text-white font-semibold text-lg mb-1">
                {Math.round(convertTemperature(hour.main.temp, 'metric', settings.units))}{tempUnit}
              </div>
              
              <div className="text-white/60 text-xs">
                {Math.round(hour.pop * 100)}% 💧
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* 7-Day Forecast */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20"
      >
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
          <span className="mr-2">📅</span>
          {translateText('7-Day Forecast', settings.language)}
        </h3>
        
        <div className="space-y-3">
          {dailyForecast.map((day, index) => (
            <motion.div
              key={day.dt}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.02, x: 5 }}
              className="flex items-center justify-between p-4 bg-white/10 rounded-2xl hover:bg-white/20 transition-all duration-300"
            >
              <div className="flex items-center space-x-4 flex-1">
                <div className="text-2xl">
                  {getWeatherIcon(day.weather[0].id, true)}
                </div>
                
                <div className="flex-1">
                  <div className="text-white font-medium">
                    {index === 0 ? 
                      translateText('Today', settings.language)
                      : new Date(day.dt * 1000).toLocaleDateString(getLocale(settings.language), {
                          weekday: 'long',
                          month: 'short',
                          day: 'numeric'
                        })
                    }
                  </div>
                  <div className="text-white/70 text-sm capitalize">
                    {translateText(day.weather[0].description, settings.language)}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="text-white/60 text-sm">
                  💧 {Math.round(day.pop * 100)}%
                </div>
                
                <div className="text-right">
                  <div className="text-white font-semibold">
                    {Math.round(convertTemperature(day.main.temp_max, 'metric', settings.units))}{tempUnit}
                  </div>
                  <div className="text-white/60 text-sm">
                    {Math.round(convertTemperature(day.main.temp_min, 'metric', settings.units))}{tempUnit}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};