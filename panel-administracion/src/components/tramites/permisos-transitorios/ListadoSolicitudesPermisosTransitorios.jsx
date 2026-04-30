import { useEffect, useState } from 'react';
import { obtenerSolicitudesPorTramite } from '../../../services/solicitudes.service';
import { formatDate } from '../../../utils/format';
import StatusTag from '../../ui/StatusTag';
import { Link, useNavigate } from 'react-router-dom';
import Breadcrumbs from '../../ui/Breadcrumbs';
import TableFilters from '../../ui/TableFilters';
import BaseTable from '../../ui/BaseTable';
import Pagination from '../../ui/Pagination';
import SearchBar from '../../ui/SearchBar';
import { useDebounce } from '../../../hooks/useDebounce';
import OriginTag from '../../ui/OriginTag';
import Button from '../../ui/Button';

const ListadoSolicitudesPermisosTransitorios = ({ title, tramiteId, breadcrumbsData }) => {
  const [currentFilters, setCurrentFilters] = useState([]);
  const [requests, setRequests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 15;
  const [searchInput, setSearchInput] = useState('');
  const debouncedSearch = useDebounce(searchInput, 600);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      setLoading(true);
      const filters = currentFilters.length !== 0 ? currentFilters.join(',') : null;
      try {
        const data = await obtenerSolicitudesPorTramite(
          tramiteId,
          currentPage,
          pageSize,
          filters,
          debouncedSearch,
        );
        setTotalPages(data.totalPages);
        const formattedData = data?.requests?.map((e) => ({
          id: e.id,
          /* usuario: `${e.usuario.nombres} ${e.usuario.apellidos}`, */
          /* rut: e.usuario.run, */
          orgName: e.orgName,
          orgRut: e.orgRut,
          createdAt: formatDate(e.createdAt, 'DD MMM YYYY, HH:mm'),
          estado: <StatusTag status={e.estado} />,
          origen: <OriginTag status={e.origen} />,
          acciones: (
            <Link to={`${e.id}`} className="text-blue-500 hover:underline w-full">
              Revisar
            </Link>
          ),
        }));
        setRequests(formattedData);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    })();
  }, [tramiteId, currentPage, currentFilters, debouncedSearch]);

  const columns = [
    '#',
    'Nombre organización',
    'RUT Organización',
    'Fecha de solicitud',
    'Estado',
    'Origen',
    'Acciones',
  ];

  const breadcrumbs = [{ label: breadcrumbsData.tramite, href: breadcrumbsData.tramiteHref }];

  const goTo = () => {
    navigate('agregar');
  };

  return (
    <div className="mb-4">
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <h1 className="text-2xl font-bold my-4">{title}</h1>
      <div className="my-4">
        <SearchBar search={searchInput} setSearch={setSearchInput} />
        <div className="my-4">
          <Button onClick={goTo} variant="secondary" text="Agregar solicitud física" />
        </div>
      </div>
      <TableFilters
        currentFilters={currentFilters}
        setCurrentFilters={setCurrentFilters}
        setCurrentPage={setCurrentPage}
      />
      {!loading ? (
        requests.length === 0 ? (
          <p>No hay solicitudes pendientes</p>
        ) : (
          <>
            <BaseTable data={requests} columns={columns} />
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
            />
          </>
        )
      ) : (
        <p>Cargando solicitudes...</p>
      )}
    </div>
  );
};

export default ListadoSolicitudesPermisosTransitorios;
