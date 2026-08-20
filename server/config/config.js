import 'dotenv/config';

export const config = {
  env: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT || 10000),
  corsOrigins: (process.env.CORS_ORIGINS || 'http://localhost:5173,http://localhost:5174')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean),
  email: process.env.EMAIL,
  emailPassword: process.env.EMAIL_PASSWORD,
  sessionSecret: process.env.SESSION_SECRET,
  cookieSecure: process.env.COOKIE_SECURE === 'true',
  sessionMaxAgeMs: Number(process.env.SESSION_MAX_AGE_MS || 15 * 60 * 1000),
  trustProxy: Number(process.env.TRUST_PROXY || 0),
  maxJsonSize: process.env.MAX_JSON_SIZE || '1mb',
  maxUploadFieldSize: Number(process.env.MAX_UPLOAD_FIELD_SIZE_MB || 1) * 1024 * 1024,
  maxUploadSize: Number(process.env.MAX_UPLOAD_SIZE_MB || 10) * 1024 * 1024,
  maxUploadFiles: Number(process.env.MAX_UPLOAD_FILES || 10),
  allowedUploadMimeTypes: new Set(
    (process.env.ALLOWED_UPLOAD_MIME_TYPES ||
      'application/pdf,image/jpeg,image/png,image/webp,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
      .split(',')
      .map((value) => value.trim().toLowerCase())
      .filter(Boolean),
  ),
  portalPublicUrl: process.env.PORTAL_PUBLIC_URL || 'http://localhost:5173',
  adminPublicUrl: process.env.ADMIN_PUBLIC_URL || 'http://localhost:5174/admin',
  smtp: {
    host: process.env.SMTP_HOST || 'mail.municipalidadchonchi.cl',
    port: Number(process.env.SMTP_PORT || 465),
    secure: process.env.SMTP_SECURE !== 'false',
  },
  oauth: {
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: process.env.REDIRECT_URI,
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiresIn: process.env.JWT_EXPIRES_IN,
    homeUrl: process.env.HOME_URL,
  },
  db: {
    host: process.env.DB_HOST,
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    sync: process.env.DB_SYNC === 'true',
  },
};

export const validateConfig = () => {
  const required = {
    SESSION_SECRET: config.sessionSecret,
    DB_HOST: config.db.host,
    DB_NAME: config.db.name,
    DB_USER: config.db.user,
    DB_PASSWORD: config.db.password,
    JWT_SECRET: config.oauth.jwtSecret,
  };
  const missing = Object.entries(required)
    .filter(([name, value]) => value === undefined || (name !== 'DB_PASSWORD' && !value))
    .map(([name]) => name);

  if (missing.length) {
    throw new Error(`Faltan variables de entorno obligatorias: ${missing.join(', ')}`);
  }
  if (!Number.isInteger(config.port) || config.port < 1 || config.port > 65535) {
    throw new Error('PORT debe ser un puerto válido entre 1 y 65535');
  }
  if (config.env === 'production') {
    if (!config.cookieSecure) throw new Error('COOKIE_SECURE debe ser true en producción');
    if (config.sessionSecret.length < 32 || config.oauth.jwtSecret.length < 32) {
      throw new Error('SESSION_SECRET y JWT_SECRET deben tener al menos 32 caracteres');
    }
    if (config.db.sync) throw new Error('DB_SYNC no puede estar activo en producción');
    if (config.corsOrigins.some((origin) => origin.includes('localhost'))) {
      throw new Error('CORS_ORIGINS no puede contener localhost en producción');
    }
  }
};
