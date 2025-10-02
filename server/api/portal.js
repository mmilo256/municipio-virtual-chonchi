import { Router } from "express";
import authRoutes from '../auth/portal/auth.routes.js'
import proceduresRoutes from '../routes/procedures.routes.js'
import requestsRoutes from '../routes/requests.routes.js'
import { authMiddleware } from "../auth/portal/auth.middleware.js";
import documentsRoutes from '../routes/documents.routes.js'

const router = Router()

router.use("/auth", authRoutes)
router.use("/procedures", authMiddleware, proceduresRoutes)
router.use("/requests", authMiddleware, requestsRoutes)
router.use("/documents", authMiddleware, documentsRoutes)

export default router