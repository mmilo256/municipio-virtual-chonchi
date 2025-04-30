import { Router } from "express";
import authRoutes from '../auth/admin/auth.routes.js'
import proceduresRoutes from '../routes/procedures.routes.js'
import requestsRoutes from '../routes/requests.routes.js'
import permisosTransitoriosRoutes from '../tramites/permisos-transitorios/routes.js'
import { authMiddleware } from "../auth/admin/auth.middleware.js";


const router = Router()

router.use("/auth", authRoutes)
router.use("/procedures", authMiddleware, proceduresRoutes)
router.use("/requests", authMiddleware, requestsRoutes)
router.use("/permisos-transitorios", authMiddleware, permisosTransitoriosRoutes)

export default router