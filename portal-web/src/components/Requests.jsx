import { useEffect, useState } from "react"
import Container from "./ui/Container"
import Heading from "./ui/Heading"
import { fetchRequestsByRut } from "../services/requestsServices"
import BaseTable from "./ui/BaseTable"
import StatusTag from "./ui/StatusTag"
import { formatDate } from "../utils/utils"
import { Link } from "react-router-dom"

const Requests = () => {

    const user = JSON.parse(sessionStorage.getItem('session'))
    const rut = `${user.run.numero}-${user.run.DV}`

    const [requests, setRequests] = useState([])
    const [loading, setLoading] = useState(true)

    console.log(requests)

    useEffect(() => {
        (async () => {
            const data = await fetchRequestsByRut(rut)
            const formattedData = data.solicitudes.map((solicitud) => ({
                id: solicitud.id,
                tramite: solicitud.tramite.titulo,
                fecha: formatDate(solicitud.createdAt, 2),
                estado: <StatusTag status={solicitud.estado} />,
                acciones: <Link to={`${solicitud.id}`} className="text-blue-500 underline">Seguimiento</Link>
            }))
            setRequests(formattedData)
            setLoading(false)
        })()
    }, [rut])

    const table = {
        columns: ['ID', 'Trámite', 'Fecha de solicitud', 'Estado', 'Acciones'],
        data: requests
    }

    if (loading) {
        return null
    }

    return (
        <Container>
            <Heading level={2}>Solicitudes realizadas</Heading>
            <BaseTable table={table} />
        </Container>
    )
}

export default Requests