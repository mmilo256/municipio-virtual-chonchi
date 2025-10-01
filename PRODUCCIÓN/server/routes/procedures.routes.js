import e from "express";
import { createProcedure, getAllProcedures, getProcedureById } from "../controllers/procedures.controller.js";

const router = e.Router()

router.get("/", getAllProcedures)
router.get("/:id", getProcedureById)
router.post("/", createProcedure)

export default router