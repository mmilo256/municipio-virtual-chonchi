import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { fetchRequestById } from "../../../services/requestsServices"
import AccionesPermisosTransitorios from "./AccionesPermisosTransitorios"
import DetalleSolicitud from "../DetalleSolicitud"
import RespuestasPermisosTransitorios from "./RespuestasPermisosTransitorios"
import DocsPermisosTransitorios from "./DocsPermisosTransitorios"
import DocumentosSubidos from "../DocumentosSubidos"

const IndexPermisosTransitorios = () => {

    const { id } = useParams()
    const [requestData, setRequestData] = useState({})
    const [uploadedDocs, setUploadedDocs] = useState([])

    useEffect(() => {
        (async () => {
            const response = await fetchRequestById(id)
            const formattedFormData = JSON.parse(response.respuestas)
            const formattedDocsData = JSON.parse(response.documentos)
            const data = {
                id: response.id,
                respuestas: formattedFormData,
                documentos: formattedDocsData,
                createdAt: response.createdAt,
                estado: response.estado,
                tramite: response.tramite.titulo,
                tramite_id: response.tramite_id,
                usuario_id: response.usuario_id
            }
            setRequestData(data)
        })()
    }, [id])

    return (
        <DetalleSolicitud
            actions={<AccionesPermisosTransitorios />}
            requestData={requestData}
            respuestas={<RespuestasPermisosTransitorios respuestas={requestData.respuestas} />}
            documentosForm={<DocsPermisosTransitorios docs={requestData.documentos} />}
            documentosSubidos={<DocumentosSubidos />}
        />
    )
}

export default IndexPermisosTransitorios