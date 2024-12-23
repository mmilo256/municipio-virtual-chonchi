// Librería para generar un documento a partir de una plantilla
import Docxtemplater from "docxtemplater";
// Librería para cargar los archivos docx/pptx/xlsx en memoria
import PizZip from "pizzip";

// Utilizades del sistema de archivos integradas
import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

// Obtener __dirname en módulos ES6
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const generateAct = (data) => {
    // 1. Cargar el docx como contenido binario
    const content = readFileSync(
        resolve(__dirname, "../templates/decreto_permisoTransitorio.docx"),
        "binary"
    );

    // 2. Descomprimir el docx en memoria (recordar que los .docx son archivos .rar que contienen archivos .xml)
    const zip = new PizZip(content);

    // 3. Crear instancia del documento
    const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
    });

    // 4. Renderizar el documento ingresando los datos dinámicos
    doc.render(data);

    // 5. Obtener el documento como un .zip y generarlo como un buffer de node.js
    const buf = doc.getZip().generate({
        type: "nodebuffer",
        // Compression: DEFLATE adds a compression step.
        // For a 50MB document, expect 500ms additional CPU time.
        compression: "DEFLATE"
    });

    // 6. Formatear datos del archivo
    const filename = `${Date.now()}_DECRETO_PT.docx`
    const fileData = {
        filename,
        path: `decretos\\${filename}`
    }

    console.log(__dirname)

    // 6. Convertir el buffer en un archivo
    writeFileSync(resolve(resolve(__dirname, '../decretos'), fileData.filename), buf);
    // Instead of writing it to a file, you could also
    // let the user download it, store it in a database,
    // on AWS S3, ...

    return fileData
}
