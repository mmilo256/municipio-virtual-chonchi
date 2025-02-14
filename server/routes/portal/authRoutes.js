import e from "express";
import { callback, getSessionData, login, logout } from "../../controllers/portal/authController.js";
import { verifyPortalToken } from "../../middlewares/portal/authMiddleware.js";
// import { verifyToken } from "../../middlewares/authMIddleware.js";

const router = e.Router()

router.get("/login", login)
router.post("/logout", logout)
router.get("/inicio", callback)
router.get("/session-data", verifyPortalToken, getSessionData)


export default router