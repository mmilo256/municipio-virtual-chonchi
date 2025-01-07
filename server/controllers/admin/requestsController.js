import Procedure from "../../models/procedureModel.js"
import Request from "../../models/requestModel.js"
import User from "../../models/userModel.js"


export const updateRequestStatus = async (req, res) => {
    const { id } = req.params
    const { estado } = req.body
    try {
        await Request.update({ estado }, { where: { id } })
        res.status(200).json({ message: "Estado de la solicitud actualizado" })
    } catch (error) {
        console.log(error)
        throw new Error(`Ha ocurrido un error: ${error.message}`);
    }
}

export const getRequestById = async (req, res) => {
    const { id } = req.params
    try {
        const request = await Request.findByPk(id, {
            include: [
                {
                    model: Procedure,
                    attributes: ["titulo"]
                },
                {
                    model: User,
                    attributes: ["nombres", "apellidos", "run"]
                }
            ]
        })
        res.status(200).json({ request })
    } catch (error) {
        console.log(error)
        throw new Error(`Ha ocurrido un error: ${error.message}`);
    }
}

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
            ],
            order: [["createdAt", "DESC"]]
        })
        res.status(200).json({ requests })
    } catch (error) {
        console.log(error)
        throw new Error(`Ha ocurrido un error: ${error.message}`);

    }
}