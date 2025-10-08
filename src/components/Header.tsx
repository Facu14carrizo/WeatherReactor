import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Settings, Heart, Menu, X, Bell, Share2, RefreshCw as Refresh, AlertTriangle } from 'lucide-react';
import toast from 'react-hot-toast';

interface HeaderProps {
  onSearch: (query: string) => void;
  onLocationRequest: () => void;
  onRefresh: () => void;
  onSettingsClick: () => void;
  onFavoritesClick: () => void;
  onShareClick: () => void;
  currentLocation?: string;
  hasAlerts?: boolean;
  isRefreshing?: boolean;
  showAPIKeyWarning?: boolean;
  onAPIKeySetupClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  onSearch, 
  onLocationRequest, 
  onRefresh,
  onSettingsClick,
  onFavoritesClick,
  onShareClick,
  currentLocation,
  hasAlerts = false,
  isRefreshing = false,
  showAPIKeyWarning = false,
  onAPIKeySetupClick
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
      setSearchQuery('');
      toast.success(`Searching for ${searchQuery.trim()}...`);
    }
  };

  const handleShare = () => {
    onShareClick();
    toast.success('¡Datos del clima compartidos!');
  };

  return (
    <motion.header
      className="relative z-50 bg-white/10 backdrop-blur-lg border-b border-white/20"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.div 
              className="w-10 h-10 bg-gradient-to-br from-green-500 to-yellow-400 rounded-xl flex items-center justify-center shadow-lg"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-2xl font-bold text-white">☣️</span>
            </motion.div>
            <div>
              <h1 className="text-xl font-bold text-white">WeatherReactor</h1>
              <p className="text-xs text-white/70 hidden sm:block">Premium Weather Experience</p>
            </div>
          </motion.div>

          {/* Open-Meteo Info */}
          {/* Eliminado: Powered by Open-Meteo */}

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <form onSubmit={handleSearchSubmit} className="w-full">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search cities worldwide..."
                  className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 hover:bg-white/15"
                />
              </div>
            </form>
          </div>

          {/* Navigation - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={onRefresh}
              disabled={isRefreshing}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors duration-200 disabled:opacity-50"
            >
              <motion.div
                animate={isRefreshing ? { rotate: 360 } : {}}
                transition={{ duration: 1, repeat: isRefreshing ? Infinity : 0, ease: "linear" }}
              >
                <Refresh className="w-5 h-5" />
              </motion.div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={onLocationRequest}
              className="flex items-center space-x-2 px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors duration-200"
            >
              <MapPin className="w-4 h-4" />
              <span className="text-sm hidden lg:block">
                {currentLocation || 'Obtener Ubicación'}
              </span>
              <span className="text-sm hidden lg:block">
                {currentLocation || 'Get Location'}
              </span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleShare}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors duration-200"
            >
              <Share2 className="w-5 h-5" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={onFavoritesClick}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors duration-200"
            >
              <Heart className="w-5 h-5" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="relative p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors duration-200"
            >
              <Bell className="w-5 h-5" />
              {hasAlerts && (
                <motion.div
                  className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={onSettingsClick}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors duration-200"
            >
              <Settings className="w-5 h-5" />
            </motion.button>
          </div>

          {/* Mobile menu button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 bg-white/10 rounded-lg text-white"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={{
            height: isMenuOpen ? 'auto' : 0,
            opacity: isMenuOpen ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden"
        >
          <div className="py-4 space-y-4">
            {/* Mobile Search */}
            <form onSubmit={handleSearchSubmit}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search cities..."
                  className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </form>

            {/* Mobile Navigation */}
            <div className="grid grid-cols-4 gap-4">
              <button
                onClick={onRefresh}
                className="flex flex-col items-center space-y-1 p-2 text-white/80 hover:text-white"
              >
                <Refresh className="w-5 h-5" />
                <span className="text-xs">Refresh</span>
              </button>
              <button
                onClick={onLocationRequest}
                className="flex flex-col items-center space-y-1 p-2 text-white/80 hover:text-white"
              >
                <MapPin className="w-5 h-5" />
                <span className="text-xs">Location</span>
              </button>
              <button 
                onClick={onFavoritesClick}
                className="flex flex-col items-center space-y-1 p-2 text-white/80 hover:text-white"
              >
                <Heart className="w-5 h-5" />
                <span className="text-xs">Favorites</span>
              </button>
              <button 
                onClick={onSettingsClick}
                className="flex flex-col items-center space-y-1 p-2 text-white/80 hover:text-white"
              >
                <Settings className="w-5 h-5" />
                <span className="text-xs">Settings</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.header>
  );
};