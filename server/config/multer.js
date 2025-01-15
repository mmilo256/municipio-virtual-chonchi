import multer from "multer";
import { __dirname } from "../index.js";

// Configuración de multer para el manejo de archivos subidos
export const setUpload = (dest = 'uploads/') => {
    // Configura el almacenamiento de archivos utilizando multer
    const storage = multer.diskStorage({
        // Define la carpeta de destino donde se almacenarán los archivos subidos
        destination: (req, file, cb) => {
            cb(null, dest) // 'dest' es la ruta donde se guardarán los archivos
        },
        // Define el nombre del archivo, que será único al agregar la fecha actual al nombre original
        filename: (req, file, cb) => {
            cb(null, `${Date.now()}-${file.originalname}`) // Formato: timestamp-nombreoriginal.ext
        }
    })
    // Retorna una instancia de multer configurada con el almacenamiento especificado
    return multer({ storage })
}
