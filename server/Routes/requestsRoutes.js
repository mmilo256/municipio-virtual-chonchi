import e from "express";
import { createRequest, getAllRequestsByProcedure, getRequestById } from "../Controllers/requestsController.js";
import { upload } from "../config/multer.js";



// Router
const router = e.Router()

router.post("/", upload.any('requestDoc', 8), createRequest)
router.get("/", getAllRequestsByProcedure)
router.get("/:id", getRequestById)

export default router