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
  obtenerSolicitudesPermisosTransitorios,
} from '../controllers/solicitudes.controller.js';
import {
  authorizeOwnRequestsList,
  authorizeRequestAccess,
  requireStaff,
} from '../middlewares/requestAccess.js';

const uploadPublic = setUpload();
const uploadAdmin = setUpload('documents/');

// Router
const router = e.Router();

router.get('/', requireStaff, getAllRequests);
router.post('/', uploadPublic.any(), crearSolicitud);
router.post('/agregar', requireStaff, uploadAdmin.any(), agregarSolicitud);
router.get('/user/:id', authorizeOwnRequestsList, getAllRequestsByUserId);
router.get('/tramite/permisos-transitorios', requireStaff, obtenerSolicitudesPermisosTransitorios);
router.get('/tramite/:slug', requireStaff, obtenerSolicitudesPorTramite);
router.post('/:codigo/aprobar', requireStaff, uploadAdmin.any(), aprobarSolicitud);
router.post('/:codigo/rechazar', requireStaff, rechazarSolicitud);
router.post('/:codigo/solicitar-correccion', requireStaff, solicitarCorreccion);
router.post(
  '/:codigo/enviar-correccion',
  authorizeRequestAccess,
  uploadPublic.any(),
  enviarCorreccion,
);
router.post('/:codigo/subir-documento', requireStaff, uploadAdmin.any(), subirDocumento);
router.patch('/:codigo', requireStaff, actualizarEstadoSolicitud);
router.get('/:id/documents', authorizeRequestAccess, getUploadedDocuments);
router.post(
  '/:id/adjuntar-documento',
  authorizeRequestAccess,
  uploadPublic.single('archivo'),
  adjuntarDocumento,
);
router.get('/:id/historial', authorizeRequestAccess, getStatusLog);
router.get('/:codigo', authorizeRequestAccess, obtenerSolicitudPorCodigo);

export default router;
