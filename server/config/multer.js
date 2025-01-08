import multer from "multer";
import { __dirname } from "../index.js";

// Configuración de multer
export const setUpload = (dest = 'uploads/') => {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, dest)
        },
        filename: (req, file, cb) => {
            cb(null, `${Date.now()}-${file.originalname}`)
        }
    })
    return multer({ storage })
}