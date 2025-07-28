import { useState, useEffect } from 'react';
import { FavoriteLocation } from '../types/weather';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<FavoriteLocation[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('weatherlux-favorites');
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  const addFavorite = (location: Omit<FavoriteLocation, 'id' | 'addedAt'>) => {
    const newFavorite: FavoriteLocation = {
      ...location,
      id: Date.now().toString(),
      addedAt: Date.now()
    };
    
    const updated = [...favorites, newFavorite];
    setFavorites(updated);
    localStorage.setItem('weatherlux-favorites', JSON.stringify(updated));
  };

  const removeFavorite = (id: string) => {
    const updated = favorites.filter(fav => fav.id !== id);
    setFavorites(updated);
    localStorage.setItem('weatherlux-favorites', JSON.stringify(updated));
  };

  const isFavorite = (lat: number, lon: number) => {
    return favorites.some(fav => 
      Math.abs(fav.coord.lat - lat) < 0.01 && 
      Math.abs(fav.coord.lon - lon) < 0.01
    );
  };

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite
  };
};