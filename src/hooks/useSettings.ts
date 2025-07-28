import { useState, useEffect } from 'react';
import { WeatherSettings } from '../types/weather';
import toast from 'react-hot-toast';

const defaultSettings: WeatherSettings = {
  units: 'metric',
  language: 'es',
  notifications: true,
  autoLocation: true,
  theme: 'auto'
};

export const useSettings = () => {
  const [settings, setSettings] = useState<WeatherSettings>(defaultSettings);

  useEffect(() => {
    const stored = localStorage.getItem('weatherlux-settings');
    if (stored) {
      const parsedSettings = JSON.parse(stored);
      setSettings({ ...defaultSettings, ...parsedSettings });
    }
  }, []);

  const updateSettings = (newSettings: Partial<WeatherSettings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    localStorage.setItem('weatherlux-settings', JSON.stringify(updated));
    
    // Mostrar confirmación del cambio
    if (newSettings.language) {
      const languageNames = {
        'es': 'Español',
        'en': 'English', 
        'fr': 'Français',
        'de': 'Deutsch'
      };
      toast.success(`Idioma cambiado a ${languageNames[newSettings.language as keyof typeof languageNames]}`);
    }
    
    if (newSettings.units) {
      toast.success(`Unidades cambiadas a ${newSettings.units === 'metric' ? 'Celsius' : 'Fahrenheit'}`);
    }
    
    if (newSettings.theme) {
      const themeNames = {
        'auto': 'Automático',
        'light': 'Claro',
        'dark': 'Oscuro'
      };
      toast.success(`Tema cambiado a ${themeNames[newSettings.theme as keyof typeof themeNames]}`);
    }
  };

  return {
    settings,
    updateSettings
  };
};