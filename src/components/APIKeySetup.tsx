import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ExternalLink, Star } from 'lucide-react';
import { getAPIInfo } from '../config/api';

interface APIKeySetupProps {
  onClose: () => void;
}

export const APIKeySetup: React.FC<APIKeySetupProps> = ({ onClose }) => {
  const apiInfo = getAPIInfo();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white/10 backdrop-blur-md rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/20"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 mb-6">
          <CheckCircle className="w-8 h-8 text-green-400" />
          <h2 className="text-2xl font-bold text-white">{apiInfo.name}</h2>
            <div className="flex items-center gap-1 bg-blue-500/20 px-2 py-1 rounded-lg">
              <Star className="w-4 h-4 text-blue-400" />
              <span className="text-blue-200 text-sm font-medium">Gratuita</span>
            </div>
        </div>

        <div className="space-y-6">
          {/* Descripción */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">¿Qué es {apiInfo.name}?</h3>
            <p className="text-white/90 leading-relaxed">
              {apiInfo.description}. Es una API meteorológica de código abierto que proporciona datos meteorológicos precisos 
              sin límites de uso y completamente gratuita. No requiere registro ni API key.
            </p>
          </div>

          {/* Características */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Características incluidas:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {apiInfo.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="text-green-400 text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Ventajas */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">¿Por qué elegir Open-Meteo?</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-semibold flex-shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <p className="text-white/90 font-medium">Completamente Gratuita</p>
                  <p className="text-white/70 text-sm">Sin límites de llamadas, sin costos ocultos</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-semibold flex-shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <p className="text-white/90 font-medium">Sin Registro Requerido</p>
                  <p className="text-white/70 text-sm">No necesitas crear cuenta ni API key</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-semibold flex-shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <p className="text-white/90 font-medium">Datos Precisos</p>
                  <p className="text-white/70 text-sm">Información meteorológica actualizada y confiable</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-semibold flex-shrink-0 mt-0.5">
                  4
                </div>
                <div>
                  <p className="text-white/90 font-medium">Código Abierto</p>
                  <p className="text-white/70 text-sm">Transparente y mantenido por la comunidad</p>
                </div>
              </div>
            </div>
          </div>

          {/* Enlaces útiles */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Enlaces útiles:</h3>
            <div className="space-y-2">
              <a
                href={apiInfo.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Sitio web oficial</span>
              </a>
              <a
                href={apiInfo.documentation}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Documentación de la API</span>
              </a>
            </div>
          </div>

          {/* Estado actual */}
          <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <h4 className="text-green-200 font-semibold">¡Ya está configurado!</h4>
            </div>
            <p className="text-green-100 text-sm">
              Tu aplicación ya está usando Open-Meteo y funcionando con datos meteorológicos reales. 
              No necesitas hacer nada más.
            </p>
          </div>

          {/* Botones */}
          <div className="flex gap-3 pt-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onClose}
              className="flex-1 bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 px-6 py-3 rounded-xl text-white font-semibold transition-all duration-300"
            >
              ¡Perfecto!
            </motion.button>
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href={apiInfo.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-6 py-3 rounded-xl text-white font-semibold transition-all duration-300 text-center flex items-center justify-center gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              Ver Sitio Web
            </motion.a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
