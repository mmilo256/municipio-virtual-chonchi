import { Navigate, Route, Routes } from 'react-router-dom';
import Tramites from '../pages/admin_pages/Tramites';
import FormTramite from '../pages/admin_pages/FormTramite';
import useAuthStore from '../../stores/useAuthStore';
import { ROLES } from '../../constantes';

const RutasGestionTramites = () => {
  const { sessionData } = useAuthStore();

  if (sessionData.rol !== ROLES.ADMINISTRADOR) {
    return <Navigate to="../" />;
  }

  return (
    <div>
      <Routes>
        <Route index element={<Tramites />} />
        <Route path="/agregar" element={<FormTramite />} />
        <Route path="/:id/editar" element={<FormTramite />} />
      </Routes>
    </div>
  );
};

export default RutasGestionTramites;
