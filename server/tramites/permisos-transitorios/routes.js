import { Router } from "express";
import { obtenerDecreto, subirDecretoFirmado } from "./controller.js";

const router = Router()

router.post("/:id/subir-decreto", subirDecretoFirmado)
router.get("/:id/obtener-decreto", obtenerDecreto)

export default router