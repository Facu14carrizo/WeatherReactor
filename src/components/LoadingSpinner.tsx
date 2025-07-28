import React from 'react';
import { motion } from 'framer-motion';
import { WeatherSettings } from '../types/weather';
import { translateText } from '../utils/weatherHelpers';

interface LoadingSpinnerProps {
  settings?: WeatherSettings;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ settings }) => {
  const language = settings?.language || 'es';
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <motion.div
          className="inline-block w-16 h-16 border-4 border-white/20 border-t-white rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-4"
        >
          <h3 className="text-white text-lg font-semibold">
            {translateText('Loading Weather Data', language)}
          </h3>
          <p className="text-white/70 text-sm mt-1">
            {translateText('Getting latest conditions', language)}...
          </p>
        </motion.div>

        {/* Animated dots */}
        <div className="flex justify-center space-x-1 mt-4">
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-white rounded-full"
              animate={{
                y: [0, -10, 0],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};