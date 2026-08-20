import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Layout from './components/layouts/Layout';
import Protected from './components/common/Protected';
import useAuthStore from './stores/useAuthStore';
import { useEffect, useState } from 'react';
import { verifySession } from './services/authServices';
import { obtenerTramites } from './services/tramites.service';
import RutasGestionFuncionarios from './components/routes/RutasGestionFuncionarios';
import RutasGestionTramites from './components/routes/RutasGestionTramites';
import RutasGestionFormularios from './components/routes/RutasGestionFormularios';
import Solicitudes from './components/pages/Solicitudes';
import DetalleSolicitud from './components/pages/DetalleSolicitud';
import AprobarSolicitud from './components/pages/AprobarSolicitud';
import SubirDocumento from './components/pages/SubirDocumento';
import RechazarSolicitud from './components/pages/RechazarSolicitud';
import SolicitarCorreccion from './components/pages/SolicitarCorreccion';
import AgregarSolicitudFisica from './components/pages/AgregarSolicitudFisica';
import NotFound from './components/pages/NotFound';
import LoadingOverlay from './components/ui/LoadingOverlay';

const App = () => {
  const { setIsAuthenticated, setSessionData, sessionData } = useAuthStore();
  const [authLoading, setAuthLoading] = useState(true);
  const [proceduresLoading, setProceduresLoading] = useState(true);

  const [procedures, setProcedures] = useState([]);

  // Obtener los trámites según los permisos del usuario
  useEffect(() => {
    (async () => {
      setProceduresLoading(true);
      try {
        const data = await obtenerTramites();
        setProcedures(data);
      } catch (e) {
        console.log(e);
      }
      setProceduresLoading(false);
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
        setIsAuthenticated(false);
        setSessionData({});
      }
      setAuthLoading(false);
    })();
  }, [setIsAuthenticated, setSessionData]);

  if (authLoading) {
    return <LoadingOverlay show text="Verificando sesión..." />;
  }

  return (
    <>
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
            <Route
              index
              element={<Home loading={proceduresLoading} procedures={procedures} />}
            />
            <Route path="/admin/admin" element={<Navigate to="/" replace />} />
            <Route path="/funcionarios/*" element={<RutasGestionFuncionarios />} />
            <Route path="/tramites/*" element={<RutasGestionTramites />} />
            <Route path="/formularios/*" element={<RutasGestionFormularios />} />
            {/* <Route path="/permisos-transitorios/*" element={<RutasPermisosTransitorios />} /> */}
            <Route path="/:slug" element={<Solicitudes />} />
            <Route path="/:slug/agregar-solicitud-fisica" element={<AgregarSolicitudFisica />} />
            <Route path="/:slug/:codigo" element={<DetalleSolicitud />} />
            <Route path="/:slug/:codigo/subir-documento" element={<SubirDocumento />} />
            <Route path="/:slug/:codigo/aprobar" element={<AprobarSolicitud />} />
            <Route path="/:slug/:codigo/rechazar" element={<RechazarSolicitud />} />
            <Route path="/:slug/:codigo/solicitar-correccion" element={<SolicitarCorreccion />} />
            {/* 
          <Route path="/fecha-eleccion-directorio/*" element={<RutasFechaEleccionDirectorio />} />
          <Route path="/acta-directorio/*" element={<RutasActaDirectorio />} /> */}
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
