import e from 'express';
import { setUpload } from '../config/multer.js';
import {
  adjuntarDocumento,
  crearSolicitud,
  getAllRequests,
  obtenerSolicitudesPorTramite,
  getAllRequestsByUserId,
  getStatusLog,
  getUploadedDocuments,
  obtenerSolicitudPorCodigo,
  actualizarEstadoSolicitud,
  subirDocumento,
  aprobarSolicitud,
  rechazarSolicitud,
  solicitarCorreccion,
  enviarCorreccion,
  agregarSolicitud,
} from '../controllers/solicitudes.controller.js';

const uploadPublic = setUpload();
const uploadAdmin = setUpload('documents/');

// Router
const router = e.Router();

router.get('/', getAllRequests);
router.post('/', uploadPublic.any(), crearSolicitud);
router.post('/agregar', uploadAdmin.any(), agregarSolicitud);
router.get('/:codigo', obtenerSolicitudPorCodigo);
router.patch('/:codigo', actualizarEstadoSolicitud);
router.post('/:codigo/aprobar', uploadAdmin.any(), aprobarSolicitud);
router.post('/:codigo/rechazar', rechazarSolicitud);
router.post('/:codigo/solicitar-correccion', solicitarCorreccion);
router.post('/:codigo/enviar-correccion', uploadPublic.any(), enviarCorreccion);
router.post('/:codigo/subir-documento', uploadAdmin.any(), subirDocumento);
router.get('/user/:id', getAllRequestsByUserId);
router.get('/:id/documents', getUploadedDocuments);
router.post('/:id/adjuntar-documento', uploadPublic.single('archivo'), adjuntarDocumento);
router.get('/tramite/:slug', obtenerSolicitudesPorTramite);
router.get('/:id/historial', getStatusLog);

export default router;
