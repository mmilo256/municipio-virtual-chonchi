import { useEffect } from 'react';
import useAuthStore from './stores/useAuthStore';
import { verifySession } from './services/auth.service';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
// import { PROCEDURES_ID } from './config';
// import Login from './pages/Login';
import Home from './pages/Home';
import Requests from './pages/Requests';
import RequestTracking from './pages/RequestTracking';
import ProcedureDetails from './pages/ProcedureDetails';
import Login2 from './pages/Login2';
import FormularioTramite from './formularios/FormularioTramite';
import SolicitudEnviada from './formularios/SolicitudEnviada';

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
        <Route index element={<Login2 />} />
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
          path="/solicitudes/:codigo"
          element={
            <PrivateRoute>
              <RequestTracking />
            </PrivateRoute>
          }
        />

        <Route
          path="/:slug"
          element={
            <PrivateRoute>
              <ProcedureDetails />
            </PrivateRoute>
          }
        />

        <Route
          path="/:slug/formulario"
          element={
            <PrivateRoute>
              <FormularioTramite />
            </PrivateRoute>
          }
        />

        <Route
          path="/:slug/enviado"
          element={
            <PrivateRoute>
              <SolicitudEnviada />
            </PrivateRoute>
          }
        />

        {/* --------------------------TRÁMITES-------------------------- */}

        {/* <Route
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
        <Route
          path="/:id/audiencias-alcalde/formulario"
          element={
            <PrivateRoute>
              <AudienciasAlcaldeForm />
            </PrivateRoute>
          }
        /> */}
      </Routes>
    </div>
  );
}

export default App;
