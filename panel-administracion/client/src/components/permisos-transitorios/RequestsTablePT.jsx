import { Link } from "react-router-dom"
import BaseTable from "../ui/BaseTable"
import StatusTag from '../ui/StatusTag'
const RequestsTablePT = () => {

    const tableData = {
        columns: ["ID", "Nombre del solicitante", "Trámite", "Fecha de solicitud", "Estado", ""],
        data: [
            {
                id: 351,
                name: "María López",
                procedure: "Permiso transitorio",
                createdAt: "04/08/2024 13:34",
                status: <StatusTag status="pendiente" />,
                action: <Link to="1" className="text-blue-500 underline" href="#">Revisar</Link>
            }, {
                id: 382,
                name: "Juan López",
                procedure: "Permiso transitorio",
                createdAt: "04/08/2024 13:34",
                status: <StatusTag status="en revision" />,
                action: <Link to="1" className="text-blue-500 underline" href="#">Revisar</Link>
            }, {
                id: 472,
                name: "Juan López",
                procedure: "Permiso transitorio",
                createdAt: "04/08/2024 13:34",
                status: <StatusTag status="rechazada" />,
                action: <Link to="1" className="text-blue-500 underline" href="#">Revisar</Link>
            }, {
                id: 382,
                name: "Juan López",
                procedure: "Permiso transitorio",
                createdAt: "04/08/2024 13:34",
                status: <StatusTag status="aprobada" />,
                action: <Link to="1" className="text-blue-500 underline" href="#">Revisar</Link>
            }, {
                id: 382,
                name: "Juan López",
                procedure: "Permiso transitorio",
                createdAt: "04/08/2024 13:34",
                status: <StatusTag status="finalizada" />,
                action: <Link to="1" className="text-blue-500 underline" href="#">Revisar</Link>
            }
        ]
    }

    return (
        <BaseTable table={tableData} />
    )
}

export default RequestsTablePT