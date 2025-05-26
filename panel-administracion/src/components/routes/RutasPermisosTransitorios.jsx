import { Route, Routes } from "react-router-dom"
import Solicitudes from "../pages/common/Solicitudes"
import { PROCEDURES_ID } from "../../constants/constants"
import IndexPermisosTransitorios from "../tramites/permisos-transitorios/IndexPermisosTransitorios"
import FormularioSubirDocumento from "../tramites/FormularioSubirDocumento"
import GenerarDecretoPermisosTransitorios from "../tramites/permisos-transitorios/GenerarDecretoPermisosTransitorios"

const PermisosTransitorios = () => {

    return (
        <div>
            <Routes>
                <Route index element={<Solicitudes tramiteId={PROCEDURES_ID.permisosTransitorios} title={"Solicitudes de Autorización Especial Transitoria"} />} />
                <Route path="/:id" element={<IndexPermisosTransitorios />} />
                <Route path="/:id/subir-documento" element={<FormularioSubirDocumento titulo="Subir documento asociado a la solicitud" tipo="subido" />} />
                <Route path="/:id/generar-decreto" element={<GenerarDecretoPermisosTransitorios />} />
                <Route path="/:id/subir-decreto" element={<FormularioSubirDocumento titulo="Subir decreto firmado" estado="firmado" tipo="subido" estadoSolicitud="aprobada" />} />
            </Routes>
        </div>
    )
}

export default PermisosTransitorios