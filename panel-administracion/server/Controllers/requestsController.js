import Procedure from "../Models/procedureModel.js"
import Request from "../Models/requestModel.js"
import User from "../Models/userModel.js"

export const getAllRequestsByProcedure = async (req, res) => {
    const { tramiteId } = req.query
    try {
        // Obtener todas las solicitudes
        const requests = await Request.findAll({
            attributes: ["id", "estado", "usuario_id", "createdAt", "tramite_id"],
            where: { tramite_id: tramiteId },
            include: [
                {
                    model: Procedure,
                    attributes: ["titulo"]
                },
                {
                    model: User,
                    attributes: ["nombres", "apellidos"]
                }
            ]
        })
        res.status(200).json({ requests })
    } catch (error) {
        console.log(error)
        throw new Error(`Ha ocurrido un error: ${error.message}`);

    }
}