import { Route, Routes } from "react-router-dom"
import Login from "./components/login/Login"
import PrivateRoute from "./components/PrivateRoute"
import Home from "./components/home/Home"
import PermisosTransitorios from "./components/permisos-transitorios/PermisosTransitorios"
import Requests from "./components/Requests"
import RequestTracking from "./components/RequestTracking"
import { useEffect } from "react"
import { fetchSessionData } from "./services/authServices"
import useAuthStore from "./stores/useAuthStore"
import { useState } from "react"

function App() {

  const { loginUser, checkAuth, logoutUser } = useAuthStore()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async () => {
      await checkAuth()
      try {
        const data = await fetchSessionData()
        loginUser(data.sessionData)
      } catch (error) {
        console.log(error.message)
        logoutUser()
      } finally {
        setLoading(false)
      }
    })()
  }, [loginUser, checkAuth, logoutUser])

  if (loading) {
    return null
  }


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
