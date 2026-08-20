import { rateLimit } from 'express-rate-limit';
import { config } from '../config/config.js';

const rateLimitResponse = { message: 'Demasiadas solicitudes. Intenta nuevamente más tarde.' };

export const apiRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 1000,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: rateLimitResponse,
});

export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  skipSuccessfulRequests: true,
  message: rateLimitResponse,
});

const SAFE_METHODS = new Set(['GET', 'HEAD', 'OPTIONS']);

export const verifyRequestOrigin = (req, res, next) => {
  if (SAFE_METHODS.has(req.method)) return next();

  const origin = req.get('origin');
  if (origin && !config.corsOrigins.includes(origin)) {
    return res.status(403).json({ message: 'Origen de la solicitud no autorizado' });
  }
  next();
};
