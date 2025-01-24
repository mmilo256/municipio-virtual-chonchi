import { Route, Routes } from 'react-router-dom'
import Home from './components/pages/Home'
import Login from './components/pages/Login'
import Layout from './components/layouts/Layout'
import RutasPermisosTransitorios from './components/routes/RutasPermisosTransitorios'
import Protected from './components/common/Protected'
import useAuthStore from './stores/useAuthStore'
import { useEffect } from 'react'

const App = () => {

  const checkAuth = useAuthStore(state => state.checkAuth)
  const { sessionExpired, logoutUser } = useAuthStore(state => state)

  // Comprobar si el usuario ha iniciado sesión
  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  // Comprobar si la sesión ha expirado 
  useEffect(() => {
    if (sessionExpired) {
      alert("La sesión ha expirado")
      setTimeout(() => {
        logoutUser()
      }, 1000);
    }
  }, [sessionExpired, logoutUser])

  return (
    <div className='bg-white text-black min-h-dvh'>
      <Routes>
        <Route path='login' element={<Login />} />
        <Route element={<Protected><Layout /></Protected>}>
          <Route index element={<Home />} />
          <Route path='/permisos-transitorios/*' element={<RutasPermisosTransitorios />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App