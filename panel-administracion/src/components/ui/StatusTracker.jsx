import { IoTimeOutline } from 'react-icons/io5';
import { formatDate } from '../../utils/format';

const StatusTracker = ({ data }) => {
  const setMensaje = (accion) => {
    let mensaje;
    let titulo;
    switch (accion) {
      case 'solicitud_subida_por_funcionario':
        titulo = 'Solicitud subida';
        mensaje = 'ingresó una solicitud al sistema';
        break;
      case 'solicitud_enviada':
        titulo = 'Solicitud recibida';
        mensaje = 'envió una nueva solicitud';
        break;
      case 'solicitud_en_revision':
        titulo = 'En revisión';
        mensaje = 'inició la revisión de la solicitud';
        break;
      case 'correccion_solicitada':
        titulo = 'Corrección solicitada al usuario';
        mensaje = 'solicitó corregir antecedentes de la solicitud';
        break;
      case 'solicitud_corregida':
        titulo = 'Solicitud corregida por el usuario';
        mensaje = 'envió los antecedentes corregidos';
        break;
      case 'solicitud_rechazada':
        titulo = 'Rechazada';
        mensaje = 'rechazó la solicitud';
        break;
      case 'solicitud_aprobada':
        titulo = 'Aprobada';
        mensaje = 'aprobó la solicitud';
        break;
      default:
        break;
    }
    return { titulo, mensaje };
  };

  return (
    <div className="flex flex-col gap-2">
      {data?.map((item) => {
        const { titulo, mensaje } = setMensaje(item.accion);
        const usuarioNombre =
          item.usuario_tipo === 'solicitante'
            ? 'El solicitante'
            : `${item?.funcionario?.nombres} ${item?.funcionario?.apellidos}`;

        return (
          <article key={item.id} className="border-b rounded p-4 flex gap-2">
            <IoTimeOutline size={20} />
            <div className="w-full">
              <h4 className="font-bold mb-1 text-slate-500">{titulo}</h4>
              <p className="text-sm">
                <strong>{usuarioNombre}</strong> {mensaje}
              </p>
              <span className="text-xs text-slate-500">
                {formatDate(item.createdAt, 'DD/MM/YYYY, HH:mm')}
              </span>
              {item.estado === 'rechazada' && (
                <p className="bg-red-100 mt-2 text-red-700 p-2 rounded text-sm">
                  <strong>Motivo:</strong> {item.mensaje}
                </p>
              )}
              {item.estado === 'requiere correccion' && (
                <p className="bg-violet-100 mt-2 text-violet-700 p-2 rounded text-sm">
                  <strong>Observaciones:</strong> {item.mensaje}
                </p>
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default StatusTracker;
