import e from "express";
import { createRequest } from "../../controllers/portal/requestsController.js";
import { upload } from "../../config/multer.js";



// Router
const router = e.Router()

router.post("/", upload.any('requestDoc', 8), createRequest)

export default router