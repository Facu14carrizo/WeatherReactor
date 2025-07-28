import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { City } from '../types/weather';

interface SearchResultsProps {
  cities: City[];
  onCitySelect: (city: City) => void;
  isVisible: boolean;
}

export const SearchResults: React.FC<SearchResultsProps> = ({ cities, onCitySelect, isVisible }) => {
  return (
    <AnimatePresence>
      {isVisible && cities.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="absolute top-full left-0 right-0 mt-2 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl overflow-hidden z-50"
        >
          {cities.map((city, index) => (
            <motion.div
              key={`${city.id}-${city.name}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05, duration: 0.2 }}
              whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
              onClick={() => onCitySelect(city)}
              className="flex items-center space-x-3 p-3 cursor-pointer border-b border-white/10 last:border-b-0 hover:bg-white/10 transition-colors duration-200"
            >
              <MapPin className="w-4 h-4 text-white/60" />
              <div>
                <div className="text-white font-medium">
                  {city.name}
                </div>
                <div className="text-white/70 text-sm">
                  {city.country}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};