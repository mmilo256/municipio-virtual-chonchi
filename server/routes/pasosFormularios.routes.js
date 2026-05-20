import e from 'express';
import {
  crearPasosFormulario,
  obtenerPasoFormularioPorId,
} from '../controllers/pasosFormularios.controller.js';
import { autorizarAdmin } from '../middlewares/roleMiddleware.js';

const router = e.Router();

router.get('/:id', obtenerPasoFormularioPorId);
router.post('/', autorizarAdmin, crearPasosFormulario);
/* router.patch('/editar', editarPasosFormulario); */

export default router;
