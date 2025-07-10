import e from "express";
import { setUpload } from '../config/multer.js'
import { createRequest, getAllRequests, getAllRequestsByProcedure, getAllRequestsByUserId, getRequestById, getStatusLog, getUploadedDocuments, updateRequestStatus, uploadDocument } from "../controllers/requests.controller.js";

const uploadPublic = setUpload()
const uploadAdmin = setUpload("documents/")

// Router
const router = e.Router()

router.get("/", getAllRequests)
router.post("/", uploadPublic.any('requestDoc', 8), createRequest)
router.get("/:id", getRequestById)
router.patch("/:id", updateRequestStatus)
router.get("/user/:id", getAllRequestsByUserId)
router.get("/:id/documents", getUploadedDocuments)
router.post("/:id/documents", uploadAdmin.any("uploadedDoc"), uploadDocument)
router.get("/procedure/:id", getAllRequestsByProcedure)
router.get("/:id/historial", getStatusLog)

export default router