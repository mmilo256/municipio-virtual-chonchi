import { Route, Routes } from "react-router-dom"
import RequestsPT from "./RequestsPT"
import RequestDetailPT from "./RequestDetailPT"

const PermisosTransitorios = () => {
    return (
        <div>
            <Routes>
                <Route index element={<RequestsPT />} />
                <Route path="/:id" element={<RequestDetailPT />} />
            </Routes>
        </div>
    )
}

export default PermisosTransitorios