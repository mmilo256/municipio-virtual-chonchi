import e from 'express';
import session from 'express-session'; // Middleware para sesiones
import MySQLStoreFactory from 'express-mysql-session';
import cors from 'cors'; // Middleware para configurar CORS
import cookieParser from 'cookie-parser'; // Middleware para parsear cookies
import helmet from 'helmet';
import { randomUUID } from 'node:crypto';
import initializeDB from './config/db/init.js'; // Inicializar la base de datos

import portalApi from './api/portal.js';
import adminApi from './api/admin.js';
import { config, validateConfig } from './config/config.js';
import { sequelize } from './config/db/config.js';
import logger from './config/winston.js';
import { apiRateLimiter, verifyRequestOrigin } from './middlewares/security.js';

const port = config.port;
const app = e(); // Crear la instancia de la aplicación Express

validateConfig();

if (config.trustProxy > 0) app.set('trust proxy', config.trustProxy);
app.disable('x-powered-by');
app.use(helmet());
app.use((req, res, next) => {
  req.id = req.get('x-request-id') || randomUUID();
  res.setHeader('X-Request-Id', req.id);
  next();
});

// Inicializar base de datos (esto se realiza de forma asíncrona)
logger.info('Iniciando conexión a base de datos...');
await initializeDB();
logger.info('Base de datos iniciada correctamente');
logger.info(
  config.db.sync
    ? 'Sincronización automática de esquema ACTIVADA (DB_SYNC=true)'
    : 'Sincronización automática de esquema desactivada',
);

app.use(e.json({ limit: config.maxJsonSize })); // Limitar cuerpos JSON inesperadamente grandes
app.use(cookieParser()); // Middleware para parsear las cookies de las solicitudes

// Configuración del CORS (Cross-Origin Resource Sharing)
// Definir los orígenes permitidos para acceder a la API (en producción y desarrollo)
app.use(
  cors({
    origin: config.corsOrigins,
    credentials: true, // Permitir el envío de cookies y credenciales en solicitudes
    methods: ['GET', 'POST', 'OPTIONS', 'PATCH', 'DELETE'], // Métodos HTTP permitidos
  }),
);
app.use(verifyRequestOrigin);
app.use('/api', apiRateLimiter);

// Configuración del middleware de sesión
// Esto gestiona las sesiones del usuario utilizando cookies

const { sessionSecret } = config;
const MySQLStore = MySQLStoreFactory(session);
const sessionStore = new MySQLStore({
  host: config.db.host,
  port: Number(config.db.port || 3306),
  user: config.db.user,
  password: config.db.password,
  database: config.db.name,
  createDatabaseTable: false,
  schema: { tableName: 'user_sessions' },
});

app.use(
  session({
    name: 'municipio.sid',
    store: sessionStore,
    secret: sessionSecret, // Clave secreta para firmar las cookies de sesión
    resave: false, // No volver a guardar la sesión si no ha habido cambios
    saveUninitialized: false, // No guardar sesiones sin inicializar
    cookie: {
      secure: config.cookieSecure,
      httpOnly: true, // Hacer que las cookies no sean accesibles por JavaScript (mejor seguridad)
      sameSite: config.cookieSecure ? 'none' : 'lax',
      maxAge: config.sessionMaxAgeMs,
    },
  }),
);

logger.info('Registrando rutas...');
app.get('/health/live', (_req, res) => res.status(200).json({ status: 'ok' }));
app.get(['/health', '/health/ready'], async (_req, res) => {
  try {
    await sequelize.authenticate();
    res.status(200).json({ status: 'ok', database: 'connected' });
  } catch (error) {
    logger.error(`Health check de base de datos falló: ${error.message}`);
    res.status(503).json({ status: 'degraded', database: 'disconnected' });
  }
});
app.use('/api/portal', portalApi);
app.use('/api/admin', adminApi);

app.use((_req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Express identifica el middleware de errores por sus cuatro parámetros.
// eslint-disable-next-line no-unused-vars
app.use((error, req, res, _next) => {
  logger.error(`Error no controlado [${req.id}]: ${error.message}`);
  const status =
    error?.type === 'entity.too.large' || error?.code?.startsWith('LIMIT_') ? 413 : 500;
  res.status(status).json({
    message:
      status === 413 ? 'La solicitud o el archivo supera los límites permitidos' : 'Error interno del servidor',
  });
});

// Inicializar el servidor y escuchar en el puerto configurado
logger.info('Iniciando servidor...');
const server = app.listen(port, () => {
  logger.info(`Servidor iniciado correctamente en el puerto ${port}`);
});

let shuttingDown = false;
const shutdown = async (signal, exitCode = 0) => {
  if (shuttingDown) return;
  shuttingDown = true;
  logger.info(`Cierre ordenado iniciado (${signal})`);
  server.close(async () => {
    try {
      await sequelize.close();
      await sessionStore.close();
      process.exit(exitCode);
    } catch (error) {
      logger.error(`Error durante el cierre: ${error.message}`);
      process.exit(1);
    }
  });
  setTimeout(() => process.exit(1), 10000).unref();
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

process.on('uncaughtException', (error) => {
  logger.error(`Excepción no controlada: ${error.stack || error.message}`);
  shutdown('uncaughtException', 1);
});

process.on('unhandledRejection', (reason) => {
  logger.error(`Promesa rechazada sin manejar: ${reason?.stack || reason}`);
  shutdown('unhandledRejection', 1);
});
