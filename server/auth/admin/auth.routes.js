import e from "express"
import { login, logout, register, verifySession } from "./auth.controller.js"

const router = e.Router()

router.post("/register", register)
router.post("/login", login)
router.post("/logout", logout)
router.get("/session", verifySession)

export default router