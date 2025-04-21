import e from "express";
import { callback, login, logout, verifySession } from "./auth.controller.js";

const router = e.Router()

router.get("/login", login)
router.get("/callback", callback)
router.get("/session", verifySession)
router.post("/logout", logout)


export default router