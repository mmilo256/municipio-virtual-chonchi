import { useEffect, useState } from "react"
import BaseTable from "../../ui/BaseTable"
import { fetchRequestsByProcedure } from "../../../services/requestsServices"
import StatusTag from "../../ui/StatusTag"
import { formatDate } from "../../../utils/format"
import { Link } from "react-router-dom"
import Breadcrumbs from "../../ui/Breadcrumbs"
import Pagination from "../../ui/Pagination"
import TableFilters from "../../ui/TableFilters"

const Solicitudes = ({ title, tramiteId, breadcrumbsData }) => {

    const [currentFilters, setCurrentFilters] = useState([])

    const [requests, setRequests] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const pageSize = 15

    useEffect(() => {
        (async () => {
            const filters = currentFilters.length !== 0 ? currentFilters.join(",") : null
            const data = await fetchRequestsByProcedure(tramiteId, currentPage, pageSize, filters)
            setTotalPages(data.totalPages)
            const formattedData = data?.requests?.map(e => ({
                id: e.id,
                usuario: `${e.usuario.nombres} ${e.usuario.apellidos}`,
                rut: e.usuario.run,
                createdAt: formatDate(e.createdAt, "DD MMM YYYY, HH:mm"),
                estado: <StatusTag status={e.estado} />,
                acciones: <Link to={`${e.id}`} className="text-blue-500 hover:underline w-full">Revisar</Link>
            }))
            setRequests(formattedData)
        })()
    }, [tramiteId, currentPage, currentFilters])

    const columns = [
        "#", "Nombre ciudadano", "RUT", "Fecha de solicitud", "Estado", "Acciones"
    ]

    const breadcrumbs = [
        { label: breadcrumbsData.tramite, href: breadcrumbsData.tramiteHref }
    ]

    return (
        <div className="mb-4">
            <Breadcrumbs breadcrumbs={breadcrumbs} />
            <h1 className="text-2xl font-bold my-4">{title}</h1>
            {requests.length === 0
                ? <p>No hay solicitudes pendientes</p>
                : <>
                    <TableFilters currentFilters={currentFilters} setCurrentFilters={setCurrentFilters} setCurrentPage={setCurrentPage} />
                    <BaseTable data={requests} columns={columns} />
                    <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
                </>}
        </div>
    )
}

export default Solicitudes