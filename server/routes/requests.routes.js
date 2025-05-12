import e from "express";
import { setUpload } from '../config/multer.js'
import { createRequest, getAllRequests, getAllRequestsByProcedure, getAllRequestsByUserId, getRequestById, getStatusLog, uploadDocument } from "../controllers/requests.controller.js";

const uploadPublic = setUpload()
const uploadAdmin = setUpload("documents/")

// Router
const router = e.Router()

router.get("/", getAllRequests)
router.get("/:id", getRequestById)
router.post("/:id/documents", uploadAdmin.any("uploadedDoc"), uploadDocument)
router.get("/user/:id", getAllRequestsByUserId)
router.get("/procedure/:procedure_id", getAllRequestsByProcedure)
router.get("/:id/historial", getStatusLog)
router.post("/", uploadPublic.any('requestDoc', 8), createRequest)

export default router