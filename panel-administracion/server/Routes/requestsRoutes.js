import e from "express";
import { getAllRequestsByProcedure } from "../Controllers/requestsController.js";

const router = e.Router()

router.get("/", getAllRequestsByProcedure)

export default router