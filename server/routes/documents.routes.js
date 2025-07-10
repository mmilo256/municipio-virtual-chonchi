import e from "express";
import { deleteDocument, downloadDocument } from "../controllers/documents.controller.js";

// Router
const router = e.Router()

router.delete("/:id", deleteDocument)
router.get("/:id/download", downloadDocument)

export default router