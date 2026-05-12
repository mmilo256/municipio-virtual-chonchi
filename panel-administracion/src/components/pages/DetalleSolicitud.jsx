import StatusTag from '../ui/StatusTag';
import { formatDate } from '../../utils/format';
import Breadcrumbs from '../ui/Breadcrumbs';
import { ToastContainer } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import OriginTag from '../ui/OriginTag';
import { obtenerSolicitudPorCodigo } from '../../services/solicitudes.service';
import Accordion from '../ui/Accordion';
import BaseTable from '../ui/BaseTable';
import Button from '../ui/Button';
import { API_URL } from '../../../config';

const DetalleSolicitud = () => {
  const [solicitud, setSolicitud] = useState({});
  const { codigo } = useParams();

  const navigate = useNavigate();

  const infoSolicitud = solicitud.solicitud;
  const pasosFormulario = infoSolicitud?.tramite?.formulario?.pasos_formularios ?? [];
  const respuestas = Object.fromEntries(
    (infoSolicitud?.respuestas || []).map((r) => [r.campo_id, r.valor]),
  );
  const estado = infoSolicitud?.estado;
  const usuario = infoSolicitud?.usuario;
  const documentos = solicitud?.solicitud?.documentos;
  const documentosAsociados = documentos
    ?.filter((documento) => documento.origen === 'funcionario')
    .map((doc) => ({
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
    }));

  useEffect(() => {
    (async () => {
      try {
        const response = await obtenerSolicitudPorCodigo(codigo);
        setSolicitud(response.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [codigo]);

  const onAprobarSolicitud = () => {
    navigate('aprobar');
  };
  const onRechazarSolicitud = () => {
    navigate('rechazar');
  };

  const onSubirDocumentoAsociado = () => {
    navigate('subir-documento');
  };

  return (
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
      {estado === 'en revision' && (
        <div className="space-x-4 mt-2 mb-6">
          <button
            onClick={onAprobarSolicitud}
            className="font-bold bg-green-500 rounded text-[#fff] p-2"
          >
            Aprobar solicitud
          </button>
          <button className="font-bold bg-amber-500 rounded text-[#fff] p-2">
            Solicitar corrección
          </button>
          <button
            onClick={onRechazarSolicitud}
            className="font-bold bg-red-500 rounded text-[#fff] p-2"
          >
            Rechazar solicitud
          </button>
        </div>
      )}
      {estado === 'requiere correccion' && (
        <div className="space-x-4 my-4">
          <p className="p-2 bg-blue-100 text-blue-900/60 rounded">
            Esperando la corrección del solicitante
          </p>
        </div>
      )}
      {/* Información del solicitante */}
      <div className="mt-4">
        <h2 className="text-xl mb-2 font-semibold">Información del solicitante</h2>
        <div className="bg-[#fff] p-4 shadow rounded">
          <p>
            <strong>Nombre: </strong>
            {`${usuario?.nombres} ${usuario?.apellidos}`}
          </p>
          <p>
            <strong>RUT: </strong>
            {usuario?.run}
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
      <div className="my-10">
        <h2 className="text-xl font-semibold mb-2">Datos de la solicitud</h2>
        {pasosFormulario.map((paso) => (
          <Accordion init key={paso.titulo} title={paso.titulo}>
            {paso.campos_formularios.map((campo) => {
              const documento = documentos?.find((doc) => doc.campo_id === campo.id);
              return (
                <p key={campo.id}>
                  <strong>{campo.etiqueta}</strong>:{' '}
                  {campo.tipo !== 'file' ? (
                    <span>{respuestas[campo.id]}</span>
                  ) : (
                    <a
                      target="_blank"
                      href={`${API_URL}/documentos/${documento.id}/view`}
                      className="text-blue-500 underline"
                      rel="noreferrer"
                    >
                      Ver documento
                    </a>
                  )}
                </p>
              );
            })}
          </Accordion>
        ))}
      </div>
      <div className="mb-10">
        <h2 className="text-xl font-semibold">Subir documentos asociados</h2>
        <p className="mb-2 text-sm text-slate-500">
          Agrega documentos relacionados con la revisión y gestión de esta solicitud.
        </p>
        <div className="my-4">
          <Button onClick={onSubirDocumentoAsociado} text="Subir documento" variant="secondary" />
        </div>
        <BaseTable columns={['Documento']} data={documentosAsociados} />
      </div>
    </div>
  );
};

export default DetalleSolicitud;
