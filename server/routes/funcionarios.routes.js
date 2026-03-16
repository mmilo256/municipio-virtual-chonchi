import e from 'express';
import {
  crearFuncionario,
  editarFuncionario,
  obtenerFuncionarioPorId,
  obtenerFuncionarios,
} from '../controllers/funcionarios.controller.js';

// Router
const router = e.Router();

router.get('/', obtenerFuncionarios);
router.get('/:id', obtenerFuncionarioPorId);
router.post('/', crearFuncionario);
router.patch('/:id', editarFuncionario);

export default router;
