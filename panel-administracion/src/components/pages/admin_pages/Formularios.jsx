import { useEffect, useState } from 'react';
import Breadcrumbs from '../../ui/Breadcrumbs';
import { obtenerFormularios } from '../../../services/formularios.service';
import BaseTable from '../../ui/BaseTable';
import FormulariosActions from './FormulariosActions';
import Button from '../../ui/Button';
import { useNavigate } from 'react-router-dom';

const Formularios = () => {
  const [loading, setLoading] = useState(false);
  const [formularios, setFormularios] = useState([]);

  const breadcrumbs = [{ label: 'Formularios', href: '/formularios' }];

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const response = await obtenerFormularios();
        const formattedData = response.data.map((fun) => ({
          titulo: fun.titulo,
          descripcion: fun.descripcion,
          activo: fun.activo ? (
            <span className="bg-green-200 text-green-800 py-0.5 px-2 text-xs rounded-full">
              Activo
            </span>
          ) : (
            <span className="bg-red-200 text-red-800 py-0.5 px-2 text-xs rounded-full">
              Inactivo
            </span>
          ),
          acciones: <FormulariosActions id={fun.id} />,
        }));
        setFormularios(formattedData);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const columns = ['Título', 'Descripción', 'Activo', 'Acciones'];

  const navigate = useNavigate();

  const agregarFormulario = () => {
    navigate('crear');
  };

  return (
    <div className="mb-4">
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <h1 className="text-2xl font-bold my-4">Administrar formularios</h1>
      <div className="mb-2">
        <Button onClick={agregarFormulario} variant="secondary" text="Agregar formulario" />
      </div>
      {/* <TableFilters
        currentFilters={currentFilters}
        setCurrentFilters={setCurrentFilters}
        setCurrentPage={setCurrentPage}
      /> */}

      {!loading ? (
        formularios.length === 0 ? (
          <p>No hay formularios registrados</p>
        ) : (
          <>
            <BaseTable data={formularios} columns={columns} />
            {/* <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
            /> */}
          </>
        )
      ) : (
        <p>Cargando formularios...</p>
      )}
    </div>
  );
};

export default Formularios;
