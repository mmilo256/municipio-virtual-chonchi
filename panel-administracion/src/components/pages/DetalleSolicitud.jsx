import StatusTag from '../ui/StatusTag';
import { formatDate } from '../../utils/format';
import Breadcrumbs from '../ui/Breadcrumbs';
import { ToastContainer, toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import OriginTag from '../ui/OriginTag';
import { obtenerSolicitudPorCodigo } from '../../services/solicitudes.service';
import Accordion from '../ui/Accordion';

const DetalleSolicitud = () => {
  const [solicitud, setSolicitud] = useState({});
  const [loading, setLoading] = useState(false);
  const { codigo } = useParams();

  const infoSolicitud = solicitud.solicitud;
  const infoContacto = solicitud.contacto;
  const pasosFormulario = infoSolicitud?.tramite?.formulario?.pasos_formularios ?? [];
  const respuestas = Object.fromEntries(
    (infoSolicitud?.respuestas || []).map((r) => [r.campo_id, r.valor]),
  );

  useEffect(() => {
    (async () => {
      const response = await obtenerSolicitudPorCodigo(codigo);
      setSolicitud(response.data);
    })();
  }, [codigo]);

  const cambiarEstadoSolicitud = async (codigo, estado) => {
    console.log(`Estado de la solicitud ${codigo} cambiado a: ${estado}`);
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
      <button
        onClick={() => {
          cambiarEstadoSolicitud(codigo, 'en revision');
        }}
        className="border px-4 py-1 my-4 bg-[#fff] hover:bg-slate-300"
      >
        Cambiar estado
      </button>
      {/* Información del solicitante */}
      <div className="mt-4">
        <h2 className="text-xl mb-2 font-semibold">Información del solicitante</h2>
        <div className="bg-[#fff] p-4 shadow rounded">
          <p>
            <strong>Nombre: </strong>
            {infoContacto?.nombres}
          </p>
          <p>
            <strong>RUT: </strong>
            {infoContacto?.run}
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
      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-2">Datos de la solicitud</h2>
        {pasosFormulario.map((paso) => (
          <Accordion init key={paso.titulo} title={paso.titulo}>
            {paso.campos_formularios.map((campo) => (
              <p key={campo.id}>
                <strong>{campo.etiqueta}</strong>
                {': ' + respuestas[campo.id]}
              </p>
            ))}
          </Accordion>
        ))}
      </div>
    </div>
  );
};

export default DetalleSolicitud;
