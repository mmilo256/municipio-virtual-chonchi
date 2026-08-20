import e from 'express';
import { callback, login, logout, verifySession } from './auth.controller.js';
import { authMiddleware } from './auth.middleware.js';
import { authRateLimiter } from '../../middlewares/security.js';

const router = e.Router();

router.get('/login', authRateLimiter, login);
router.get('/callback', authRateLimiter, callback);
router.get('/session', authMiddleware, verifySession);
router.post('/logout', logout);

export default router;
