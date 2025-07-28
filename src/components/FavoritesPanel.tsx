import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MapPin, X, Thermometer } from 'lucide-react';
import { FavoriteLocation } from '../types/weather';

interface FavoritesPanelProps {
  favorites: FavoriteLocation[];
  onLocationSelect: (lat: number, lon: number) => void;
  onRemoveFavorite: (id: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const FavoritesPanel: React.FC<FavoritesPanelProps> = ({
  favorites,
  onLocationSelect,
  onRemoveFavorite,
  isOpen,
  onClose
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-80 bg-white/10 backdrop-blur-lg border-l border-white/20 z-50 overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white flex items-center">
                  <Heart className="w-6 h-6 mr-2 text-red-400" />
                  Favoritos
                </h2>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors duration-200"
                >
                  <X className="w-5 h-5 text-white" />
                </motion.button>
              </div>

              {favorites.length === 0 ? (
                <div className="text-center py-12">
                  <Heart className="w-12 h-12 text-white/30 mx-auto mb-4" />
                  <p className="text-white/60">Aún no tienes ubicaciones favoritas</p>
                  <p className="text-white/40 text-sm mt-2">
                    Busca ciudades y agrégalas a favoritos
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {favorites.map((favorite, index) => (
                    <motion.div
                      key={favorite.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white/10 rounded-2xl p-4 hover:bg-white/20 transition-all duration-300 cursor-pointer group"
                      onClick={() => {
                        onLocationSelect(favorite.coord.lat, favorite.coord.lon);
                        onClose();
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <MapPin className="w-5 h-5 text-blue-400" />
                          <div>
                            <h3 className="text-white font-medium">{favorite.name}</h3>
                            <p className="text-white/60 text-sm">{favorite.country}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <div className="text-right">
                            <div className="text-white font-semibold">22°</div>
                            <div className="text-white/60 text-xs">Sunny</div>
                          </div>
                          
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              onRemoveFavorite(favorite.id);
                            }}
                            className="p-1 opacity-0 group-hover:opacity-100 hover:bg-red-500/20 rounded-full transition-all duration-200"
                          >
                            <X className="w-4 h-4 text-red-400" />
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};