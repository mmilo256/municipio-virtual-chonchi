import e from 'express';
import { obtenerDireccionesMunicipales } from '../controllers/direccionesMunicipales.controller.js';

// Router
const router = e.Router();

router.get('/', obtenerDireccionesMunicipales);

export default router;
