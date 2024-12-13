import e from "express";
import { getUserIdByRut } from "../Controllers/usersController.js";

const router = e.Router()

router.get("/", getUserIdByRut)

export default router