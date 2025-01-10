import e from "express";
import { createRequest, getAllRequestsByRut, getStatusLog } from "../../controllers/portal/requestsController.js";
import { setUpload } from '../../config/multer.js'

const upload = setUpload()

// Router
const router = e.Router()

router.get("/", getAllRequestsByRut)
router.get("/:id/historial-estados", getStatusLog)
router.post("/", upload.any('requestDoc', 8), createRequest)

export default router