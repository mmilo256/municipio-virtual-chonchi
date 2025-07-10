import { Route, Routes } from "react-router-dom"
import FormularioDocumentoAsociado from "../pages/common/FormularioDocumentoAsociado"
import Solicitudes from "../pages/common/Solicitudes"
import { PROCEDURES_ID } from "../../constants/constants"
import IndexPermisosTransitorios from "../tramites/permisos-transitorios/IndexPermisosTransitorios"

const RutasReparacionCaminos = () => {

    const tramite = "Reparación de caminos"
    const tramiteHref = "/reparacion-caminos"

    const data = {
        tramite, tramiteHref
    }

    return (
        <div>
            <Routes>
                <Route index element={<Solicitudes tramiteId={PROCEDURES_ID.reparacionCaminos} title={"Solicitudes de Reparación de Caminos"} breadcrumbsData={data} />} />
                <Route path="/:id" element={<IndexPermisosTransitorios />} />
                <Route path="/:id/documentos-asociados" element={<FormularioDocumentoAsociado />} />
            </Routes>
        </div>
    )
}

export default RutasReparacionCaminos