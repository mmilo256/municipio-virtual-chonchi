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
import useAuthStore from "../../stores/useAuthStore"

const PermisosTransitorios = () => {

    const token = useAuthStore(state => state.token)

    // Obtener todas las solicitudes de permisos transitorios
    const [requests, setRequests] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        (async () => {
            try {
                const data = await fetchRequestsByProcedure(PROCEDURES_ID.permisosTransitorios, token)
                // Cambiar a estado 'en revision' si el estado actual es 'pendiente'
                const handleAction = async (request) => {
                    if (request.estado === "pendiente") {
                        await updateRequestStatus(request.id, "en revision")
                    }
                    navigate(`${request.id}`)
                }
                // Formatear datos
                const formattedData = data.map(request => ({
                    id: request.id, // Cambiar por n° de folio
                    name: `${request.usuario.nombres} ${request.usuario.apellidos}`,
                    procedure: request.tramite.titulo,
                    createdAt: formatDate(request.createdAt, 1),
                    status: <StatusTag status={request.estado} />,
                    action2: <button onClick={() => { handleAction(request) }} className="text-blue-500 underline">Revisar</button>
                }))
                setRequests(formattedData)
            } catch (error) {
                console.log(error)
            }
        })()
    }, [token, navigate])

    return (
        <div>
            <Routes>
                <Route index element={<Solicitudes requests={requests} />} />
                <Route path="/:id" element={<DetallesSolicitud />} />
                <Route path="/:id/documentos-asociados" element={<FormularioDocumentoAsociado />} />
                <Route path="/:id/aprobar-solicitud" element={<FormularioDecretoPT />} />
                <Route path="/:id/subir-decreto-firmado" element={<SubirDecretoFirmadoPT />} />
            </Routes>
        </div>
    )
}

export default PermisosTransitorios