import { useNavigate } from "react-router-dom"
import BaseTable from "../../ui/BaseTable"
import StatusTag from '../../ui/StatusTag'
import { formatDate } from "../../../utils/format"
import { updateRequestStatus } from "../../../services/requestsServices"
const RequestsTablePT = ({ data }) => {

    const navigate = useNavigate()

    // Cambiar a estado 'en revision' si el estado actual es 'pendiente'
    const handleAction = async (request) => {
        if (request.estado === "pendiente") {
            await updateRequestStatus(request.id, "en revision")
        }
        navigate(`${request.id}`)
    }

    const formattedData = data.map(request => ({
        id: request.id, // Cambiar por n° de folio
        name: `${request.usuario.nombres} ${request.usuario.apellidos}`,
        procedure: request.tramite.titulo,
        createdAt: formatDate(request.createdAt, 1),
        status: <StatusTag status={request.estado} />,
        action2: <button onClick={() => { handleAction(request) }} className="text-blue-500 underline">Revisar</button>
    }))

    const tableData = {
        columns: ["ID", "Nombre del solicitante", "Trámite", "Fecha de solicitud", "Estado", ""],
        data: formattedData
    }

    return (
        <BaseTable table={tableData} />
    )
}

export default RequestsTablePT