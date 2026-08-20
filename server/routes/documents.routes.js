import e from 'express';
import {
  borrarDocumento,
  downloadDocument,
  getDocument,
  viewDocument,
} from '../controllers/documents.controller.js';
import {
  authorizeDocumentAccess,
  requireDocumentAdministrator,
} from '../middlewares/documentAccess.js';

// Router
const router = e.Router();

router.use('/:id', authorizeDocumentAccess);
router.get('/:id', getDocument);
router.delete('/:id', requireDocumentAdministrator, borrarDocumento);
router.get('/:id/view', viewDocument);
router.get('/:id/download', downloadDocument);
/* router.post('/subir-archivo', subirArchivo); */

export default router;
