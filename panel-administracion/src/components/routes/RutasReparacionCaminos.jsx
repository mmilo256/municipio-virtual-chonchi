import { Route, Routes } from "react-router-dom"
import FormularioDecretoPT from "../pages/permisos-transitorios/FormularioDecretoPT"
import SubirDecretoFirmadoPT from "../pages/permisos-transitorios/SubirDecretoFirmadoPT"
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
                <Route path="/:id/aprobar-solicitud" element={<FormularioDecretoPT />} />
                <Route path="/:id/subir-decreto-firmado" element={<SubirDecretoFirmadoPT />} />
            </Routes>
        </div>
    )
}

export default RutasReparacionCaminos