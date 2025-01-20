import { Route, Routes, useNavigate } from "react-router-dom"
import FormularioDecretoPT from "../pages/permisos-transitorios/FormularioDecretoPT"
import SubirDecretoFirmadoPT from "../pages/permisos-transitorios/SubirDecretoFirmadoPT"
import DetallesSolicitud from "../pages/common/DetallesSolicitud"
import FormularioDocumentoAsociado from "../pages/common/FormularioDocumentoAsociado"
import Solicitudes from "../pages/common/Solicitudes"
import { useEffect, useState } from "react"
import { fetchRequestsByProcedure, updateRequestStatus } from "../../services/requestsServices"
import { PROCEDURES_ID } from "../../constants/constants"
import { formatDate } from "../../utils/format"
import StatusTag from "../ui/StatusTag"

const PermisosTransitorios = () => {

    // Obtener todas las solicitudes de permisos transitorios
    const [requests, setRequests] = useState([])

    const navigate = useNavigate()

    // Cambiar a estado 'en revision' si el estado actual es 'pendiente'
    const handleAction = async (request) => {
        if (request.estado === "pendiente") {
            await updateRequestStatus(request.id, "en revision")
        }
        navigate(`${request.id}`)
    }

    // Formatear datos
    const formattedData = requests.map(request => ({
        id: request.id, // Cambiar por n° de folio
        name: `${request.usuario.nombres} ${request.usuario.apellidos}`,
        procedure: request.tramite.titulo,
        createdAt: formatDate(request.createdAt, 1),
        status: <StatusTag status={request.estado} />,
        action2: <button onClick={() => { handleAction(request) }} className="text-blue-500 underline">Revisar</button>
    }))

    useEffect(() => {
        (async () => {
            const data = await fetchRequestsByProcedure(PROCEDURES_ID.permisosTransitorios)
            setRequests(data)
        })()
    }, [])

    return (
        <div>
            <Routes>
                <Route index element={<Solicitudes requests={formattedData} />} />
                <Route path="/:id" element={<DetallesSolicitud />} />
                <Route path="/:id/documentos-asociados" element={<FormularioDocumentoAsociado />} />
                <Route path="/:id/aprobar-solicitud" element={<FormularioDecretoPT />} />
                <Route path="/:id/subir-decreto-firmado" element={<SubirDecretoFirmadoPT />} />
            </Routes>
        </div>
    )
}

export default PermisosTransitorios