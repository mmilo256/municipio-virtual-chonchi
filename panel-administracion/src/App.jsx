import { Route, Routes } from 'react-router-dom'
import Home from './components/home/Home'
import Login from './components/login/Login'
import Layout from './components/layouts/Layout'
import PermisosTransitorios from './components/permisos-transitorios/PermisosTransitorios'

const App = () => {
  return (
    <div className='bg-white text-black min-h-dvh'>
      <Routes>
        <Route path='login' element={<Login />} />
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/permisos-transitorios/*' element={<PermisosTransitorios />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App