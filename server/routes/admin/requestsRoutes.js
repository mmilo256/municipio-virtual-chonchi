import e from "express";
import { getAllRequestsByProcedure, getRequestById, updateRequestStatus } from "../../controllers/admin/requestsController.js";
import { approveRequestPT, getFinalDocument, uploadSignedDocument } from "../../controllers/admin/permisosTransitoriosController.js";


// Router
const router = e.Router()

router.get("/", getAllRequestsByProcedure)
router.get("/:id", getRequestById)
router.patch("/:id/estado", updateRequestStatus)

// Permisos transitorios
router.post("/permisos-transitorios/:id/aprobar", approveRequestPT)
router.get("/permisos-transitorios/:id/decreto", getFinalDocument)
router.post("/permisos-transitorios/:id/decreto", uploadSignedDocument)

export default router