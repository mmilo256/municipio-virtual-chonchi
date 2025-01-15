import { sequelize } from "../../config/db/config.js"
import Procedure from "../../models/procedureModel.js"
import Request from "../../models/requestModel.js"
import RequestsStatusLog from "../../models/RequestsStatusLogModel.js"
import User from "../../models/userModel.js"


// Actualizar el estado de una solicitud
export const updateRequestStatus = async (req, res) => {
    const { id } = req.params // Obtiene el ID de la solicitud desde los parámetros de la URL
    const { estado } = req.body // Obtiene el nuevo estado desde el cuerpo de la solicitud
    const t = await sequelize.transaction() // Inicia una transacción en la base de datos
    try {
        // Actualiza el estado de la solicitud en la base de datos
        await Request.update({ estado }, { where: { id }, transaction: t })

        // Crea un registro en el historial de estados de la solicitud
        await RequestsStatusLog.create({ solicitud_id: id, estado }, { transaction: t })

        await t.commit() // Confirma la transacción
        res.status(200).json({ message: "Estado de la solicitud actualizado" }) // Responde con éxito
    } catch (error) {
        await t.rollback() // Si ocurre un error, revierte la transacción
        console.log(error) // Imprime el error para fines de depuración
        throw new Error(`Ha ocurrido un error: ${error.message}`); // Lanza un error con el mensaje
    }
}

// Obtener solicitud por ID
export const getRequestById = async (req, res) => {
    const { id } = req.params // Obtiene el ID de la solicitud desde los parámetros de la URL
    try {
        // Busca la solicitud por su ID e incluye la información relacionada con el trámite y el usuario
        const request = await Request.findByPk(id, {
            include: [
                {
                    model: Procedure, // Incluye los datos del procedimiento
                    attributes: ["titulo"] // Solo se selecciona el título del procedimiento
                },
                {
                    model: User, // Incluye los datos del usuario asociado a la solicitud
                    attributes: ["nombres", "apellidos", "run"] // Solo se seleccionan los nombres, apellidos y RUN del usuario
                }
            ]
        })
        res.status(200).json({ request }) // Devuelve la solicitud encontrada en la respuesta
    } catch (error) {
        console.log(error) // Imprime el error para fines de depuración
        throw new Error(`Ha ocurrido un error: ${error.message}`); // Lanza un error con el mensaje
    }
}

// Obtener todas las solicitudes de un trámite
export const getAllRequestsByProcedure = async (req, res) => {
    const { tramiteId } = req.query // Obtiene el ID del trámite desde los parámetros de la consulta
    try {
        // Obtiene todas las solicitudes relacionadas con el trámite indicado
        const requests = await Request.findAll({
            attributes: ["id", "estado", "usuario_id", "createdAt", "tramite_id"], // Selecciona los atributos de la solicitud
            where: { tramite_id: tramiteId }, // Filtra las solicitudes por ID de trámite
            include: [
                {
                    model: Procedure, // Incluye el procedimiento relacionado
                    attributes: ["titulo"] // Solo selecciona el título del procedimiento
                },
                {
                    model: User, // Incluye el usuario asociado a la solicitud
                    attributes: ["nombres", "apellidos"] // Solo selecciona los nombres y apellidos del usuario
                }
            ],
            order: [["createdAt", "DESC"]] // Ordena las solicitudes por fecha de creación en orden descendente
        })
        res.status(200).json({ requests }) // Devuelve las solicitudes encontradas en la respuesta
    } catch (error) {
        console.log(error) // Imprime el error para fines de depuración
        throw new Error(`Ha ocurrido un error: ${error.message}`); // Lanza un error con el mensaje
    }
}
