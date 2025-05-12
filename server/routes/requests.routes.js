import e from "express";
import { setUpload } from '../config/multer.js'
import { createRequest, getAllRequests, getAllRequestsByProcedure, getAllRequestsByUserId, getRequestById, getStatusLog, uploadDocument } from "../controllers/requests.controller.js";

const upload = setUpload()

// Router
const router = e.Router()

router.get("/", getAllRequests)
router.get("/:id", getRequestById)
router.post("/:id/documents", upload.single("uploadedDoc"), uploadDocument)
router.get("/user/:id", getAllRequestsByUserId)
router.get("/procedure/:procedure_id", getAllRequestsByProcedure)
router.get("/:id/historial", getStatusLog)
router.post("/", upload.any('requestDoc', 8), createRequest)

export default router