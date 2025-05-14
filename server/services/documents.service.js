import Document from "../models/documentModel.js"

// Borrar un documento asociado a una solicitud
export const deleteDocumentService = async (id) => {
    try {
        await Document.destroy({ where: { id } })
    } catch (error) {
        console.log(error)
        return null
    }
}