import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSpring, animated } from '@react-spring/web';
import { WeatherSettings } from '../types/weather';

interface AnimatedBackgroundProps {
  weather: string;
  isDay: boolean;
  temperature?: number;
  settings: WeatherSettings;
}

const Particle: React.FC<{ type: 'rain' | 'snow' | 'cloud' | 'lightning'; index: number; intensity?: number }> = ({ type, index, intensity = 1 }) => {
  const [position, setPosition] = useState({
    x: Math.random() * window.innerWidth,
    y: -50,
    opacity: Math.random() * 0.8 + 0.2
  });

  const speed = {
    rain: 8 * intensity,
    snow: 3 * intensity,
    cloud: 1,
    lightning: 0
  };

  useEffect(() => {
    if (type === 'lightning') return;

    const animateParticle = () => {
      setPosition(prev => ({
        x: type === 'cloud' ? prev.x + (Math.random() - 0.5) * 2 : prev.x + (Math.random() - 0.5) * 3,
        y: prev.y + speed[type],
        opacity: prev.opacity
      }));

      if (position.y > window.innerHeight + 50) {
        setPosition({
          x: Math.random() * window.innerWidth,
          y: -50,
          opacity: Math.random() * 0.8 + 0.2
        });
      }
    };

    const interval = setInterval(animateParticle, 16); // 60fps
    return () => clearInterval(interval);
  }, [position.y, type, intensity]);

  const particleStyle = {
    rain: `w-0.5 h-8 bg-gradient-to-b from-blue-200 to-blue-400 shadow-sm`,
    snow: `w-2 h-2 bg-white rounded-full shadow-lg`,
    cloud: `w-16 h-8 bg-white/20 rounded-full blur-sm`,
    lightning: 'w-1 h-full bg-white'
  };

  if (type === 'lightning') {
    return (
      <motion.div
        className="absolute inset-0 bg-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.8, 0] }}
        transition={{ duration: 0.2, times: [0, 0.1, 1] }}
        style={{ 
          background: 'linear-gradient(45deg, transparent 40%, white 50%, transparent 60%)',
          transform: `translateX(${position.x}px)`
        }}
      />
    );
  }

  return (
    <motion.div
      className={`absolute ${particleStyle[type]}`}
      style={{ 
        left: position.x, 
        top: position.y,
        opacity: position.opacity
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    />
  );
};

export const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ weather, isDay, temperature = 20, settings }) => {
  // Apply theme settings
  const isDarkMode = settings.theme === 'dark' || 
    (settings.theme === 'auto' && !isDay);
  
  const getBackgroundGradient = () => {
    if (isDarkMode) {
      return 'from-indigo-900 via-purple-900 to-blue-900';
    }
    
    if (settings.theme === 'light') {
      return 'from-blue-200 via-blue-300 to-blue-400';
    }

    switch (weather.toLowerCase()) {
      case 'clear':
        return temperature > 25 
          ? 'from-orange-300 via-yellow-400 to-blue-500'
          : 'from-blue-400 via-blue-500 to-blue-600';
      case 'clouds':
        return 'from-gray-400 via-gray-500 to-gray-600';
      case 'rain':
      case 'drizzle':
        return 'from-gray-600 via-gray-700 to-gray-800';
      case 'snow':
      case 'sleet':
        return 'from-blue-200 via-blue-300 to-blue-400';
      case 'thunderstorm':
        return 'from-gray-800 via-gray-900 to-black';
      default:
        return 'from-blue-400 via-blue-500 to-blue-600';
    }
  };

  const shouldShowParticles = () => {
    return ['rain', 'drizzle', 'snow', 'sleet', 'clouds', 'thunderstorm'].includes(weather.toLowerCase());
  };

  const getParticleType = (): 'rain' | 'snow' | 'cloud' | 'lightning' => {
    const w = weather.toLowerCase();
    if (w.includes('rain') || w.includes('drizzle')) return 'rain';
    if (w.includes('snow') || w.includes('sleet')) return 'snow';
    if (w.includes('thunderstorm')) return 'lightning';
    return 'cloud';
  };

  const getParticleCount = () => {
    const w = weather.toLowerCase();
    if (w.includes('thunderstorm')) return 5;
    if (w.includes('rain')) return 50;
    if (w.includes('snow')) return 40;
    return 30;
  };

  return (
    <motion.div
      className={`fixed inset-0 bg-gradient-to-br ${getBackgroundGradient()} -z-10`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      {/* Stars for night time */}
      <AnimatePresence>
      {isDarkMode && (
        <div className="absolute inset-0">
          {Array.from({ length: 50 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full opacity-80"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [0.8, 1.2, 0.8]
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            />
          ))}
        </div>
      )}
      </AnimatePresence>

      {/* Weather particles */}
      {shouldShowParticles() && (
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: getParticleCount() }).map((_, i) => (
            <Particle 
              key={i} 
              type={getParticleType()} 
              index={i} 
              intensity={weather.toLowerCase().includes('heavy') ? 1.5 : 1}
            />
          ))}
        </div>
      )}

      {/* Aurora effect for cold weather */}
      {temperature < 0 && (
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{
            background: 'linear-gradient(45deg, transparent, rgba(0, 255, 150, 0.3), transparent, rgba(255, 0, 150, 0.3), transparent)'
          }}
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%']
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: 'reverse'
          }}
        />
      )}

      {/* Animated overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"
        animate={{
          opacity: [0.1, 0.3, 0.1]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.div>
  );
};