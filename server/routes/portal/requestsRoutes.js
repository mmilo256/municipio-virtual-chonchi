import e from "express";
import { createRequest } from "../../controllers/portal/requestsController.js";
import { setUpload } from '../../config/multer.js'

const upload = setUpload()

// Router
const router = e.Router()

router.post("/", upload.any('requestDoc', 8), createRequest)

export default router