import { useParams } from "react-router-dom"
import StatusTracker from "./ui/StatusTracker"
import Heading from "./ui/Heading"
import Container from "./ui/Container"
import { useEffect, useState } from "react"
import { fetchRequestStatusLogs } from "../services/requestsServices"
import { formatDate } from "../utils/utils"

const RequestTracking = () => {

    const { id } = useParams()

    const [logs, setLogs] = useState([])

    const setMessage = (status) => {
        let message
        switch (status) {
            case "pendiente":
                message = "Estamos esperando que un funcionario revise su solicitud."
                break;
            case "en revision":
                message = "Su solicitud está siendo revisada por un funcionario."
                break;
            case "aprobada":
                message = "Su solicitud ha sido aprobada y está lista para ser firmada."
                break;
            case "rechazada":
                message = "Su solicitud ha sido rechazada. Por favor, revise los motivos del rechazo."
                break;
            case "firmada":
                message = "Su solicitud ha sido firmada por el funcionario correspondiente."
                break;
            case "finalizada":
                message = "Su solicitud ha sido completada y finalizada correctamente."
                break;
            default:
                break;
        }
        return message
    }

    useEffect(() => {
        (async () => {
            const data = await fetchRequestStatusLogs(id)
            const formattedData = data.map((log, index) => ({
                status: log.estado,
                updated_at: formatDate(log.createdAt, 2),
                message: setMessage(log.estado),
                active: index === data.length - 1 ? true : false
            }))
            setLogs(formattedData)
        })()
    }, [id])

    return (

        <Container>
            <Heading level={2}>Seguimiento de solicitud #{id}</Heading>
            <StatusTracker data={logs} />
        </Container>

    )
}

export default RequestTracking