import { Router } from "express";
import authRoutes from '../auth/portal/auth.routes.js'
import proceduresRoutes from '../routes/procedures.routes.js'
import requestsRoutes from '../routes/requests.routes.js'

const router = Router()

router.use("/auth", authRoutes)
router.use("/procedures", proceduresRoutes)
router.use("/requests", requestsRoutes)


export default router