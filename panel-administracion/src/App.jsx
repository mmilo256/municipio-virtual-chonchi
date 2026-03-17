import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Layout from './components/layouts/Layout';
import RutasPermisosTransitorios from './components/routes/RutasPermisosTransitorios';
import Protected from './components/common/Protected';
import useAuthStore from './stores/useAuthStore';
import { useEffect, useState } from 'react';
import { verifySession } from './services/authServices';
import RutasFechaEleccionDirectorio from './components/routes/RutasFechaEleccionDirectorio';
import RutasActaDirectorio from './components/routes/RutasActaDirectorio';
import { obtenerTramites } from './services/tramites.service';
import RutasFuncionarios from './components/routes/RutasFuncionarios';
import RutasTramites from './components/routes/RutasTramites';

const App = () => {
  const { setIsAuthenticated, setSessionData, sessionData } = useAuthStore();
  const [loading, setLoading] = useState(true);

  const [procedures, setProcedures] = useState([]);

  // Obtener los trámites según los permisos del usuario
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const data = await obtenerTramites();
        setProcedures(data);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    })();
  }, [sessionData]);

  useEffect(() => {
    (async () => {
      try {
        const data = await verifySession();
        if (data.data) {
          setIsAuthenticated(true);
          setSessionData(data.data);
        } else {
          setIsAuthenticated(false);
          setSessionData({});
        }
      } catch (e) {
        console.log(e.message);
      }
      setLoading(false);
    })();
  }, [setIsAuthenticated, setSessionData]);

  if (loading) {
    return null;
  }

  return (
    <div className="bg-white text-black min-h-dvh">
      <Routes>
        <Route path="login" element={<Login />} />
        <Route
          element={
            <Protected>
              <Layout procedures={procedures} />
            </Protected>
          }
        >
          <Route index element={<Home loading={loading} procedures={procedures} />} />
          <Route path="/admin/admin" element={<Navigate to="/" replace />} />
          <Route path="/funcionarios/*" element={<RutasFuncionarios />} />
          <Route path="/tramites/*" element={<RutasTramites />} />
          <Route path="/permisos-transitorios/*" element={<RutasPermisosTransitorios />} />
          <Route path="/fecha-eleccion-directorio/*" element={<RutasFechaEleccionDirectorio />} />
          <Route path="/acta-directorio/*" element={<RutasActaDirectorio />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
