import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, AlertTriangle } from 'lucide-react';
import { AirQualityData } from '../types/weather';
import { getAirQualityStatus, translateText } from '../utils/weatherHelpers';
import { WeatherSettings } from '../types/weather';

interface AirQualityProps {
  airQuality: AirQualityData;
  settings: WeatherSettings;
}

export const AirQuality: React.FC<AirQualityProps> = ({ airQuality, settings }) => {
  const currentAQ = airQuality.list[0];
  const aqiStatus = getAirQualityStatus(currentAQ.main.aqi);

  const pollutants = [
    { name: 'CO', value: currentAQ.components.co, unit: 'μg/m³', color: 'text-yellow-400' },
    { name: 'NO₂', value: currentAQ.components.no2, unit: 'μg/m³', color: 'text-orange-400' },
    { name: 'O₃', value: currentAQ.components.o3, unit: 'μg/m³', color: 'text-blue-400' },
    { name: 'SO₂', value: currentAQ.components.so2, unit: 'μg/m³', color: 'text-purple-400' },
    { name: 'PM2.5', value: currentAQ.components.pm2_5, unit: 'μg/m³', color: 'text-red-400' },
    { name: 'PM10', value: currentAQ.components.pm10, unit: 'μg/m³', color: 'text-pink-400' }
  ];

  const getAQIColor = (aqi: number) => {
    const colors = ['bg-green-500', 'bg-green-400', 'bg-yellow-500', 'bg-orange-500', 'bg-red-500'];
    return colors[Math.min(aqi - 1, 4)] || colors[0];
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20"
    >
      <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
        <Leaf className="w-6 h-6 mr-2 text-green-400" />
        {translateText('Air Quality Index', settings.language)}
      </h3>

      {/* Main AQI Display */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 260, damping: 20 }}
            className={`w-16 h-16 ${getAQIColor(currentAQ.main.aqi)} rounded-full flex items-center justify-center`}
          >
            <span className="text-white font-bold text-xl">{currentAQ.main.aqi}</span>
          </motion.div>
          
          <div>
            <div className={`text-lg font-semibold ${aqiStatus.color}`}>
              {aqiStatus.label}
            </div>
            <div className="text-white/70 text-sm">Air Quality Index</div>
            <div className="text-white/70 text-sm">Índice de Calidad del Aire</div>
          </div>
        </div>

        {currentAQ.main.aqi > 3 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="flex items-center space-x-2 bg-orange-500/20 px-3 py-2 rounded-xl"
          >
            <AlertTriangle className="w-5 h-5 text-orange-400" />
            <span className="text-orange-200 text-sm">Alerta de Salud</span>
          </motion.div>
        )}
      </div>

      {/* AQI Scale */}
      <div className="mb-6">
        <div className="flex justify-between text-white/80 text-xs mb-2">
          <span>Buena</span>
          <span>Moderada</span>
          <span>Mala</span>
          <span>Muy Mala</span>
        </div>
        <div className="h-2 bg-gradient-to-r from-green-500 via-yellow-500 via-orange-500 to-red-500 rounded-full relative">
          <motion.div
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: `${(currentAQ.main.aqi - 1) * 25}%`, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="absolute top-0 w-3 h-2 bg-white rounded-full transform -translate-x-1/2"
          />
        </div>
      </div>

      {/* Pollutants Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {pollutants.map((pollutant, index) => (
          <motion.div
            key={pollutant.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.05, y: -2 }}
            className="bg-white/10 rounded-2xl p-4 text-center hover:bg-white/20 transition-all duration-300"
          >
            <div className={`font-semibold ${pollutant.color} mb-1`}>
              {pollutant.name}
            </div>
            <div className="text-white text-lg font-bold">
              {pollutant.value.toFixed(1)}
            </div>
            <div className="text-white/60 text-xs">
              {pollutant.unit}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Health Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="mt-6 p-4 bg-gradient-to-r from-blue-500/20 to-green-500/20 rounded-2xl border border-white/10"
      >
        <h4 className="text-white font-semibold mb-2">Recomendaciones de Salud</h4>
        <p className="text-white/80 text-sm">
          {currentAQ.main.aqi <= 2 
            ? "La calidad del aire es satisfactoria. ¡Perfecto para actividades al aire libre!" 
            : currentAQ.main.aqi <= 3
            ? "Calidad del aire moderada. Las personas sensibles deberían considerar reducir las actividades al aire libre."
            : "Mala calidad del aire. Considera quedarte en interiores y usar purificadores de aire."}
        </p>
      </motion.div>
    </motion.div>
  );
};