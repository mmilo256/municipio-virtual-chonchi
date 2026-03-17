import e from 'express';
import {
  crearTramite,
  obtenerTramitePorId,
  obtenerTramites,
} from '../controllers/tramites.controller.js';

const router = e.Router();

router.get('/', obtenerTramites);
router.get('/:id', obtenerTramitePorId);
router.post('/', crearTramite);

export default router;
