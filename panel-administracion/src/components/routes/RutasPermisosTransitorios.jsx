import { Route, Routes } from "react-router-dom"
import Solicitudes from "../pages/common/Solicitudes"
import { PROCEDURES_ID } from "../../constants/constants"
import IndexPermisosTransitorios from "../tramites/permisos-transitorios/IndexPermisosTransitorios"
import FormularioSubirDocumento from "../tramites/FormularioSubirDocumento"
import GenerarDecretoPermisosTransitorios from "../tramites/permisos-transitorios/GenerarDecretoPermisosTransitorios"
import EnviarDecretoPermisosTransitorios from "../tramites/permisos-transitorios/EnviarDecretoPermisosTransitorios"

const PermisosTransitorios = () => {

    const tramite = "Autorización Especial Transitoria"
    const tramiteHref = "/permisos-transitorios"

    const data = {
        tramite, tramiteHref
    }

    return (
        <div>
            <Routes>
                <Route index element={<Solicitudes tramiteId={PROCEDURES_ID.permisosTransitorios} title={"Solicitudes de Autorización Especial Transitoria"} breadcrumbsData={data} />} />
                <Route path="/:id" element={<IndexPermisosTransitorios />} />
                <Route path="/:id/subir-documento" element={<FormularioSubirDocumento titulo="Subir documento asociado a la solicitud" tipo="subido" breadcrumbsData={{ ...data, pagina: "subir-documento" }} />} />
                <Route path="/:id/generar-decreto" element={<GenerarDecretoPermisosTransitorios />} />
                <Route path="/:id/subir-decreto" element={<FormularioSubirDocumento titulo="Subir decreto firmado" estado="firmado" tipo="generado" estadoSolicitud="aprobada" breadcrumbsData={{ ...data, pagina: "subir-decreto" }} />} />
                <Route path="/:id/enviar-decreto" element={<EnviarDecretoPermisosTransitorios />} />
            </Routes>
        </div>
    )
}

export default PermisosTransitorios