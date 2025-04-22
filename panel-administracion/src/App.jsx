import { Route, Routes } from 'react-router-dom'
import Home from './components/pages/Home'
import Login from './components/pages/Login'
import Layout from './components/layouts/Layout'
import RutasPermisosTransitorios from './components/routes/RutasPermisosTransitorios'
import Protected from './components/common/Protected'
import useAuthStore from './stores/useAuthStore'
import { useEffect } from 'react'
import { verifySession } from './services/authServices'

const App = () => {

  const { setIsAuthenticated, setSessionData } = useAuthStore()

  useEffect(() => {
    (async () => {
      const data = await verifySession()
      if (data.data) {
        setIsAuthenticated(true)
        setSessionData(data.data)
      }
    })()
  }, [setIsAuthenticated, setSessionData])

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