import e from 'express';
import {
  crearTramite,
  editarTramite,
  obtenerTramitePorId,
  obtenerTramites,
} from '../controllers/tramites.controller.js';

const router = e.Router();

router.get('/', obtenerTramites);
router.get('/:id', obtenerTramitePorId);
router.post('/', crearTramite);
router.patch('/:id', editarTramite);

export default router;
