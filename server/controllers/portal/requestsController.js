import Request from "../../models/requestModel.js"

export const createRequest = async (req, res) => {
    try {
        const data = req.body
        const files = req.files
        const requestData = {
            estado: "pendiente",
            documentos: files.map(file => ({
                fieldname: file.fieldname,
                filename: file.filename,
                originalname: file.originalname,
                path: file.path
            })),
            ...data
        }
        await Request.create(requestData)
        res.send("Solicitud enviada exitosamente")
    } catch (error) {
        console.log(error)
        throw new Error(`Hubo un error: ${error.message}`);
    }
}