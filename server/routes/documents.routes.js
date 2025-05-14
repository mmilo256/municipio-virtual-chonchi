import e from "express";
import { deleteDocument } from "../controllers/documents.controller.js";

// Router
const router = e.Router()

router.delete("/:id", deleteDocument)

export default router