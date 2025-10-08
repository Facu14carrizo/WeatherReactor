// Test simple para verificar que WeatherAPI.com funcione
const testWeatherAPI = async () => {
  console.log('🧪 Probando API de WeatherAPI.com...');
  
  try {
    // Probar clima actual para Madrid usando coordenadas
    const url = 'https://api.weatherapi.com/v1/current.json?key=demo_key&q=40.4168,-3.7038&lang=es';
    
    console.log('📡 Realizando llamada a:', url);
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('✅ Respuesta de WeatherAPI.com:', data);
    
    return {
      success: true,
      temperature: data.current?.temp_c,
      humidity: data.current?.humidity,
      condition: data.current?.condition?.text,
      location: data.location?.name
    };
  } catch (error) {
    console.error('❌ Error en test de WeatherAPI.com:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// Ejecutar test automáticamente
testWeatherAPI();

// Exportar para uso manual
window.testWeatherAPI = testWeatherAPI;
