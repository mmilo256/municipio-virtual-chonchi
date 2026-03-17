import { Router } from 'express';
import authRoutes from '../auth/admin/auth.routes.js';
import tramitesRoutes from '../routes/tramites.routes.js';
import funcionariosRoutes from '../routes/funcionarios.routes.js';
import direccionesRoutes from '../routes/direccionesMunicipales.routes.js';
import requestsRoutes from '../routes/requests.routes.js';
import documentsRoutes from '../routes/documents.routes.js';
import emailRoutes from '../routes/email.routes.js';
import permisosTransitoriosRoutes from '../tramites/permisos-transitorios/routes.js';
import { authMiddleware } from '../auth/admin/auth.middleware.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/tramites', authMiddleware, tramitesRoutes);
router.use('/funcionarios', authMiddleware, funcionariosRoutes);
router.use('/direcciones-municipales', authMiddleware, direccionesRoutes);
router.use('/requests', authMiddleware, requestsRoutes);
router.use('/documents', authMiddleware, documentsRoutes);
router.use('/email', authMiddleware, emailRoutes);
router.use('/permisos-transitorios', authMiddleware, permisosTransitoriosRoutes);

export default router;
