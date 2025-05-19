import { Router } from "express";
import { generarDecreto, obtenerDecreto, subirDecretoFirmado } from "./controller.js";

const router = Router()

router.post("/:id/generar-decreto", generarDecreto)
router.post("/:id/subir-decreto", subirDecretoFirmado)
router.get("/:id/obtener-decreto", obtenerDecreto)

export default router