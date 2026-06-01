import { useParams } from 'react-router-dom'; // Para obtener parámetros de la URL (como el ID de la solicitud)
import { useEffect, useState } from 'react'; // Hooks de React para efectos y estados
import { obtenerSolicitudPorCodigo } from '../services/requests.service';
import Container from '../components/ui/Container';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import Accordion from '../components/ui/Accordion';
import { formatDate, renderValorRespuesta } from '../utils/utils';
import StatusTracker from '../components/ui/StatusTracker';
import StatusTag from '../components/ui/StatusTag';
import { API_URL } from '../config';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/buttons/Button';
import LoadingOverlay from '../components/ui/LoadingOverlay';

const RequestTracking = () => {
  // Obtiene el ID de la solicitud desde los parámetros de la URL
  const { codigo, slug } = useParams();

  const [loading, setLoading] = useState(false);

  const [solicitud, setSolicitud] = useState({});
  const [historial, setHistorial] = useState([]);

  const navigate = useNavigate();

  const observacion = solicitud?.observacion;
  const estado = solicitud?.estado;

  const documentos = solicitud?.documentos;
  const documentosAprobacion = documentos?.filter((doc) => doc.origen === 'sistema');

  const pasos = solicitud.tramite?.formulario?.pasos_formularios ?? [];

  const respuestas = Object.fromEntries(
    (solicitud.respuestas || []).map((r) => [r.campo_id, r.valor]),
  );

  const breadcrumbs = [
    { label: 'Solicitudes', href: '/solicitudes' },
    { label: `Solicitud ${codigo}`, href: `/solicitudes/${slug}/${codigo}` },
  ];

  const setMessage = (status) => {
    let message;
    switch (status) {
      case 'pendiente':
        message = 'Estamos esperando que un funcionario revise su solicitud.';
        break;
      case 'en revision':
        message = 'Su solicitud está siendo revisada por un funcionario.';
        break;
      case 'requiere correccion':
        message = 'Se requiere una acción del usuario para poder continuar con la solicitud';
        break;
      case 'rechazada':
        message = 'Su solicitud ha sido rechazada. Por favor, revise los motivos del rechazo.';
        break;
      case 'aprobada':
        message = 'Su solicitud fue aprobada por la Municipalidad de Chonchi.';
        break;
      default:
        break;
    }
    return message;
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const response = await obtenerSolicitudPorCodigo(codigo);
        setSolicitud(response.data.solicitud);
        const rawH = response.data.historialEstados;
        const formattedHistorial = rawH.map((item, index) => ({
          fecha: item.createdAt,
          estado: item.estado,
          id: item.id,
          mensaje: setMessage(item.estado),
          activo: index === rawH.length - 1 ? true : false,
        }));
        setHistorial(formattedHistorial);
      } catch (error) {
        alert(error.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [codigo]);

  return (
    <>
      <LoadingOverlay show={loading} text="Cargando solicitud..." />
      <Container>
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <h1 className="text-3xl font-bold mt-4">Detalle de solicitud</h1>
        <p className="text-slate-600 mb-4">Revise el estado de su solicitud y sus respuestas.</p>
        <div className="bg-white p-4 rounded border shadow grid md:flex gap-2 justify-between mb-4">
          <div>
            <p className="text-sm text-slate-600">CÓDIGO</p>
            <p className="font-bold">{solicitud?.codigo}</p>
          </div>
          <div>
            <p className="text-sm text-slate-600">TRÁMITE</p>
            <p className="font-bold">{solicitud?.tramite?.titulo}</p>
          </div>
          <div>
            <p className="text-sm text-slate-600">FECHA SOLICITUD</p>
            <p className="font-bold">{formatDate(solicitud?.createdAt, 2)}</p>
          </div>
          <div>
            <p className="text-sm text-slate-600">ESTADO</p>
            <p className="font-bold">
              <StatusTag status={solicitud?.estado} />
            </p>
          </div>
        </div>
        <div className="p-4 bg-white rounded border shadow grid md:grid-cols-2 gap-4">
          <div>
            <h2 className="text-xl font-bold">Respuestas del formulario</h2>
            <p className="text-slate-600 mb-4">
              Información ingresada por el solicitante, agrupada por pasos.
            </p>
            <div className="space-y-1">
              <Accordion isOpen title="Información de contacto">
                <div className="space-x-1">
                  <strong>Nombre completo:</strong>
                  <span>
                    {renderValorRespuesta(
                      `${solicitud?.usuario?.nombres} ${solicitud?.usuario?.apellidos}`,
                    )}
                  </span>
                </div>
                <div className="space-x-1">
                  <strong>RUT:</strong>
                  <span>{renderValorRespuesta(solicitud?.usuario?.run)}</span>
                </div>
                <div className="space-x-1">
                  <strong>Correo electrónico:</strong>
                  <span>{renderValorRespuesta(solicitud.email_contacto)}</span>
                </div>
                <div className="space-x-1">
                  <strong>Número de teléfono:</strong>
                  <span>{renderValorRespuesta(solicitud.telefono_contacto)}</span>
                </div>
                <div className="space-x-1">
                  <strong>Dirección:</strong>
                  <span>{renderValorRespuesta(solicitud.direccion_contacto)}</span>
                </div>
              </Accordion>
              {pasos.map((paso) => (
                <Accordion key={paso.titulo} title={paso.titulo}>
                  {paso.campos_formularios.map((campo) => {
                    const documento = documentos?.find((doc) => doc.campo_id === campo.id);
                    return (
                      <p key={campo.id}>
                        <strong>{campo.etiqueta}</strong>:{' '}
                        {campo.tipo === 'file' ? (
                          documento ? (
                            <a
                              target="_blank"
                              href={`${API_URL}/documentos/${documento.id}/view`}
                              className="text-blue-500 underline"
                              rel="noreferrer"
                            >
                              Ver
                            </a>
                          ) : (
                            <span className="italic text-slate-500">No adjuntado</span>
                          )
                        ) : campo.tipo === 'date' ? (
                          <span>{formatDate(respuestas[campo.id], 1)}</span>
                        ) : (
                          <span>{respuestas[campo.id]}</span>
                        )}
                      </p>
                    );
                  })}
                </Accordion>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold">Seguimiento</h2>
            <p className="text-slate-600 mb-4">Revise el estado de su solicitud.</p>
            <StatusTracker data={historial} />
            {observacion && estado === 'rechazada' && (
              <div>
                <p className="bg-red-50 p-4 rounded border border-red-200 text-red-700">
                  <strong>Motivo del rechazo:</strong> {observacion}
                </p>
              </div>
            )}
            {observacion && estado === 'requiere correccion' && (
              <div className="space-y-4">
                <p className="bg-amber-50 p-4 rounded border border-amber-200 text-amber-700">
                  <strong>Observaciones:</strong> {observacion}
                </p>
                <Button
                  onClick={() => {
                    navigate('corregir-solicitud');
                  }}
                  label="Corregir solicitud"
                  variant="primary"
                  fullWidth
                />
              </div>
            )}
            {documentosAprobacion && documentosAprobacion.length !== 0 && (
              <div>
                <h2 className="text-xl font-bold mb-2">Documentos de resolución</h2>
                <ul className="space-y-2">
                  {documentosAprobacion.map((doc) => {
                    return (
                      <li key={doc.id}>
                        <a
                          className="text-blue-500 underline uppercase font-bold"
                          target="_blank"
                          href={`${API_URL}/documentos/${doc.id}/view`}
                          rel="noreferrer"
                        >
                          {doc.nombre}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        </div>
      </Container>
    </>
  );
};

export default RequestTracking;
