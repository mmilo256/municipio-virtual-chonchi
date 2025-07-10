import { Route, Routes } from "react-router-dom"
import FormularioDocumentoAsociado from "../pages/common/FormularioDocumentoAsociado"
import Solicitudes from "../pages/common/Solicitudes"
import { PROCEDURES_ID } from "../../constants/constants"
import IndexPermisosTransitorios from "../tramites/permisos-transitorios/IndexPermisosTransitorios"

const RutasReparacionCaminos = () => {

    return (
        <div>
            <Routes>
                <Route index element={<Solicitudes tramiteId={PROCEDURES_ID.reparacionCaminos} title={"Solicitudes de Reparación de Caminos"} />} />
                <Route path="/:id" element={<IndexPermisosTransitorios />} />
                <Route path="/:id/documentos-asociados" element={<FormularioDocumentoAsociado />} />
            </Routes>
        </div>
    )
}

export default RutasReparacionCaminos