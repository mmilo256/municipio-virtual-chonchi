import e from 'express';
import {
  crearFormulario,
  editarFormulario,
  obtenerFormularioPorId,
  obtenerFormularios,
} from '../controllers/formularios.controller.js';

const router = e.Router();

router.get('/', obtenerFormularios);
router.get('/:id', obtenerFormularioPorId);
router.post('/', crearFormulario);
router.patch('/:id', editarFormulario);

export default router;
