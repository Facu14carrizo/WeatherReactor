import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { Header } from './components/Header';
import { CurrentWeather } from './components/CurrentWeather';
import { WeatherForecast } from './components/WeatherForecast';
import { WeatherCharts } from './components/WeatherCharts';
import { AirQuality } from './components/AirQuality';
import { WeatherAlerts } from './components/WeatherAlerts';
import { FavoritesPanel } from './components/FavoritesPanel';
import { SettingsPanel } from './components/SettingsPanel';
import { LoadingSpinner } from './components/LoadingSpinner';
import { SearchResults } from './components/SearchResults';
import { AnimatedBackground } from './components/AnimatedBackground';
import { useGeolocation } from './hooks/useGeolocation';
import { useWeather } from './hooks/useWeather';
import { useFavorites } from './hooks/useFavorites';
import { useSettings } from './hooks/useSettings';
import { weatherApi } from './services/weatherApi';
import { City } from './types/weather';
import toast from 'react-hot-toast';

function App() {
  const [searchResults, setSearchResults] = useState<City[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [selectedCoords, setSelectedCoords] = useState<{lat: number, lon: number} | null>(null);
  const [showFavorites, setShowFavorites] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const { lat, lon, loading: locationLoading, error: locationError, requestLocation } = useGeolocation();
  const { favorites, addFavorite, removeFavorite, isFavorite } = useFavorites();
  const { settings, updateSettings } = useSettings();
  
  const currentLat = selectedCoords?.lat || lat;
  const currentLon = selectedCoords?.lon || lon;
  
  const { 
    currentWeather, 
    forecast, 
    airQuality, 
    alerts,
    uvIndex,
    moonPhase,
    loading: weatherLoading,
    refetch
  } = useWeather(currentLat, currentLon);

  const handleSearch = async (query: string) => {
    if (query.length < 2) {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    try {
      const cities = await weatherApi.searchCities(query) as City[];
      setSearchResults(cities);
      setShowSearchResults(true);
      toast.success(`Se encontraron ${cities.length} ciudades`);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
      toast.error('Búsqueda fallida. Por favor, inténtalo de nuevo.');
    }
  };

  const handleCitySelect = (city: City) => {
    setSelectedCoords({ lat: city.coord.lat, lon: city.coord.lon });
    setShowSearchResults(false);
    setSearchResults([]);
    toast.success(`Cargando clima para ${city.name}`);
  };

  const handleLocationRequest = () => {
    setSelectedCoords(null);
    requestLocation();
    toast.loading('Obteniendo tu ubicación...');
  };

  const handleRefresh = async () => {
    if (!currentLat || !currentLon) return;
    
    setIsRefreshing(true);
    try {
      await refetch();
      toast.success('¡Datos meteorológicos actualizados!');
    } catch (error) {
      toast.error('Error al actualizar datos');
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleAddToFavorites = () => {
    if (!currentWeather) return;
    
    const locationData = {
      name: currentWeather.name,
      country: currentWeather.sys.country,
      coord: {
        lat: currentWeather.coord.lat,
        lon: currentWeather.coord.lon
      }
    };

    if (isFavorite(currentWeather.coord.lat, currentWeather.coord.lon)) {
      const favorite = favorites.find(f => 
        Math.abs(f.coord.lat - currentWeather.coord.lat) < 0.01 && 
        Math.abs(f.coord.lon - currentWeather.coord.lon) < 0.01
      );
      if (favorite) {
        removeFavorite(favorite.id);
      }
    } else {
      addFavorite(locationData);
    }
  };

  const handleShare = async () => {
    if (!currentWeather) return;

    const shareData = {
      title: 'WeatherLux',
      text: `Clima actual en ${currentWeather.name}: ${Math.round(currentWeather.main.temp)}°C, ${currentWeather.weather[0].description}`,
      url: window.location.href
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(`${shareData.text} - ${shareData.url}`);
        toast.success('¡Datos del clima copiados al portapapeles!');
      }
    } catch (error) {
      console.error('Share failed:', error);
    }
  };

  const handleFavoriteLocationSelect = (lat: number, lon: number) => {
    setSelectedCoords({ lat, lon });
  };

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowSearchResults(false);
    };

    if (showSearchResults) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [showSearchResults]);

  // Auto-location on first load
  useEffect(() => {
    if (settings.autoLocation && !selectedCoords && !lat && !locationLoading) {
      requestLocation();
    }
  }, [settings.autoLocation, selectedCoords, lat, locationLoading]);

  if (locationLoading || weatherLoading) {
    return (
      <>
        <AnimatedBackground weather="clear" isDay={true} temperature={20} settings={settings} />
        <LoadingSpinner settings={settings} />
        <Toaster position="top-right" />
      </>
    );
  }

  if (!currentWeather || !forecast || !airQuality) {
    return (
      <>
        <AnimatedBackground weather="clear" isDay={true} temperature={20} settings={settings} />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center text-white">
            <h2 className="text-2xl font-bold mb-4">Bienvenido a WeatherLux</h2>
            <p className="text-white/80 mb-6">La experiencia meteorológica más hermosa del mundo</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLocationRequest}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-8 py-4 rounded-2xl text-white font-semibold transition-all duration-300 shadow-lg"
            >
              Obtener Clima de Mi Ubicación
            </motion.button>
          </div>
        </div>
        <Toaster position="top-right" />
      </>
    );
  }

  const isDay = Date.now() / 1000 > currentWeather.sys.sunrise && Date.now() / 1000 < currentWeather.sys.sunset;
  const isFav = isFavorite(currentWeather.coord.lat, currentWeather.coord.lon);

  return (
    <>
      <div className="min-h-screen relative">
        <AnimatedBackground 
          weather={currentWeather.weather[0].main} 
          isDay={isDay} 
          temperature={currentWeather.main.temp}
          settings={settings}
        />
        
        <div className="relative z-10">
          <div className="relative">
            <Header
              onSearch={handleSearch}
              onLocationRequest={handleLocationRequest}
              onRefresh={handleRefresh}
              onSettingsClick={() => setShowSettings(true)}
              onFavoritesClick={() => setShowFavorites(true)}
              onShareClick={handleShare}
              currentLocation={`${currentWeather.name}, ${currentWeather.sys.country}`}
              hasAlerts={alerts.length > 0}
              isRefreshing={isRefreshing}
            />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
              <SearchResults
                cities={searchResults}
                onCitySelect={handleCitySelect}
                isVisible={showSearchResults}
              />
            </div>
          </div>

          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Weather Alerts */}
            {alerts.length > 0 && (
              <WeatherAlerts alerts={alerts} />
            )}

            {/* Current Weather */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <CurrentWeather 
                weather={currentWeather}
                settings={settings}
                onAddToFavorites={handleAddToFavorites}
                onShare={handleShare}
                isFavorite={isFav}
              />
            </motion.div>

            {/* Forecast and Charts */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
              <div className="xl:col-span-2">
                <WeatherForecast forecast={forecast} settings={settings} />
              </div>
              <div>
                <AirQuality airQuality={airQuality} settings={settings} />
              </div>
            </div>

            {/* Charts */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <WeatherCharts forecast={forecast} settings={settings} />
            </motion.div>
          </main>

          {/* Footer */}
          <footer className="text-center py-8 text-white/60">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              © 2025 WeatherLux - La Experiencia Meteorológica Más Hermosa del Mundo
            </motion.p>
          </footer>
        </div>
      </div>

      {/* Side Panels */}
      <FavoritesPanel
        favorites={favorites}
        onLocationSelect={handleFavoriteLocationSelect}
        onRemoveFavorite={removeFavorite}
        isOpen={showFavorites}
        onClose={() => setShowFavorites(false)}
      />

      <SettingsPanel
        settings={settings}
        onSettingsChange={updateSettings}
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
      />

      {/* Toast Notifications */}
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            color: 'white',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '12px',
          },
        }}
      />
    </>
  );
}

export default App;