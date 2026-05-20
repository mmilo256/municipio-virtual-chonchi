import e from 'express';
import {
  crearFuncionario,
  editarFuncionario,
  obtenerFuncionarioPorId,
  obtenerFuncionarios,
} from '../controllers/funcionarios.controller.js';
import { autorizarAdmin } from '../middlewares/roleMiddleware.js';

// Router
const router = e.Router();

router.get('/', autorizarAdmin, obtenerFuncionarios);
router.get('/:id', autorizarAdmin, obtenerFuncionarioPorId);
router.post('/', autorizarAdmin, crearFuncionario);
router.patch('/:id', autorizarAdmin, editarFuncionario);

export default router;
