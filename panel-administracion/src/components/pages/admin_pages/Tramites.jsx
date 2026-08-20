import { useEffect, useState } from 'react';
import Breadcrumbs from '../../ui/Breadcrumbs';
import Button from '../../ui/Button';
import BaseTable from '../../ui/BaseTable';
import { useNavigate } from 'react-router-dom';
import { obtenerTramites } from '../../../services/tramites.service';
import TramitesActions from './TramitesActions';

const Tramites = () => {
  // Estados
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [tramites, setTramites] = useState([]);

  const breadcrumbs = [{ label: 'Tramites', href: '/tramites' }];

  // Efectos
  useEffect(() => {
    (async () => {
      setLoading(true);
      const response = await obtenerTramites();
      const data = response.data.map((tramite) => ({
        nombre: tramite.titulo,
        slug: tramite.slug,
        direccionMunicipal: tramite.direcciones_municipale.nombre,
        activo: tramite.activo ? (
          <span className="bg-green-200 text-green-800 py-0.5 px-2 text-xs rounded-full">
            Activo
          </span>
        ) : (
          <span className="bg-red-200 text-red-800 py-0.5 px-2 text-xs rounded-full">Inactivo</span>
        ),
        acciones: <TramitesActions id={tramite.id} />,
      }));
      setTramites(data);
      setLoading(false);
    })();
  }, []);

  const columns = ['Trámite', 'Slug', 'Dirección Municipal', 'Activo', 'Acciones'];

  const onAgregarTramite = () => {
    navigate('agregar');
  };

  return (
    <div className="mb-4">
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <h1 className="text-2xl font-bold my-4">Administrar trámites</h1>
      <div className="mb-2">
        <Button onClick={onAgregarTramite} variant="secondary" text="Agregar trámite" />
      </div>
      {/* <TableFilters
        currentFilters={currentFilters}
        setCurrentFilters={setCurrentFilters}
        setCurrentPage={setCurrentPage}
      /> */}
      {!loading ? (
        tramites.length === 0 ? (
          <p>No hay trámites registrados</p>
        ) : (
          <>
            <BaseTable data={tramites} columns={columns} />
            {/* <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
            /> */}
          </>
        )
      ) : (
        <p>Cargando trámites...</p>
      )}
    </div>
  );
};

export default Tramites;
