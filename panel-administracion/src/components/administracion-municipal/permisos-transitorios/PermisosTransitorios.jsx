import { Route, Routes } from "react-router-dom"
import RequestsPT from "./RequestsPT"
import RequestDetailPT from "./RequestDetailPT"
import FormDecreto from "./FormDecreto"
import SubirDecretoFirmado from "./SubirDecretoFirmado"

const PermisosTransitorios = () => {
    return (
        <div>
            <Routes>
                <Route index element={<RequestsPT />} />
                <Route path="/:id" element={<RequestDetailPT />} />
                <Route path="/:id/aprobar-solicitud" element={<FormDecreto />} />
                <Route path="/:id/subir-decreto-firmado" element={<SubirDecretoFirmado />} />
            </Routes>
        </div>
    )
}

export default PermisosTransitorios