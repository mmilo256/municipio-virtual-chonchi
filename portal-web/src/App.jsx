import { useEffect } from 'react';
import useAuthStore from './stores/useAuthStore';
import { verifySession } from './services/auth.service';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import Requests from './pages/Requests';
import RequestTracking from './pages/RequestTracking';
import ProcedureDetails from './pages/ProcedureDetails';
import Login2 from './pages/Login2';
import FormularioTramite from './formularios/FormularioTramite';
import SolicitudEnviada from './formularios/SolicitudEnviada';
import CorregirSolicitud from './pages/CorregirSolicitud';
import NotFound from './pages/NotFound';
import LoadingOverlay from './components/ui/LoadingOverlay';

function App() {
  const { setIsAuthenticated, setSessionData } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [startupError, setStartupError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const data = await verifySession();
        if (data?.payload) {
          setIsAuthenticated(true);
          setSessionData(data.payload);
        } else {
          setIsAuthenticated(false);
          setSessionData({});
        }
      } catch {
        setStartupError(true);
      } finally {
        setLoading(false);
      }
    })();
  }, [setIsAuthenticated, setSessionData]);

  if (loading) {
    return <LoadingOverlay show text="Conectando con el municipio..." />;
  }

  if (startupError) {
    return (
      <main className="min-h-dvh flex items-center justify-center px-6 text-center">
        <div>
          <h1 className="text-2xl font-medium">No pudimos conectar con el servidor</h1>
          <p className="mt-2 text-slate-600">Comprueba tu conexión e inténtalo nuevamente.</p>
          <button className="mt-5 rounded bg-secondary px-4 py-2 text-white" onClick={() => location.reload()}>
            Reintentar
          </button>
        </div>
      </main>
    );
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
          path="/solicitudes/:codigo/corregir-solicitud"
          element={
            <PrivateRoute>
              <CorregirSolicitud />
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

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
