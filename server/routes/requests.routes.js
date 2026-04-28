import e from 'express';
import { setUpload } from '../config/multer.js';
import {
  adjuntarDocumento,
  createRequest,
  getAllRequests,
  getAllRequestsByProcedure,
  getAllRequestsByUserId,
  getStatusLog,
  getUploadedDocuments,
  obtenerSolicitudPorCodigo,
  updateRequestStatus,
  uploadDocument,
} from '../controllers/requests.controller.js';

const uploadPublic = setUpload();
const uploadAdmin = setUpload('documents/');

// Router
const router = e.Router();

router.get('/', getAllRequests);
router.post('/', createRequest);
router.get('/:codigo', obtenerSolicitudPorCodigo);
router.patch('/:id', updateRequestStatus);
router.get('/user/:id', getAllRequestsByUserId);
router.get('/:id/documents', getUploadedDocuments);
router.post('/:id/documents', uploadAdmin.any('uploadedDoc'), uploadDocument);
router.post('/:id/adjuntar-documento', uploadPublic.single('archivo'), adjuntarDocumento);
router.get('/procedure/:id', getAllRequestsByProcedure);
router.get('/:id/historial', getStatusLog);

export default router;
