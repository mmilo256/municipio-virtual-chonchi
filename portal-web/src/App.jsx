import { Route, Routes } from "react-router-dom"
import Login from "./components/login/Login"
import PrivateRoute from "./components/PrivateRoute"
import Home from "./components/home/Home"
import PermisosTransitorios from "./components/permisos-transitorios/PermisosTransitorios"
import Requests from "./components/Requests"
import RequestTracking from "./components/RequestTracking"
import { useEffect, useState } from "react"
import useAuthStore from "./stores/useAuthStore"
import WizardFormContainer from "./components/wizard-form/WizardFormContainer"
import FormPermisosTransitorios from "./forms/permisos-transitorios/FormPermisosTransitorios"
/* import { useEffect } from "react"
import { fetchSessionData } from "./services/authServices"
import useAuthStore from "./stores/useAuthStore"
import { useState } from "react" */

function App() {

  const { checkAuth } = useAuthStore()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async () => {
      try {
        await checkAuth()
      } catch (error) {
        console.error(error)
      }
      setLoading(false)
    })()
  }, [checkAuth])

  if (loading) {
    return null
  }

  /* const { loginUser, checkAuth, logoutUser } = useAuthStore() */

  /* useEffect(() => {
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
  }, [loginUser, checkAuth, logoutUser]) */

  return (
    < main className="font-roboto " >
      <Routes>
        <Route index element={<Login />} />
        <Route path="/inicio" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/solicitudes" element={<PrivateRoute><Requests /></PrivateRoute>} />
        <Route path="/solicitudes/:id" element={<PrivateRoute><RequestTracking /></PrivateRoute>} />
        <Route path="/permisos-transitorios/*" element={<PrivateRoute><PermisosTransitorios /></PrivateRoute>} />
        <Route path="/wizard" element={<PrivateRoute><WizardFormContainer><FormPermisosTransitorios /></WizardFormContainer></PrivateRoute>} />
      </Routes>
    </main >

  )
}

export default App
