import Document from "../models/documentModel.js"
import fs from 'fs/promises'
import path from 'path'

// Borrar un documento asociado a una solicitud
export const deleteDocumentService = async (id) => {
    try {
        const document = await Document.findByPk(id)
        if (!document) {
            throw new Error("No se encontró el documento")
        }

        // Obtener ruta absoluta del documento
        const documentPath = path.resolve(document.ruta)

        // Borrar documento del servidor
        await fs.unlink(documentPath)

        // Borrar registro de la base de datos
        await Document.destroy({ where: { id } })
    } catch (error) {
        throw new Error("No se pudo borrar el documento")
    }
}

export const downloadDocumentService = async (id) => {
    try {
        const document = await Document.findByPk(id)
        if (!document) {
            throw new Error("No se encontró el documento")
        }
        // Obtener ruta absoluta del documento
        const documentPath = path.resolve(document.ruta)
        return { path: documentPath, name: document.originalname }
    } catch (error) {
        console.log(error)
        throw new Error("Error al descargar el documento")
    }
}