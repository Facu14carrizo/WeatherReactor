import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

interface GeolocationState {
  lat: number | null;
  lon: number | null;
  loading: boolean;
  error: string | null;
}

export const useGeolocation = () => {
  const [location, setLocation] = useState<GeolocationState>({
    lat: null,
    lon: null,
    loading: true,
    error: null
  });

  const requestLocation = () => {
    console.log('🌍 Solicitando ubicación...');
    setLocation(prev => ({ ...prev, loading: true, error: null }));

    if (!navigator.geolocation) {
      console.error('❌ Geolocalización no soportada');
      setLocation(prev => ({
        ...prev,
        loading: false,
        error: 'Geolocalización no soportada en este navegador'
      }));
      toast.error('Tu navegador no soporta geolocalización');
      // Fallback inmediato a Madrid
      setLocation({
        lat: 40.4168,
        lon: -3.7038,
        loading: false,
        error: null
      });
      return;
    }

    // Mostrar toast de carga
    const loadingToast = toast.loading('Obteniendo tu ubicación...');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log('✅ Ubicación obtenida:', position.coords);
        toast.dismiss(loadingToast);
        toast.success('¡Ubicación obtenida correctamente!');
        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
          loading: false,
          error: null
        });
      },
      (error) => {
        console.error('❌ Error de geolocalización:', error);
        toast.dismiss(loadingToast);
        
        let errorMessage = 'Error al obtener ubicación';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Permiso denegado. Habilita la ubicación en tu navegador.';
            toast.error('Permiso de ubicación denegado');
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Información de ubicación no disponible.';
            toast.error('Ubicación no disponible');
            break;
          case error.TIMEOUT:
            errorMessage = 'Tiempo de espera agotado al obtener ubicación.';
            toast.error('Tiempo de espera agotado');
            break;
          default:
            toast.error('Error al obtener ubicación');
        }
        
        console.log('🏙️ Usando Madrid como fallback');
        toast.info('Usando Madrid como ubicación por defecto');
        setLocation({
          lat: 40.4168,
          lon: -3.7038,
          loading: false,
          error: null
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  };

  // Función para forzar ubicación específica (para testing)
  const setManualLocation = (lat: number, lon: number) => {
    console.log('📍 Estableciendo ubicación manual:', { lat, lon });
    setLocation({
      lat,
      lon,
      loading: false,
      error: null
    });
  };

  useEffect(() => {
    console.log('🚀 Iniciando hook de geolocalización');
    requestLocation();
  }, []);

  return { ...location, requestLocation, setManualLocation };
};