import { Route, Routes } from 'react-router-dom'
import Home from './components/home/Home'
import Login from './components/login/Login'
import Layout from './components/layouts/Layout'
import PermisosTransitorios from './components/administracion-municipal/permisos-transitorios/PermisosTransitorios'
import Protected from './components/Protected'
import useAuthStore from './stores/useAuthStore'
import { useEffect, useState } from 'react'

const App = () => {

  const [loading, setLoading] = useState(true)

  const setAuth = useAuthStore(state => state.setAuth)
  useEffect(() => {
    const token = sessionStorage.getItem('token')
    if (token) {
      setAuth(token)
    }
    setLoading(false)
  }, [setAuth])

  if (loading) {
    return null
  }


  return (
    <div className='bg-white text-black min-h-dvh'>
      <Routes>
        <Route path='login' element={<Login />} />
        <Route element={<Protected><Layout /></Protected>}>
          <Route index element={<Home />} />
          <Route path='/permisos-transitorios/*' element={<PermisosTransitorios />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App