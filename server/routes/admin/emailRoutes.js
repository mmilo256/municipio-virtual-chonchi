import e from "express";
import { sendMail } from "../../Controllers/emailController.js";

const router = e.Router()

router.post("/enviar-email", sendMail)

export default router