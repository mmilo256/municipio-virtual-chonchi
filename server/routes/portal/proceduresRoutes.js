import e from "express";
import { generarDecretoPT, getAllProcedures, getFormInputs, getProcedureById } from "../../controllers/portal/proceduresController.js";

const router = e.Router()

router.get("/", getAllProcedures)
router.get("/:id", getProcedureById)
router.get("/:id/forms", getFormInputs)
router.post("/permisos-transitorios", generarDecretoPT)

export default router