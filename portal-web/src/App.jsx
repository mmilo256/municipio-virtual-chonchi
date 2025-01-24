import { Route, Routes } from "react-router-dom"
import Login from "./components/login/Login"
import PrivateRoute from "./components/PrivateRoute"
import Home from "./components/home/Home"
import PermisosTransitorios from "./components/permisos-transitorios/PermisosTransitorios"
import Requests from "./components/Requests"
import RequestTracking from "./components/RequestTracking"
import useAuthStore from "./stores/useAuthStore.js"
import { useEffect } from "react"

function App() {

  const checkAuth = useAuthStore(state => state.checkAuth)
  const { sessionExpired, logoutUser } = useAuthStore(state => state)

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  return (
    < main className="font-roboto " >
      <Routes>
        <Route index element={<Login />} />
        <Route path="/inicio" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/solicitudes" element={<PrivateRoute><Requests /></PrivateRoute>} />
        <Route path="/solicitudes/:id" element={<PrivateRoute><RequestTracking /></PrivateRoute>} />
        <Route path="/permisos-transitorios/*" element={<PrivateRoute><PermisosTransitorios /></PrivateRoute>} />
      </Routes>
    </main >

  )
}

export default App
