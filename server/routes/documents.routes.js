import e from 'express';
import {
  deleteDocument,
  downloadDocument,
  getDocument,
  subirArchivo,
  viewDocument,
} from '../controllers/documents.controller.js';

// Router
const router = e.Router();

router.get('/:id', getDocument);
router.delete('/:id', deleteDocument);
router.get('/:id/view', viewDocument);
router.get('/:id/download', downloadDocument);
router.post('/subir-archivo', subirArchivo);

export default router;
