import e from "express";
import { sendMail } from "../controllers/email.controller.js";

// Router
const router = e.Router()

router.post("/", sendMail)

export default router