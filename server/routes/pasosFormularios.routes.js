import e from 'express';
import {
  crearPasosFormulario,
  obtenerPasoFormularioPorId,
} from '../controllers/pasosFormularios.controller.js';

const router = e.Router();

router.get('/:id', obtenerPasoFormularioPorId);
router.post('/', crearPasosFormulario);
/* router.patch('/editar', editarPasosFormulario); */

export default router;
