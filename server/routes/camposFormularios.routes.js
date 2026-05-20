import e from 'express';
import { crearCamposFormulario } from '../controllers/camposFormularios.controller.js';
import { autorizarAdmin } from '../middlewares/roleMiddleware.js';

const router = e.Router();

router.post('/', autorizarAdmin, crearCamposFormulario);

export default router;
