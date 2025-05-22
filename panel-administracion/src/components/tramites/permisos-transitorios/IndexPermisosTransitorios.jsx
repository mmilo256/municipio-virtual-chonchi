import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { fetchDocumentosAdjuntos, fetchDocumentosAsociados, fetchRequestById, updateRequestStatus } from "../../../services/requestsServices"
import AccionesPermisosTransitorios from "./AccionesPermisosTransitorios"
import DetalleSolicitud from "../DetalleSolicitud"
import RespuestasPermisosTransitorios from "./RespuestasPermisosTransitorios"
import DocsPermisosTransitorios from "./DocsPermisosTransitorios"
import DocumentosSubidos from "../DocumentosSubidos"
import { obtenerDecretos } from "../../../services/permisosTransitoriosServices"

const IndexPermisosTransitorios = () => {

    const { id } = useParams()
    const [requestData, setRequestData] = useState({})
    const [uploadedDocs, setUploadedDocs] = useState([])
    const [docsAdjuntos, setDocsAdjuntos] = useState([])
    const [requestStatus, setRequestStatus] = useState("")
    const [decretoSinFirma, setDecretoSinFirma] = useState({})
    const [decretoFirmado, setDecretoFirmado] = useState({})
    const [refresh, setRefresh] = useState(false)

    // Cargar los decretos si existen
    useEffect(() => {
        (async () => {
            const decretos = await obtenerDecretos(id)
            setDecretoSinFirma(decretos?.decretoSinFirma)
            setDecretoFirmado(decretos?.decretoFirmado)

        })()
    }, [id])

    // Cambiar el estado a "en revision" en caso de que se abra la solicitud por primera vez
    useEffect(() => {
        (async () => {
            if (requestStatus === "pendiente") {
                try {
                    await updateRequestStatus(id, "en revision")
                    setRequestStatus("en revision")
                } catch (error) {
                    console.log(error)
                    alert("No se pudo actualizar el estado de la solicitud")
                }
            }
        })()
    }, [id, requestStatus])

    // Cargar documentos adjuntos
    useEffect(() => {
        (async () => {
            const response = await fetchDocumentosAdjuntos(id)
            setDocsAdjuntos(response)
        })()
    }, [id])

    // Cargar documentos asociados
    useEffect(() => {
        (async () => {
            const data = await fetchDocumentosAsociados(id)
            setUploadedDocs(data)
        })()
    }, [id, refresh])

    // Cargar respuestas del formulario
    useEffect(() => {
        (async () => {
            const response = await fetchRequestById(id)
            const formattedFormData = JSON.parse(response.respuestas)
            const data = {
                id: response.id,
                respuestas: formattedFormData,
                createdAt: response.createdAt,
                estado: response.estado,
                tramite: response.tramite.titulo,
                tramite_id: response.tramite_id,
                usuario_id: response.usuario_id
            }
            setRequestStatus(data.estado)
            setRequestData(data)
        })()
    }, [id])

    return (
        <DetalleSolicitud
            status={requestStatus}
            actions={<AccionesPermisosTransitorios
                status={requestStatus}
                setStatus={setRequestStatus}
                request={requestData}
                requestId={id}
                decretos={{ decretoSinFirma, decretoFirmado }}
            />}
            requestData={requestData}
            respuestas={<RespuestasPermisosTransitorios respuestas={requestData.respuestas} />}
            documentosForm={<DocsPermisosTransitorios docs={docsAdjuntos} />}
            documentosSubidos={<DocumentosSubidos setRefresh={setRefresh} docs={uploadedDocs} />}
        />
    )
}

export default IndexPermisosTransitorios