import e from 'express';
import { crearPasosFormulario } from '../controllers/pasosFormularios.controller.js';

const router = e.Router();

router.post('/', crearPasosFormulario);

export default router;
