import { Route, Routes } from "react-router-dom"
import RequestsPT from "./RequestsPT"
import RequestDetailPT from "./RequestDetailPT"
import FormDecreto from "./FormDecreto"

const PermisosTransitorios = () => {
    return (
        <div>
            <Routes>
                <Route index element={<RequestsPT />} />
                <Route path="/:id" element={<RequestDetailPT />} />
                <Route path="/:id/aprobar-solicitud" element={<FormDecreto />} />
            </Routes>
        </div>
    )
}

export default PermisosTransitorios