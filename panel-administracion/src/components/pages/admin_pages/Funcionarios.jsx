import { useEffect, useState } from 'react';
import Breadcrumbs from '../../ui/Breadcrumbs';
import { obtenerFuncionarios } from '../../../services/funcionarios.service';
import BaseTable from '../../ui/BaseTable';
import FuncionariosActions from './FuncionariosActions';
import Button from '../../ui/Button';
import { useNavigate } from 'react-router-dom';

const Funcionarios = () => {
  const [loading, setLoading] = useState(false);
  const [funcionarios, setFuncionarios] = useState([]);

  const breadcrumbs = [{ label: 'Funcionarios', href: '/funcionarios' }];

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const response = await obtenerFuncionarios();
        const formattedData = response.data.map((fun) => ({
          rut: fun.run,
          nombres: fun.nombres,
          apellidos: fun.apellidos,
          usuario: fun.username,
          email: fun.email,
          rol: fun.rol,
          activo: fun.activo ? (
            <span className="bg-green-200 text-green-800 py-0.5 px-2 text-xs rounded-full">
              Activo
            </span>
          ) : (
            <span className="bg-red-200 text-red-800 py-0.5 px-2 text-xs rounded-full">
              Inactivo
            </span>
          ),
          acciones: <FuncionariosActions id={fun.id} />,
        }));
        setFuncionarios(formattedData);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const columns = ['RUT', 'Nombres', 'Apellidos', 'Usuario', 'Email', 'Rol', 'Activo', 'Acciones'];

  const navigate = useNavigate();

  const agregarFuncionario = () => {
    navigate('agregar');
  };

  return (
    <div className="mb-4">
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <h1 className="text-2xl font-bold my-4">Administrar funcionarios</h1>
      <div className="mb-2">
        <Button onClick={agregarFuncionario} variant="secondary" text="Agregar funcionario" />
      </div>
      {/* <TableFilters
        currentFilters={currentFilters}
        setCurrentFilters={setCurrentFilters}
        setCurrentPage={setCurrentPage}
      /> */}

      {!loading ? (
        funcionarios.length === 0 ? (
          <p>No hay funcionarios registrados</p>
        ) : (
          <>
            <BaseTable data={funcionarios} columns={columns} />
            {/* <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
            /> */}
          </>
        )
      ) : (
        <p>Cargando funcionarios...</p>
      )}
    </div>
  );
};

export default Funcionarios;
