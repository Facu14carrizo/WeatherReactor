// Test simple para verificar que Open-Meteo funcione
const testOpenMeteo = async () => {
  console.log('🧪 Probando API de Open-Meteo...');
  
  try {
    // Probar clima actual para Madrid
    const url = 'https://api.open-meteo.com/v1/forecast?latitude=40.4168&longitude=-3.7038&current=temperature_2m,relative_humidity_2m,weather_code&timezone=auto';
    
    console.log('📡 Realizando llamada a:', url);
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('✅ Respuesta de Open-Meteo:', data);
    
    return {
      success: true,
      temperature: data.current?.temperature_2m,
      humidity: data.current?.relative_humidity_2m,
      weatherCode: data.current?.weather_code
    };
  } catch (error) {
    console.error('❌ Error en test de Open-Meteo:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// Ejecutar test automáticamente
testOpenMeteo();

// Exportar para uso manual
window.testOpenMeteo = testOpenMeteo;
