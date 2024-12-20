import multer from "multer";
import path from 'path'
import { __dirname } from "../index.js";

// Configuración de multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

// Instanciar Multer
export const upload = multer({ storage })