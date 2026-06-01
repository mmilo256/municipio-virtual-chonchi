import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { formatDate } from '../../utils/format';
import StatusTag from '../ui/StatusTag';
import OriginTag from '../ui/OriginTag';
import Breadcrumbs from '../ui/Breadcrumbs';
import TableFilters from '../ui/TableFilters';
import BaseTable from '../ui/BaseTable';
import Pagination from '../ui/Pagination';
import {
  cambiarEstadoSolicitud,
  obtenerSolicitudesPermisosTransitorios,
  obtenerSolicitudesPorTramite,
} from '../../services/solicitudes.service';
import Button from '../ui/Button';
import LoadingOverlay from '../ui/LoadingOverlay';
import SearchBar from '../ui/SearchBar';

const Solicitudes = () => {
  const [filtrosActuales, setFiltrosActuales] = useState([]);
  const [solicitudes, setSolicitudes] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const pageSize = 10;
  const [tramite, setTramite] = useState({});

  const [loading, setLoading] = useState(false);

  const { slug } = useParams();

  const navigate = useNavigate();

  const [search, setSearch] = useState('');

  useEffect(() => {
    (async () => {
      setLoading(true);
      const revisarSolicitud = async (codigo, estadoActual) => {
        if (estadoActual === 'pendiente') {
          await cambiarEstadoSolicitud(codigo, 'en revision');
        }
        navigate(codigo);
      };
      try {
        if (slug === 'permisos-transitorios') {
          const filtros = filtrosActuales.length !== 0 ? filtrosActuales.join(',') : null;
          const response = await obtenerSolicitudesPermisosTransitorios(
            paginaActual,
            pageSize,
            filtros,
            search,
          );
          setTramite(response.tramite);
          const formattedRows = response?.rows?.map((row) => {
            console.log(row);

            return {
              codigo: row.codigo,
              rut_organizacion: row?.respuestas[1]?.valor,
              nombre_organizacion: row?.respuestas[0]?.valor,
              solicitante: row.nombre_contacto,
              fecha: formatDate(row.createdAt, 'DD MMM YYYY, HH:mm'),
              estado: <StatusTag status={row.estado} />,
              origen: <OriginTag status={row.origen} />,
              acciones: (
                <button
                  onClick={() => {
                    revisarSolicitud(row.codigo, row.estado);
                  }}
                  className="py-1 px-3 bg-sky-500 text-white rounded font-bold hover:bg-sky-600"
                >
                  Revisar solicitud
                </button>
              ),
            };
          });
          setSolicitudes(formattedRows);
          setTotalPaginas(response.totalPages);
        } else {
          const filtros = filtrosActuales.length !== 0 ? filtrosActuales.join(',') : null;
          const response = await obtenerSolicitudesPorTramite(
            slug,
            paginaActual,
            pageSize,
            filtros,
          );
          setTramite(response.tramite);
          const formattedRows = response.rows.map((row) => ({
            codigo: row.codigo,
            solicitante: row.nombre_contacto,
            fecha: formatDate(row.createdAt, 'DD MMM YYYY, HH:mm'),
            estado: <StatusTag status={row.estado} />,
            origen: <OriginTag status={row.origen} />,
            acciones: (
              <button
                onClick={() => {
                  revisarSolicitud(row.codigo, row.estado);
                }}
                className="py-1 px-3 bg-sky-500 text-white rounded font-bold hover:bg-sky-600"
              >
                Revisar solicitud
              </button>
            ),
          }));
          setSolicitudes(formattedRows);
          setTotalPaginas(response.totalPages);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [slug, filtrosActuales, paginaActual, navigate, search]);

  const columns = [
    'Código',
    'RUT organización',
    'Nombre organización',
    'Solicitante',
    'Fecha de solicitud',
    'Estado',
    'Origen',
    'Acciones',
  ];

  return (
    <>
      <LoadingOverlay show={loading} text="Cargando solicitudes..." />
      <div className="mb-4">
        <Breadcrumbs breadcrumbs={[]} />
        <h1 className="text-2xl font-bold my-4">{tramite.titulo}</h1>
        <div className="my-4">
          <Button
            onClick={() => {
              navigate('agregar-solicitud-fisica');
            }}
            text="Agregar solicitud física"
            variant="secondary"
          />
        </div>
        <SearchBar
          className="mb-4"
          search={search}
          setSearch={setSearch}
          placeholder="Buscar por RUT de la organización"
        />
        {search && (
          <button
            onClick={() => {
              setSearch('');
            }}
            className="mb-2 text-sm italic bg-amber-100 hover:bg-amber-200 w-fit px-3 py-1 rounded flex justify-between items-center gap-x-6"
          >
            <div>
              <strong>Búsqueda:</strong> <span>{search}</span>
            </div>
            <span className="text-xl">&times;</span>
          </button>
        )}
        <TableFilters
          currentFilters={filtrosActuales}
          setCurrentFilters={setFiltrosActuales}
          setCurrentPage={setPaginaActual}
        />
        {!loading ? (
          solicitudes.length === 0 ? (
            <p>No hay solicitudes pendientes</p>
          ) : (
            <div className="overflow-x-scroll">
              <BaseTable data={solicitudes} columns={columns} />
              <Pagination
                currentPage={paginaActual}
                setCurrentPage={setPaginaActual}
                totalPages={totalPaginas}
              />
            </div>
          )
        ) : (
          <p>Cargando solicitudes...</p>
        )}
      </div>
    </>
  );
};

export default Solicitudes;
