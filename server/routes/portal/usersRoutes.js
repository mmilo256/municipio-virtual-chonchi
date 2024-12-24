import e from "express";
import { getUserIdByRut } from "../../controllers/admin/usersController.js";

const router = e.Router()

router.get("/", getUserIdByRut)

export default router