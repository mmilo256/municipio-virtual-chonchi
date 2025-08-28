import e from "express";
import { deleteDocument, downloadDocument, subirArchivo } from "../controllers/documents.controller.js";
import { setUpload } from "../config/multer.js";

// Router
const router = e.Router()

const upload = setUpload()

router.delete("/:id", deleteDocument)
router.get("/:id/download", downloadDocument)
router.post("/subir-archivo", subirArchivo)

export default router