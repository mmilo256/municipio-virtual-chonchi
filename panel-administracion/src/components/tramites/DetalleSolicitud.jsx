import StatusTag from '../ui/StatusTag';
import { formatDate } from '../../utils/format';
import Breadcrumbs from '../ui/Breadcrumbs';
import { ToastContainer, toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const DetalleSolicitud = ({
  requestData = [],
  actions,
  respuestas,
  documentosForm,
  documentosSubidos,
  status,
  breadcrumbs,
  loading,
}) => {
  const location = useLocation();

  useEffect(() => {
    if (location?.state?.showToast) {
      toast.success(location.state.toastMessage);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  return (
    <div>
      <ToastContainer />
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      {/* Encabezado con el estado de la solicitud */}
      <div className="flex items-center gap-5 mt-4">
        <h1 className="text-2xl font-bold">
          {!loading ? (
            `${requestData?.tramite} #${requestData?.id}`
          ) : (
            <span className="inline-block h-6 rounded-full w-72 bg-slate-200 animate-pulse"></span>
          )}
        </h1>
        <StatusTag status={status} />
      </div>
      {/* Fecha de la solicitud */}
      <p className="text-slate-500">
        <strong>Fecha de solicitud: </strong>
        {formatDate(requestData.createdAt, 'DD [de] MMMM [de] YYYY [a las] HH:mm')}
      </p>
      {/* Acciones disponibles */}
      {actions}
      {/* Información del solicitante */}
      <div className="mt-4">
        <h2 className="text-xl mb-2 font-semibold">Información del solicitante</h2>
        <div className="bg-[#fff] p-4 shadow rounded">
          <p>
            <strong>Nombre: </strong>
            {!loading ? (
              requestData?.respuestas?.name
            ) : (
              <span className="inline-block h-4 rounded-full w-72 bg-slate-200 animate-pulse"></span>
            )}
          </p>
          <p>
            <strong>RUT: </strong>
            {!loading ? (
              requestData?.respuestas?.rut
            ) : (
              <span className="inline-block h-4 rounded-full w-72 bg-slate-200 animate-pulse"></span>
            )}
          </p>
          <p>
            <strong>Email: </strong>
            {!loading ? (
              requestData?.respuestas?.email
            ) : (
              <span className="inline-block h-4 rounded-full w-72 bg-slate-200 animate-pulse"></span>
            )}
          </p>
          <p>
            <strong>Teléfono: </strong>
            {!loading ? (
              requestData?.respuestas?.phone
            ) : (
              <span className="inline-block h-4 rounded-full w-72 bg-slate-200 animate-pulse"></span>
            )}
          </p>
        </div>
      </div>
      {/* Datos de la solicitud */}
      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-2">Datos de la solicitud</h2>
        {respuestas}
        {documentosForm && (
          <div>
            <h2 className="text-xl mt-6 mb-2 font-semibold">Documentos adjuntos en la solicitud</h2>
            {documentosForm}
          </div>
        )}
        {documentosSubidos && (
          <div>
            <h2 className="text-xl mt-6 mb-2 font-semibold">Documentos asociados</h2>
            {documentosSubidos}
          </div>
        )}
      </div>
    </div>
  );
};

export default DetalleSolicitud;
