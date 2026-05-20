import e from 'express';
import {
  crearTramite,
  editarTramite,
  obtenerFormularioPorSlugDeTramite,
  obtenerTramitePorId,
  obtenerTramitePorSlug,
  obtenerTramitesPanel,
  obtenerTramitesPortal,
} from '../controllers/tramites.controller.js';
import { autorizarAdmin } from '../middlewares/roleMiddleware.js';

const router = e.Router();

router.get('/', obtenerTramitesPortal);
router.get('/panel', obtenerTramitesPanel);
router.get('/:id', obtenerTramitePorId);
router.get('/slug/:slug', obtenerTramitePorSlug);
router.get('/:slug/formulario', obtenerFormularioPorSlugDeTramite);
router.post('/', autorizarAdmin, crearTramite);
router.patch('/:id', autorizarAdmin, editarTramite);

export default router;
