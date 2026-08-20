import e from 'express';
import { login, logout, verifySession } from './auth.controller.js';
import { authMiddleware } from './auth.middleware.js';
import { authRateLimiter } from '../../middlewares/security.js';

const router = e.Router();

router.post('/login', authRateLimiter, login);
router.post('/logout', logout);
router.get('/session', authMiddleware, verifySession);

export default router;
