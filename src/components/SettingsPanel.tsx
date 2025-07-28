import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, X, Thermometer, Globe, Bell, Palette, MapPin } from 'lucide-react';
import { WeatherSettings } from '../types/weather';

interface SettingsPanelProps {
  settings: WeatherSettings;
  onSettingsChange: (settings: Partial<WeatherSettings>) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({
  settings,
  onSettingsChange,
  isOpen,
  onClose
}) => {
  const toggleSetting = (key: keyof WeatherSettings, value: any) => {
    onSettingsChange({ [key]: value });
  };

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
                  <Settings className="w-6 h-6 mr-2 text-blue-400" />
                  Configuración
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

              <div className="space-y-6">
                {/* Units */}
                <div>
                  <h3 className="text-white font-medium mb-3 flex items-center">
                    <Thermometer className="w-5 h-5 mr-2 text-orange-400" />
                    Unidades de Temperatura
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {['metric', 'imperial'].map((unit) => (
                      <motion.button
                        key={unit}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => toggleSetting('units', unit)}
                        className={`p-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                          settings.units === unit
                            ? 'bg-blue-500/30 text-white border border-blue-400/50'
                            : 'bg-white/10 text-white/70 hover:bg-white/20'
                        }`}
                      >
                        {unit === 'metric' ? 'Celsius (°C)' : 'Fahrenheit (°F)'}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Language */}
                <div>
                  <h3 className="text-white font-medium mb-3 flex items-center">
                    <Globe className="w-5 h-5 mr-2 text-green-400" />
                    Idioma
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { code: 'en', name: 'English' },
                      { code: 'es', name: 'Español' },
                      { code: 'fr', name: 'Français' },
                      { code: 'de', name: 'Deutsch' }
                    ].map((lang) => (
                      <motion.button
                        key={lang.code}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => toggleSetting('language', lang.code)}
                        className={`p-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                          settings.language === lang.code
                            ? 'bg-green-500/30 text-white border border-green-400/50'
                            : 'bg-white/10 text-white/70 hover:bg-white/20'
                        }`}
                      >
                        {lang.name}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Theme */}
                <div>
                  <h3 className="text-white font-medium mb-3 flex items-center">
                    <Palette className="w-5 h-5 mr-2 text-purple-400" />
                    Tema
                  </h3>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { value: 'auto', name: 'Automático' },
                      { value: 'light', name: 'Claro' },
                      { value: 'dark', name: 'Oscuro' }
                    ].map((theme) => (
                      <motion.button
                        key={theme.value}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => toggleSetting('theme', theme.value)}
                        className={`p-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                          settings.theme === theme.value
                            ? 'bg-purple-500/30 text-white border border-purple-400/50'
                            : 'bg-white/10 text-white/70 hover:bg-white/20'
                        }`}
                      >
                        {theme.name}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Toggle Settings */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Bell className="w-5 h-5 mr-2 text-yellow-400" />
                      <span className="text-white font-medium">Notificaciones</span>
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => toggleSetting('notifications', !settings.notifications)}
                      className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${
                        settings.notifications ? 'bg-green-500' : 'bg-gray-600'
                      }`}
                    >
                      <motion.div
                        animate={{ x: settings.notifications ? 24 : 0 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-lg"
                      />
                    </motion.button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <MapPin className="w-5 h-5 mr-2 text-blue-400" />
                      <span className="text-white font-medium">Ubicación Automática</span>
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => toggleSetting('autoLocation', !settings.autoLocation)}
                      className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${
                        settings.autoLocation ? 'bg-blue-500' : 'bg-gray-600'
                      }`}
                    >
                      <motion.div
                        animate={{ x: settings.autoLocation ? 24 : 0 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-lg"
                      />
                    </motion.button>
                  </div>
                </div>

                {/* App Info */}
                <div className="pt-6 border-t border-white/10">
                  <div className="text-center">
                    <h4 className="text-white font-semibold mb-2">WeatherLux</h4>
                    <p className="text-white/60 text-sm">Version 2.0.0</p>
                    <p className="text-white/40 text-xs mt-2">
                      La aplicación de clima más hermosa del mundo
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};