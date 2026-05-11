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
  obtenerSolicitudesPorTramite,
} from '../../services/solicitudes.service';

const Solicitudes = () => {
  const [filtrosActuales, setFiltrosActuales] = useState([]);
  const [solicitudes, setSolicitudes] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const pageSize = 15;
  const [tramite, setTramite] = useState({});

  const [loading, setLoading] = useState(false);

  const { slug } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const revisarSolicitud = async (codigo, estadoActual) => {
        if (estadoActual === 'pendiente') {
          await cambiarEstadoSolicitud(codigo, 'en revision');
        }
        navigate(codigo);
      };
      try {
        setLoading(true);
        const filtros = filtrosActuales.length !== 0 ? filtrosActuales.join(',') : null;
        const response = await obtenerSolicitudesPorTramite(slug, paginaActual, pageSize, filtros);
        setTramite(response.tramite);
        const formattedRows = response.rows.map((row) => ({
          codigo: row.codigo,
          solicitante: `${row.usuario.nombres} ${row.usuario.apellidos}`,
          fecha: formatDate(row.createdAt, 'DD MMM YYYY, HH:mm'),
          estado: <StatusTag status={row.estado} />,
          origen: <OriginTag status={row.origen} />,
          acciones: (
            <button
              onClick={() => {
                revisarSolicitud(row.codigo, row.estado);
              }}
              className="border p-2"
            >
              Revisar
            </button>
          ),
        }));
        setSolicitudes(formattedRows);
        setTotalPaginas(response.totalPages);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [slug, filtrosActuales, paginaActual, navigate]);

  const columns = ['Código', 'Solicitante', 'Fecha de solicitud', 'Estado', 'Origen', 'Acciones'];

  return (
    <div className="mb-4">
      <Breadcrumbs breadcrumbs={[]} />
      <h1 className="text-2xl font-bold my-4">{tramite.titulo}</h1>
      <div className="my-4"></div>
      <TableFilters
        currentFilters={filtrosActuales}
        setCurrentFilters={setFiltrosActuales}
        setCurrentPage={setPaginaActual}
      />
      {!loading ? (
        solicitudes.length === 0 ? (
          <p>No hay solicitudes pendientes</p>
        ) : (
          <>
            <BaseTable data={solicitudes} columns={columns} />
            <Pagination
              currentPage={paginaActual}
              setCurrentPage={setPaginaActual}
              totalPages={totalPaginas}
            />
          </>
        )
      ) : (
        <p>Cargando solicitudes...</p>
      )}
    </div>
  );
};

export default Solicitudes;
