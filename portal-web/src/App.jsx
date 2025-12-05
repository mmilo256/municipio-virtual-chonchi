import { useEffect } from 'react';
import useAuthStore from './stores/useAuthStore';
import { verifySession } from './services/auth.service';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
// import { PROCEDURES_ID } from './config';
import Login from './pages/Login';
import Home from './pages/Home';
import Requests from './pages/Requests';
import RequestTracking from './pages/RequestTracking';
import ProcedureDetails from './pages/ProcedureDetails';
import PermisosTransitoriosForm from './pages/tramites/PermisosTransitoriosForm';
import FechaEleccionDirectorioForm from './pages/tramites/FechaEleccionDirectorioForm';
import ActaDirectorioForm from './pages/tramites/ActaDirectorioForm';

function App() {
  const { setIsAuthenticated, setSessionData } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const data = await verifySession();
      if (data.payload) {
        setIsAuthenticated(true);
        setSessionData(data.payload);
      }
      setLoading(false);
    })();
  }, [setIsAuthenticated, setSessionData]);

  if (loading) {
    return null;
  }

  return (
    <div className="font-roboto bg-slate-50">
      <Routes>
        <Route index element={<Login />} />
        <Route
          path="/inicio"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/solicitudes"
          element={
            <PrivateRoute>
              <Requests />
            </PrivateRoute>
          }
        />
        <Route
          path="/solicitudes/:slug/:id"
          element={
            <PrivateRoute>
              <RequestTracking />
            </PrivateRoute>
          }
        />

        <Route
          path="/:id/:slug"
          element={
            <PrivateRoute>
              <ProcedureDetails />
            </PrivateRoute>
          }
        />

        {/* --------------------------TRÁMITES-------------------------- */}

        <Route
          path="/:id/permisos-transitorios/formulario"
          element={
            <PrivateRoute>
              <PermisosTransitoriosForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/:id/fecha-eleccion-directorio/formulario"
          element={
            <PrivateRoute>
              <FechaEleccionDirectorioForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/:id/acta-directorio/formulario"
          element={
            <PrivateRoute>
              <ActaDirectorioForm />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
