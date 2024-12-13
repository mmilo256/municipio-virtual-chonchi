import { Route, Routes } from "react-router-dom"
import Login from "./components/login/Login"
import PrivateRoute from "./components/PrivateRoute"
import Home from "./components/home/Home"
import PermisosTransitorios from "./components/permisos-transitorios/PermisosTransitorios"
import FileInput from "./components/ui/FileInput"

function App() {

  return (
    < main className="font-roboto " >
      <Routes>
        <Route index element={<Login />} />
        <Route path="/inicio" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/permisos-transitorios/*" element={<PrivateRoute><PermisosTransitorios /></PrivateRoute>} />
        <Route path="/file-input" element={<FileInput />} />
      </Routes>
    </main >

  )
}

export default App
