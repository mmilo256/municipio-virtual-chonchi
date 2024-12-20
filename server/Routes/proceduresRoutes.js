import e from "express";
import { getAllProcedures, getFormInputs, getProcedureById } from "../Controllers/proceduresController.js";

const router = e.Router()

router.get("/", getAllProcedures)
router.get("/:id", getProcedureById)
router.get("/:id/forms", getFormInputs)

export default router