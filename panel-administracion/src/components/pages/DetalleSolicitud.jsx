import StatusTag from '../ui/StatusTag';
import { formatDate } from '../../utils/format';
import Breadcrumbs from '../ui/Breadcrumbs';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import OriginTag from '../ui/OriginTag';
import { obtenerSolicitudPorCodigo } from '../../services/solicitudes.service';
import Accordion from '../ui/Accordion';
import BaseTable from '../ui/BaseTable';
import Button from '../ui/Button';
import { API_URL } from '../../../config';
import StatusTracker from '../ui/StatusTracker';
import { borrarDocumento } from '../../services/documents.service';
import LoadingOverlay from '../ui/LoadingOverlay';
import Modal from '../ui/Modal';

const DetalleSolicitud = () => {
  const [solicitud, setSolicitud] = useState({});
  const { codigo } = useParams();

  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('');

  const [quitarDocumentoModal, setQuitarDocumentoModal] = useState(false);

  const [documentoSeleccionado, setDocumentoSeleccionado] = useState(null);

  const navigate = useNavigate();

  const documentosAprobacion = solicitud?.solicitud?.documentos?.filter(
    (doc) => doc.origen === 'sistema',
  );

  const observacion = solicitud?.solicitud?.observacion;

  const historialSolicitud = solicitud?.completeInfo ?? [];

  const infoSolicitud = solicitud.solicitud;
  const pasosFormulario = infoSolicitud?.tramite?.formulario?.pasos_formularios ?? [];
  const respuestas = Object.fromEntries(
    (infoSolicitud?.respuestas || []).map((r) => [r.campo_id, r.valor]),
  );
  const estado = infoSolicitud?.estado;
  const documentos = solicitud?.solicitud?.documentos;

  const solicitudOrigen = solicitud?.solicitud?.origen;

  const quitarDocumento = async (id) => {
    setLoadingText('Quitando documento de la lista...');
    setLoading(true);
    try {
      await borrarDocumento(id);
      setSolicitud((prev) => ({
        ...prev,
        solicitud: {
          ...prev.solicitud,
          documentos: prev.solicitud.documentos.filter((doc) => doc.id !== id),
        },
      }));
      toast.success('El documento ha sido borrado');
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
      setQuitarDocumentoModal(false);
    }
  };

  const documentosAsociados = documentos
    ?.filter((documento) => documento.origen === 'funcionario')
    .map((doc) => {
      return {
        nombre: (
          <a
            className="text-blue-500 underline"
            target="_blank"
            href={`${API_URL}/documentos/${doc.id}/view`}
            rel="noreferrer"
          >
            {doc.nombre}
          </a>
        ),
        fecha: formatDate(doc.createdAt, 'DD [de] MMMM [de] YYYY, HH:mm'),
        funcionario: doc?.funcionario_id
          ? `${doc?.funcionario?.nombres} ${doc?.funcionario?.apellidos}`
          : '',
        accion: (
          <button
            onClick={() => {
              setDocumentoSeleccionado(doc.id);
              setQuitarDocumentoModal(true);
            }}
            className="py-1 px-4 text-sm border border-red-600 rounded bg-red-500 hover:bg-red-400 text-[#fff] font-bold"
          >
            Quitar documento
          </button>
        ),
      };
    });

  useEffect(() => {
    (async () => {
      setLoadingText('Cargando solicitud...');
      setLoading(true);
      try {
        const response = await obtenerSolicitudPorCodigo(codigo);
        setSolicitud(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [codigo]);

  const onAprobarSolicitud = () => {
    navigate('aprobar');
  };
  const onRechazarSolicitud = () => {
    navigate('rechazar');
  };
  const onSolicitarCorreccion = () => {
    navigate('solicitar-correccion');
  };

  const onSubirDocumentoAsociado = () => {
    navigate('subir-documento');
  };

  return (
    <>
      <Modal
        onClick={() => {
          quitarDocumento(documentoSeleccionado);
        }}
        btnText="Quitar documento"
        title="Quitar documento de la lista"
        modal={quitarDocumentoModal}
        toggleModal={() => {
          setQuitarDocumentoModal(!quitarDocumentoModal);
        }}
      >
        <p>¿Seguro que desea quitar este documento de la lista?</p>
      </Modal>
      <LoadingOverlay show={loading} text={loadingText} />
      <div>
        <ToastContainer />
        <Breadcrumbs breadcrumbs={[]} />
        {/* Encabezado con el estado de la solicitud */}
        <div className="flex items-center gap-5 mt-4">
          <h1 className="text-2xl font-bold">
            {infoSolicitud?.tramite.titulo}: {infoSolicitud?.codigo}
          </h1>
          <StatusTag status={infoSolicitud?.estado} />
          <OriginTag status={infoSolicitud?.origen} />
        </div>
        {/* Fecha de la solicitud */}
        <p className="text-slate-500">
          <strong>Fecha de ingreso: </strong>
          {formatDate(infoSolicitud?.createdAt, 'DD [de] MMMM [de] YYYY [a las] HH:mm')}
        </p>
        {/* MENSAJES */}
        {estado === 'rechazada' && observacion && (
          <p className="bg-red-50 border border-red-300 rounded p-4 mt-4 text-red-700">
            <strong>Motivo del rechazo:</strong> {observacion}
          </p>
        )}
        {estado === 'aprobada' && documentosAprobacion.length !== 0 && (
          <div className="flex gap-4 my-4">
            {documentosAprobacion.map((doc) => (
              <a
                key={doc.id}
                target="_blank"
                href={`${API_URL}/documentos/${doc.id}/view`}
                className="block border py-1 px-6 bg-[#fff] text-blue-500 font-bold uppercase hover:bg-blue-500 hover:text-[#fff] hover:underline"
                rel="noreferrer"
              >
                {doc.nombre}
              </a>
            ))}
          </div>
        )}
        {estado === 'requiere correccion' && observacion && (
          <div className="space-x-4 my-4">
            <div className="bg-violet-50 border border-violet-300 rounded p-4 mt-4 text-violet-700">
              <p className="mb-2">
                Esperando que el solicitante envíe la corrección de la solicitud
              </p>
              <p>
                <strong>Observaciones:</strong> {observacion}
              </p>
            </div>
          </div>
        )}
        {/* BOTONES DE ACCIÓN */}
        {estado === 'en revision' && (
          <div className="space-x-4 mt-2 mb-6">
            <button
              onClick={onAprobarSolicitud}
              className="font-bold bg-green-500 rounded text-[#fff] p-2"
            >
              Aprobar solicitud
            </button>
            {solicitudOrigen !== 'fisico' && (
              <button
                onClick={onSolicitarCorreccion}
                className="font-bold bg-amber-500 rounded text-[#fff] p-2"
              >
                Solicitar corrección
              </button>
            )}
            <button
              onClick={onRechazarSolicitud}
              className="font-bold bg-red-500 rounded text-[#fff] p-2"
            >
              Rechazar solicitud
            </button>
          </div>
        )}
        {/* Información del solicitante */}
        <div className="mt-4">
          <h2 className="text-xl mb-2 font-semibold">Información del solicitante</h2>
          <div className="bg-[#fff] p-4 shadow rounded">
            <p>
              <strong>Nombre: </strong>
              {infoSolicitud?.nombre_contacto}
            </p>
            <p>
              <strong>RUT: </strong>
              {infoSolicitud?.rut_contacto}
            </p>
            <p>
              <strong>Correo electrónico: </strong>
              {infoSolicitud?.email_contacto}
            </p>
            <p>
              <strong>Teléfono: </strong>
              {infoSolicitud?.telefono_contacto}
            </p>
            <p>
              <strong>Domicilio: </strong>
              {infoSolicitud?.direccion_contacto}
            </p>
          </div>
        </div>
        {/* Datos de la solicitud */}
        <div className="grid grid-cols-5 gap-x-4 my-6">
          <div className="col-span-3">
            <h2 className="text-xl font-semibold mb-2">Datos de la solicitud</h2>
            <div className="bg-[#fff] p-6 rounded shadow shadow-slate-400">
              {pasosFormulario.map((paso) => (
                <Accordion init key={paso.titulo} title={paso.titulo}>
                  <div className="space-y-1">
                    {paso.campos_formularios.map((campo) => {
                      const documento = documentos?.find((doc) => doc.campo_id === campo.id);
                      return (
                        <p key={campo.id} className="border-b border-slate-200">
                          <strong>{campo.etiqueta}</strong>:{' '}
                          {campo.tipo === 'file' ? (
                            documento ? (
                              <a
                                target="_blank"
                                href={`${API_URL}/documentos/${documento.id}/view`}
                                className="text-blue-500 underline"
                                rel="noreferrer"
                              >
                                Ver documento
                              </a>
                            ) : (
                              <span className="text-slate-400">No adjuntado</span>
                            )
                          ) : campo.tipo === 'date' ? (
                            <span>
                              {formatDate(respuestas[campo.id], 'DD [de] MMMM [de] YYYY')}
                            </span>
                          ) : (
                            <span>{respuestas[campo.id]}</span>
                          )}
                        </p>
                      );
                    })}
                  </div>
                </Accordion>
              ))}
            </div>
          </div>

          {/* TRAZABILIDAD SOLICITUD */}
          {historialSolicitud && (
            <div className="col-span-2">
              <h2 className="text-xl font-semibold mb-2">Seguimiento</h2>
              <div className="bg-[#fff] rounded shadow shadow-slate-400">
                {<StatusTracker data={historialSolicitud} />}
              </div>
            </div>
          )}
        </div>
        <div className="mb-10">
          <h2 className="text-xl font-semibold">Subir documentos asociados</h2>
          <p className="mb-2 text-sm text-slate-500">
            Agrega documentos relacionados con la revisión y gestión de esta solicitud.
          </p>
          <div className="my-4">
            <Button onClick={onSubirDocumentoAsociado} text="Subir documento" variant="secondary" />
          </div>
          <BaseTable
            columns={['Documento', 'Fecha subida', 'Funcionario', 'Acciones']}
            data={documentosAsociados}
          />
        </div>
      </div>
    </>
  );
};

export default DetalleSolicitud;
