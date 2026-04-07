import e from 'express';
import { crearCamposFormulario } from '../controllers/camposFormularios.controller.js';

const router = e.Router();

router.post('/', crearCamposFormulario);

export default router;
