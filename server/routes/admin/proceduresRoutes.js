import e from "express"
import { getAllProceduresByUserPermissions } from "../../controllers/admin/proceduresController.js"

// Router
const router = e.Router()

router.get("/", getAllProceduresByUserPermissions)

export default router