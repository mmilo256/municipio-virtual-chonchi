import e from 'express';
import {
  crearFormulario,
  editarFormulario,
  obtenerFormularioPorId,
  obtenerFormularios,
} from '../controllers/formularios.controller.js';
import { autorizarAdmin } from '../middlewares/roleMiddleware.js';

const router = e.Router();

router.get('/', obtenerFormularios);
router.get('/:id', obtenerFormularioPorId);
router.post('/', autorizarAdmin, crearFormulario);
router.patch('/:id', autorizarAdmin, editarFormulario);

export default router;
