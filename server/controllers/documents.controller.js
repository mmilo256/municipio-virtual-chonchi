import { deleteDocumentService } from "../services/documents.service.js"

// Borrar un documento
export const deleteDocument = async (req, res) => {
    const { id } = req.params
    try {
        const document = await deleteDocumentService(id)
        res.status(200).json({ message: "Documento borrado exitosamente", document })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message, message: "No se pudo borrar el documento" })
    }
}