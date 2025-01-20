import e from "express";
import { getAllRequestsByProcedure, getRequestById, subirDocumentoAsociado, updateRequestStatus } from "../../controllers/admin/requestsController.js";
import { approveRequestPT, getFinalDocument, uploadSignedDocument } from "../../controllers/admin/administracion-municipal/permisosTransitoriosController.js";
import { setUpload } from "../../config/multer.js";

const uploadPermisosTransitorios = setUpload('decretos/permisos-transitorios')


// Router
const router = e.Router()

router.get("/", getAllRequestsByProcedure)
router.get("/:id", getRequestById)
router.post("/:id/documentoAsociado", subirDocumentoAsociado)
router.patch("/:id/estado", updateRequestStatus)

// Permisos transitorios
router.post("/permisos-transitorios/:id/aprobar", approveRequestPT)
router.get("/permisos-transitorios/:id/decreto", getFinalDocument)
router.post("/permisos-transitorios/:id/decreto", uploadPermisosTransitorios.single('signedDoc'), uploadSignedDocument)

export default router