import { Route, Routes } from 'react-router-dom';
import FormTramite from '../pages/admin_pages/FormTramite';
import Formularios from '../pages/admin_pages/Formularios';

const RutasGestionFormularios = () => {
  return (
    <div>
      <Routes>
        <Route index element={<Formularios />} />
        <Route path="/agregar" element={<FormTramite />} />
        <Route path="/:id/editar" element={<FormTramite />} />
      </Routes>
    </div>
  );
};

export default RutasGestionFormularios;
