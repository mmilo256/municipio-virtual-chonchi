import { useEffect } from "react"
import useAuthStore from "./stores/useAuthStore"
import { verifySession } from "./services/auth.service"
import { useState } from "react"
import { Route, Routes } from "react-router-dom"
import Login from "./components/login/Login"
import PrivateRoute from "./components/PrivateRoute"
import Home from "./components/home/Home"
import Requests from "./components/Requests"
import RequestTracking from "./components/RequestTracking"
import ProcedureDetails from "./components/ui/ProcedureDetails"
import { PROCEDURES_ID } from "./constants/constants"
import FormPermisosTransitorios from "./forms/permisos-transitorios/FormPermisosTransitorios"
import FormReparacionCaminos from "./forms/reparacion-caminos/FormReparacionCaminos"

function App() {

  const { setIsAuthenticated, setSessionData } = useAuthStore()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async () => {
      const data = await verifySession()
      if (data.payload) {
        setIsAuthenticated(true)
        setSessionData(data.payload)
      }
      setLoading(false)
    })()
  }, [setIsAuthenticated, setSessionData])

  if (loading) {
    return null
  }

  return (
    < div className="font-roboto bg-slate-50" >
      <Routes>
        <Route index element={<Login />} />
        <Route path="/inicio" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/solicitudes" element={<PrivateRoute><Requests /></PrivateRoute>} />
        <Route path="/solicitudes/:id" element={<PrivateRoute><RequestTracking /></PrivateRoute>} />

        <Route path="/permisos-transitorios" element={<PrivateRoute><ProcedureDetails id={PROCEDURES_ID.permisosTransitorios} /></PrivateRoute>} />
        <Route path="/permisos-transitorios/formulario" element={<PrivateRoute><FormPermisosTransitorios /></PrivateRoute>} />

        <Route path="/reparacion-caminos" element={<PrivateRoute><ProcedureDetails id={PROCEDURES_ID.reparacionCaminos} /></PrivateRoute>} />
        <Route path="/reparacion-caminos/formulario" element={<PrivateRoute><FormReparacionCaminos /></PrivateRoute>} />
      </Routes>
    </div >

  )
}

export default App
