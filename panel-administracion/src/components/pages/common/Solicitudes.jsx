import { useEffect, useState } from "react"
import BaseTable from "../../ui/BaseTable"
import { fetchRequestsByProcedure } from "../../../services/requestsServices"
import StatusTag from "../../ui/StatusTag"
import { formatDate } from "../../../utils/format"
import { Link } from "react-router-dom"

const Solicitudes = ({ title, tramiteId }) => {

    const [requests, setRequests] = useState([])

    useEffect(() => {
        (async () => {
            const data = await fetchRequestsByProcedure(tramiteId)
            const formattedData = data?.map(e => ({
                id: e.id,
                usuario: `${e.usuario.nombres} ${e.usuario.apellidos}`,
                rut: e.usuario.run,
                createdAt: formatDate(e.createdAt, "DD MMM YYYY, HH:mm"),
                estado: <StatusTag status={e.estado} />,
                acciones: <Link to={`${e.id}`} className="text-blue-500 hover:underline w-full">Revisar</Link>
            }))
            setRequests(formattedData)
        })()
    }, [tramiteId])

    const columns = [
        "#", "Nombre ciudadano", "RUT", "Fecha de solicitud", "Estado", "Acciones"
    ]

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">{title}</h1>
            {requests.length === 0
                ? <p>No hay solicitudes pendientes</p>
                : <BaseTable data={requests} columns={columns} />}
        </div>
    )
}

export default Solicitudes