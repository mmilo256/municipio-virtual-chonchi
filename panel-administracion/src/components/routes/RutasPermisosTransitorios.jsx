import { Route, Routes } from "react-router-dom"
import SubirDecretoFirmadoPT from "../pages/permisos-transitorios/SubirDecretoFirmadoPT"
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
                <Route path="/:id/subir-documento" element={<FormularioSubirDocumento />} />
                <Route path="/:id/generar-decreto" element={<GenerarDecretoPermisosTransitorios />} />
                <Route path="/:id/subir-decreto-firmado" element={<SubirDecretoFirmadoPT />} />
            </Routes>
        </div>
    )
}

export default PermisosTransitorios