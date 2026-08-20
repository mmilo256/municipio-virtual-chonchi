import { Navigate, Route, Routes } from 'react-router-dom';
import Funcionarios from '../pages/admin_pages/Funcionarios';
import FormFuncionario from '../pages/admin_pages/FormFuncionario';
import useAuthStore from '../../stores/useAuthStore';
import { ROLES } from '../../constantes';

const RutasGestionFuncionarios = () => {
  const { sessionData } = useAuthStore();

  if (sessionData.rol !== ROLES.ADMINISTRADOR) {
    return <Navigate to="../" />;
  }

  return (
    <div>
      <Routes>
        <Route index element={<Funcionarios />} />
        <Route path="/agregar" element={<FormFuncionario />} />
        <Route path="/:id/editar" element={<FormFuncionario />} />
      </Routes>
    </div>
  );
};

export default RutasGestionFuncionarios;
