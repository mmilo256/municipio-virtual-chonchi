import e from "express";
import { setUpload } from '../config/multer.js'
import { createRequest, getAllRequests, getAllRequestsByUserId, getStatusLog } from "../controllers/requests.controller.js";

const upload = setUpload()

// Router
const router = e.Router()

router.get("/", getAllRequests)
router.get("/user/:id", getAllRequestsByUserId)
router.get("/:id/historial", getStatusLog)
router.post("/", upload.any('requestDoc', 8), createRequest)

export default router