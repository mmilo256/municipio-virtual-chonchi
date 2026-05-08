import e from 'express';
import { setUpload } from '../config/multer.js';
import {
  adjuntarDocumento,
  createRequest,
  getAllRequests,
  obtenerSolicitudesPorTramite,
  getAllRequestsByUserId,
  getStatusLog,
  getUploadedDocuments,
  obtenerSolicitudPorCodigo,
  actualizarEstadoSolicitud,
  subirDocumento,
} from '../controllers/solicitudes.controller.js';

const uploadPublic = setUpload();
const uploadAdmin = setUpload('documents/');

// Router
const router = e.Router();

router.get('/', getAllRequests);
router.post('/', uploadPublic.any(), createRequest);
router.get('/:codigo', obtenerSolicitudPorCodigo);
router.patch('/:codigo', actualizarEstadoSolicitud);
router.post('/:codigo/subir-documento', uploadAdmin.any(), subirDocumento);
router.get('/user/:id', getAllRequestsByUserId);
router.get('/:id/documents', getUploadedDocuments);
router.post('/:id/adjuntar-documento', uploadPublic.single('archivo'), adjuntarDocumento);
router.get('/tramite/:slug', obtenerSolicitudesPorTramite);
router.get('/:id/historial', getStatusLog);

export default router;
