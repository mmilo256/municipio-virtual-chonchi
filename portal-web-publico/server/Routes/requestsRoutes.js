import e from "express";
import { createRequest } from "../Controllers/requestsController.js";
import { upload } from "../index.js";

const router = e.Router()

router.post("/", createRequest)

export default router