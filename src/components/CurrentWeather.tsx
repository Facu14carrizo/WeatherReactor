import React from 'react';
import { motion } from 'framer-motion';
import { Thermometer, Droplets, Wind, Eye, Gauge, Sun, Moon, Heart, Share2 } from 'lucide-react';
import { WeatherData } from '../types/weather';
import { getWeatherIcon, getWeatherMessage, formatTime, getWindDirection, convertTemperature, getTemperatureUnit, convertSpeed, getSpeedUnit, translateText } from '../utils/weatherHelpers';
import { WeatherSettings } from '../types/weather';
import toast from 'react-hot-toast';

interface CurrentWeatherProps {
  weather: WeatherData;
  settings: WeatherSettings;
  onAddToFavorites?: () => void;
  onShare?: () => void;
  isFavorite?: boolean;
}

export const CurrentWeather: React.FC<CurrentWeatherProps> = ({ 
  weather, 
  settings,
  onAddToFavorites,
  onShare,
  isFavorite = false
}) => {
  const isDay = Date.now() / 1000 > weather.sys.sunrise && Date.now() / 1000 < weather.sys.sunset;
  const weatherIcon = getWeatherIcon(weather.weather[0].id, isDay);
  
  // Convert temperatures based on settings
  const currentTemp = convertTemperature(weather.main.temp, 'metric', settings.units);
  const feelsLike = convertTemperature(weather.main.feels_like, 'metric', settings.units);
  const tempMax = convertTemperature(weather.main.temp_max, 'metric', settings.units);
  const tempMin = convertTemperature(weather.main.temp_min, 'metric', settings.units);
  const tempUnit = getTemperatureUnit(settings.units);
  
  // Convert wind speed
  const windSpeed = convertSpeed(weather.wind.speed, 'metric', settings.units);
  const speedUnit = getSpeedUnit(settings.units);
  
  // Translate weather description
  const translatedDescription = translateText(weather.weather[0].description, settings.language);
  const translatedMain = translateText(weather.weather[0].main, settings.language);
  
  const message = getWeatherMessage(translatedMain, currentTemp);

  const handleAddToFavorites = () => {
    if (onAddToFavorites) {
      onAddToFavorites();
      toast.success(isFavorite ? 'Eliminado de favoritos' : '¡Agregado a favoritos!');
    }
  };

  const handleShare = () => {
    if (onShare) {
      onShare();
      toast.success('¡Clima compartido!');
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  };

  const iconVariants = {
    initial: { scale: 0, rotate: -180 },
    animate: { 
      scale: 1, 
      rotate: 0,
      transition: { 
        type: "spring", 
        stiffness: 260, 
        damping: 20,
        delay: 0.2 
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Main Weather Card */}
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.6 }}
        className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl"
      >
        {/* Action Buttons */}
        <div className="flex justify-end space-x-2 mb-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleAddToFavorites}
            className={`p-2 rounded-full transition-all duration-200 ${
              isFavorite 
                ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' 
                : 'bg-white/10 text-white/60 hover:bg-white/20 hover:text-red-400'
            }`}
          >
            <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleShare}
            className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white/60 hover:text-white transition-all duration-200"
          >
            <Share2 className="w-5 h-5" />
          </motion.button>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-between">
          {/* Location and main info */}
          <div className="text-center lg:text-left mb-6 lg:mb-0">
            <h2 className="text-3xl font-bold text-white mb-2">
              {weather.name}, {weather.sys.country}
            </h2>
            <p className="text-white/80 capitalize text-lg mb-4">
              {translatedDescription}
            </p>
            
            {/* Temperature */}
            <div className="flex items-center justify-center lg:justify-start space-x-4">
              <motion.div
                variants={iconVariants}
                initial="initial"
                animate="animate"
                whileHover={{ scale: 1.1, rotate: 10 }}
                className="text-6xl"
              >
                {weatherIcon}
              </motion.div>
              <div>
                <motion.span
                  className="text-6xl font-light text-white"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {Math.round(currentTemp)}{tempUnit}
                </motion.span>
                <div className="text-white/80 text-sm">
                  Sensación {Math.round(feelsLike)}{tempUnit}
                </div>
                <div className="text-white/60 text-sm">
                  Máx: {Math.round(tempMax)}{tempUnit} Mín: {Math.round(tempMin)}{tempUnit}
                </div>
              </div>
            </div>
          </div>

          {/* Sun times */}
          <div className="flex flex-col space-y-4">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              whileHover={{ scale: 1.05, x: -5 }}
              className="flex items-center space-x-3 bg-white/10 rounded-2xl px-4 py-3"
            >
              <Sun className="w-5 h-5 text-yellow-400" />
              <div className="text-white">
                <div className="text-sm text-white/80">
                  {translateText('Sunrise', settings.language)}
                </div>
                <div className="font-semibold">{formatTime(weather.sys.sunrise, weather.timezone)}</div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              whileHover={{ scale: 1.05, x: -5 }}
              className="flex items-center space-x-3 bg-white/10 rounded-2xl px-4 py-3"
            >
              <Moon className="w-5 h-5 text-blue-300" />
              <div className="text-white">
                <div className="text-sm text-white/80">
                  {translateText('Sunset', settings.language)}
                </div>
                <div className="font-semibold">{formatTime(weather.sys.sunset, weather.timezone)}</div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Weather message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          whileHover={{ scale: 1.02 }}
          className="mt-6 p-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl border border-white/10"
        >
          <p className="text-white/90 text-center font-medium">{message}</p>
        </motion.div>
      </motion.div>

      {/* Weather Details Grid */}
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {[
          {
            icon: Thermometer,
            label: translateText('Feels Like', settings.language),
            value: `${Math.round(weather.main.feels_like)}°`,
            color: 'text-red-400'
          },
          {
            icon: Droplets,
            label: translateText('Humidity', settings.language),
            value: `${weather.main.humidity}%`,
            color: 'text-blue-400'
          },
          {
            icon: Wind,
            label: translateText('Wind Speed', settings.language),
            value: `${Math.round(weather.wind.speed)} m/s ${getWindDirection(weather.wind.deg)}`,
            color: 'text-green-400'
          },
          {
            icon: Eye,
            label: translateText('Visibility', settings.language),
            value: `${Math.round(weather.visibility / 1000)} km`,
            color: 'text-purple-400'
          },
          {
            icon: Gauge,
            label: translateText('Pressure', settings.language),
            value: `${weather.main.pressure} hPa`,
            color: 'text-yellow-400'
          }
        ].map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.08, y: -8, rotateY: 5 }}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300"
          >
            <div className="flex items-center space-x-3">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <item.icon className={`w-6 h-6 ${item.color}`} />
              </motion.div>
              <div>
                <div className="text-white/80 text-sm">{item.label}</div>
                <div className="text-white font-semibold text-lg">
                  {item.label === translateText('Feels Like', settings.language)
                    ? `${Math.round(feelsLike)}${tempUnit}`
                    : item.label === translateText('Wind Speed', settings.language)
                    ? `${Math.round(windSpeed)} ${speedUnit} ${getWindDirection(weather.wind.deg)}`
                    : item.value
                  }
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};