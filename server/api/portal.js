import { Router } from 'express';
import authRoutes from '../auth/portal/auth.routes.js';
import tramitesRoutes from '../routes/tramites.routes.js';
import requestsRoutes from '../routes/requests.routes.js';
import { authMiddleware } from '../auth/portal/auth.middleware.js';
import documentsRoutes from '../routes/documents.routes.js';
import emailRoutes from '../routes/email.routes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/email', authMiddleware, emailRoutes);
router.use('/tramites', tramitesRoutes);
router.use('/requests', authMiddleware, requestsRoutes);
router.use('/documents', authMiddleware, documentsRoutes);

export default router;
