import { useParams } from "react-router-dom"  // Para obtener parámetros de la URL (como el ID de la solicitud)
import StatusTracker from "./ui/StatusTracker"  // Componente que muestra el seguimiento de los estados
import Heading from "./ui/Heading"  // Componente de encabezado
import Container from "./ui/Container"  // Componente contenedor para envolver el contenido
import { useEffect, useState } from "react"  // Hooks de React para efectos y estados
import { fetchDocumentosAdjuntos, fetchRequestById, fetchRequestStatusLogs } from "../services/requests.service"  // Función para obtener los logs de la solicitud
import { formatDate } from "../utils/utils"  // Función para formatear las fechas
import { SERVER_URL } from "../../../panel-administracion/src/constants/constants"
import Respuestas from "./Respuestas"
import Breadcrumbs from "./ui/Breadcrumbs"

const RequestTracking = () => {

    // Obtiene el ID de la solicitud desde los parámetros de la URL
    const { id } = useParams()
    const [requestData, setRequestData] = useState({})
    const [requestDocs, setRequestDocs] = useState([])
    const [tramiteId, setTramiteId] = useState(null)

    const breadcrumbs = [
        { label: "Solicitudes", href: "/solicitudes" },
        { label: `Solicitud #${id}`, href: `/solicitudes/${id}` }
    ]

    // Estado para almacenar los logs de la solicitud
    const [logs, setLogs] = useState([])

    // Función para definir un mensaje según el estado de la solicitud
    const setMessage = (status) => {
        let message
        switch (status) {
            case "pendiente":
                message = "Estamos esperando que un funcionario revise su solicitud."
                break;
            case "en revision":
                message = "Su solicitud está siendo revisada por un funcionario."
                break;
            case "por firmar":
                message = "Se generó su decreto y está pendiente de firma"
                break;
            case "rechazada":
                message = "Su solicitud ha sido rechazada. Por favor, revise los motivos del rechazo."
                break;
            case "aprobada":
                message = "Su solicitud ha sido aprobada y su decreto será enviado a la brevedad"
                break;
            case "finalizada":
                message = "Su solicitud ha sido completada y finalizada correctamente."
                break;
            default:
                break;
        }
        return message
    }

    // Hook useEffect que se ejecuta al cargar el componente
    useEffect(() => {
        (async () => {
            // Obtiene los logs de estado de la solicitud
            const data = await fetchRequestStatusLogs(id)
            // Formatea los datos de los logs
            const formattedData = data.map((log, index) => ({
                status: log.estado,  // Estado de la solicitud
                updated_at: formatDate(log.createdAt, 2),  // Fecha de la actualización, formateada
                message: setMessage(log.estado),  // Mensaje correspondiente al estado
                active: index === data.length - 1 ? true : false  // Marca el último log como activo
            }))
            setLogs(formattedData)  // Guarda los logs formateados en el estado
        })()
    }, [id])  // El efecto se ejecuta nuevamente si cambia el ID de la solicitud

    useEffect(() => {
        (async () => {
            const response = await fetchRequestById(id)
            setTramiteId(response?.tramite_id)
            const formattedFormData = JSON.parse(response.respuestas)
            setRequestData(formattedFormData)
        })()
    }, [id])

    useEffect(() => {
        (async () => {
            const response = await fetchDocumentosAdjuntos(id)
            const docs = response.map(doc => ({
                ruta: `${SERVER_URL}/${doc.ruta}`
            }))
            setRequestDocs(docs)
        })()
    }, [id])

    return (
        <Container>
            <Breadcrumbs breadcrumbs={breadcrumbs} />
            <Heading level={2}>Seguimiento de solicitud #{id}</Heading>  {/* Título de la página con el ID de la solicitud */}
            <div className="grid grid-cols-2 gap-4 bg-white p-4 rounded shadow">
                <StatusTracker data={logs} />  {/* Componente que muestra el seguimiento de los logs */}
                <Respuestas tramiteId={tramiteId} data={requestData} docs={requestDocs} />
            </div>
        </Container>
    )
}

export default RequestTracking
