import { Route, Routes } from "react-router-dom"
import RequestsPT from "./RequestsPT"
import FormDecreto from "./FormDecreto"
import SubirDecretoFirmado from "./SubirDecretoFirmado"
import DetallesSolicitud from "../../ui/DetallesSolicitud"

const PermisosTransitorios = () => {
    return (
        <div>
            <Routes>
                <Route index element={<RequestsPT />} />
                <Route path="/:id" element={<DetallesSolicitud />} />
                <Route path="/:id/aprobar-solicitud" element={<FormDecreto />} />
                <Route path="/:id/subir-decreto-firmado" element={<SubirDecretoFirmado />} />
            </Routes>
        </div>
    )
}

export default PermisosTransitorios