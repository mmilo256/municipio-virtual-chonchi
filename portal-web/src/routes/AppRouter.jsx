import { Route, Routes } from "react-router-dom"
import Login from "../components/login/Login"
import PrivateRoute from "../components/PrivateRoute"
import Home from "../components/home/Home"
import Requests from "../components/Requests"
import RequestTracking from "../components/RequestTracking"
import ProcedureDetails from "../components/ui/ProcedureDetails"
import FormPermisosTransitorios from "../forms/permisos-transitorios/FormPermisosTransitorios"
import { PROCEDURES_ID } from "../constants/constants"

const AppRouter = () => {
    return (
        <div>
            <Routes>
                <Route index element={<Login />} />
                <Route path="/inicio" element={<PrivateRoute><Home /></PrivateRoute>} />
                <Route path="/solicitudes" element={<PrivateRoute><Requests /></PrivateRoute>} />
                <Route path="/solicitudes/:id" element={<PrivateRoute><RequestTracking /></PrivateRoute>} />

                <Route path="/permisos-transitorios" element={<PrivateRoute><ProcedureDetails id={PROCEDURES_ID.permisosTransitorios} /></PrivateRoute>} />
                <Route path="/permisos-transitorios/formulario" element={<PrivateRoute><FormPermisosTransitorios /></PrivateRoute>} />
            </Routes>
        </div>
    )
}

export default AppRouter