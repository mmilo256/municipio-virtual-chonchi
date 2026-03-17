import { Route, Routes } from 'react-router-dom';
import Tramites from '../pages/admin_pages/Tramites';
import FormTramite from '../pages/admin_pages/FormTramite';

const RutasTramites = () => {
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

export default RutasTramites;
