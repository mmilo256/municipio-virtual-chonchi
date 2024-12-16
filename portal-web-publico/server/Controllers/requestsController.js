import Request from "../Models/requestModel.js"

export const createRequest = async (req, res) => {
    try {
        const data = req.body
        const files = req.files
        const requestData = {
            estado: "pendiente",
            documentos: files,
            ...data
        }
        const request = await Request.create(requestData)
        res.send("Solicitud enviada exitosamente")
    } catch (error) {
        console.log(error)
        throw new Error(`Hubo un error: ${error.message}`);
    }
}