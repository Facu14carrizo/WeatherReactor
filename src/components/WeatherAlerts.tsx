import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Info, AlertCircle, Zap, X } from 'lucide-react';
import { WeatherAlert } from '../types/weather';
import { formatDate } from '../utils/weatherHelpers';

interface WeatherAlertsProps {
  alerts: WeatherAlert[];
  onDismiss?: (alertId: string) => void;
}

export const WeatherAlerts: React.FC<WeatherAlertsProps> = ({ alerts, onDismiss }) => {
  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'extreme':
        return <Zap className="w-5 h-5 text-red-500" />;
      case 'severe':
        return <AlertTriangle className="w-5 h-5 text-orange-500" />;
      case 'moderate':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      default:
        return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'extreme':
        return 'from-red-500/20 to-red-600/20 border-red-500/30';
      case 'severe':
        return 'from-orange-500/20 to-orange-600/20 border-orange-500/30';
      case 'moderate':
        return 'from-yellow-500/20 to-yellow-600/20 border-yellow-500/30';
      default:
        return 'from-blue-500/20 to-blue-600/20 border-blue-500/30';
    }
  };

  if (alerts.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-6"
    >
      <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
        <AlertTriangle className="w-5 h-5 mr-2 text-yellow-400" />
        Alertas Meteorológicas ({alerts.length})
      </h3>
      
      <div className="space-y-3">
        <AnimatePresence>
          {alerts.map((alert, index) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className={`bg-gradient-to-r ${getSeverityColor(alert.severity)} backdrop-blur-lg rounded-2xl p-4 border`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {getSeverityIcon(alert.severity)}
                  </motion.div>
                  
                  <div className="flex-1">
                    <h4 className="text-white font-semibold mb-1">{alert.title}</h4>
                    <p className="text-white/80 text-sm mb-2">{alert.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-2">
                      {alert.tags.map(tag => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-white/10 rounded-full text-xs text-white/70"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="text-xs text-white/60">
                      Válida hasta: {formatDate(alert.end)}
                    </div>
                  </div>
                </div>
                
                {onDismiss && (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => onDismiss(alert.id)}
                    className="p-1 hover:bg-white/10 rounded-full transition-colors duration-200"
                  >
                    <X className="w-4 h-4 text-white/60" />
                  </motion.button>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};