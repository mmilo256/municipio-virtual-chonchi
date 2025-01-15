import winston from 'winston'

// Configura el logger de Winston para registrar eventos
const logger = winston.createLogger({
    level: 'info', // Nivel de log predeterminado (info y superior)
    format: winston.format.combine(
        // Agrega una marca de tiempo con el formato "YYYY-MM-DD HH:mm:ss.SSS"
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss.SSS" }),

        // Personaliza el formato del log para que muestre el nivel y el mensaje
        winston.format.printf(({ timestamp, level, message }) => {
            return `${timestamp} [${level.toUpperCase()}: ${message}]`
        })
    ),
    defaultMeta: { service: 'user-service' }, // Meta por defecto para los logs (nombre del servicio)
    transports: [
        // Transporte para guardar los logs de error en el archivo 'error.log'
        new winston.transports.File({ filename: 'error.log', level: 'error' }),

        // Transporte para guardar todos los logs en el archivo 'combined.log'
        new winston.transports.File({ filename: 'combined.log' })
    ]
})

// Agrega un transporte adicional para mostrar los logs en la consola con colores
logger.add(new winston.transports.Console({
    format: winston.format.colorize(), // Aplica color a los logs en la consola
}));

// Exporta el logger configurado para ser usado en otras partes del sistema
export default logger
