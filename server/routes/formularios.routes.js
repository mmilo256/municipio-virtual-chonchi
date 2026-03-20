import e from 'express';
import { obtenerFormularios } from '../controllers/formularios.controller.js';

const router = e.Router();

router.get('/', obtenerFormularios);

export default router;
