import winston from 'winston';
import { config } from './config.js';

const productionFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.errors({ stack: true }),
  winston.format.json(),
);
const developmentFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
  winston.format.printf(({ timestamp, level, message }) => {
    return `${timestamp} [${level.toUpperCase()}]: ${message}`;
  }),
);

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: config.env === 'production' ? productionFormat : developmentFormat,
  defaultMeta: { service: 'municipio-virtual-api' },
  transports: [new winston.transports.Console()],
});

if (config.env !== 'production') {
  logger.add(new winston.transports.File({ filename: 'error.log', level: 'error' }));
  logger.add(new winston.transports.File({ filename: 'combined.log' }));
}

// Exporta el logger configurado para ser usado en otras partes del sistema
export default logger;
