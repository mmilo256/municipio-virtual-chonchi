import { Link } from "react-router-dom"
import BaseTable from "../ui/BaseTable"
import StatusTag from '../ui/StatusTag'
import { formatDate } from "../../utils/format"
const RequestsTablePT = ({ data }) => {

    const formattedData = data.map(request => ({
        id: request.id, // Cambiar por n° de folio
        name: `${request.usuario.nombres} ${request.usuario.apellidos}`,
        procedure: request.tramite.titulo,
        createdAt: formatDate(request.createdAt, 1),
        status: <StatusTag status={request.estado} />,
        action: <Link to={`${request.id}`} className="text-blue-500 underline">Revisar</Link>
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