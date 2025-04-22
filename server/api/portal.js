import { Router } from "express";
import authRoutes from '../auth/portal/auth.routes.js'
import proceduresRoutes from '../routes/procedures.routes.js'
import requestsRoutes from '../routes/requests.routes.js'
import { authMiddleware } from "../auth/portal/auth.middleware.js";

const router = Router()

router.use("/auth", authRoutes)
router.use("/procedures", authMiddleware, proceduresRoutes)
router.use("/requests", authMiddleware, requestsRoutes)


export default router