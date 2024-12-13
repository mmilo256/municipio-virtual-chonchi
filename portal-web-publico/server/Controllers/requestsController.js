import Request from "../Models/requestModel.js"

export const createRequest = async (req, res) => {
    try {
        const data = req.body
        const files = req.files
        const request = {
            estado: "pendiente",
            ...data
        }
        await Request.create(request)
        console.log({ request, files })
        res.send(files)
    } catch (error) {
        throw new Error(error.message);
    }
}