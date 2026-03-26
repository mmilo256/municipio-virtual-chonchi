import { Route, Routes } from 'react-router-dom';
import FormTramite from '../pages/admin_pages/FormTramite';
import Formularios from '../pages/admin_pages/Formularios';
import FormFormulario from '../pages/admin_pages/FormFormulario';
import FormAgregarPasosFormulario from '../pages/admin_pages/FormAgregarPasosFormulario';
import FormEditarPasosFormulario from '../pages/admin_pages/FormEditarPasosFormulario';

const RutasGestionFormularios = () => {
  return (
    <div>
      <Routes>
        <Route index element={<Formularios />} />
        <Route path="/crear" element={<FormFormulario />} />
        <Route path="/:id/editar" element={<FormFormulario />} />
        <Route path="/:id/pasos" element={<FormAgregarPasosFormulario />} />
        <Route path="/:id/pasos/editar" element={<FormEditarPasosFormulario />} />
        <Route path="/:formularioId/pasos/:pasoId/campos" element={<FormTramite />} />
      </Routes>
    </div>
  );
};

export default RutasGestionFormularios;
