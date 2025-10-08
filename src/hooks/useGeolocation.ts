import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { weatherApi } from '../services/weatherApi';

interface GeolocationState {
  lat: number | null;
  lon: number | null;
  loading: boolean;
  error: string | null;
  locationName?: string;
}

export const useGeolocation = () => {
  return {
    lat: -34.6037,
    lon: -58.3816,
    loading: false,
    error: null,
    locationName: 'Buenos Aires, AR',
    requestLocation: () => {},
    setManualLocation: () => {}
  };
};