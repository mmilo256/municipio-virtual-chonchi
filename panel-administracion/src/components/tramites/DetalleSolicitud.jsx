import StatusTag from '../ui/StatusTag';
import { formatDate } from '../../utils/format';
import Breadcrumbs from '../ui/Breadcrumbs';
import { ToastContainer, toast } from 'react-toastify';
import { useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import OriginTag from '../ui/OriginTag';
import Button from '../ui/Button';
import { updateRequestStatus } from '../../services/requestsServices';

const DetalleSolicitud = ({
  requestData = [],
  actions,
  respuestas,
  documentosForm,
  documentosSubidos,
  status,
  breadcrumbs,
  loading,
  origen = 'digital',
}) => {
  const location = useLocation();

  const { id } = useParams();

  const [estado, setEstado] = useState('pendiente');

  useEffect(() => {
    if (location?.state?.showToast) {
      toast.success(location.state.toastMessage);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const cambiarEstado = async () => {
    try {
      await updateRequestStatus(id, estado);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  if (origen === '') {
    return null;
  }

  if (origen === 'fisico') {
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
          <OriginTag status={origen} />
        </div>
        {/* Fecha de la solicitud */}
        <p className="text-slate-500">
          <strong>Fecha de ingreso: </strong>
          {formatDate(requestData.createdAt, 'DD [de] MMMM [de] YYYY [a las] HH:mm')}
        </p>
        <label className="block mt-2 font-bold text-slate-600" htmlFor="statusSelect">
          Cambiar estado de la solicitud
        </label>
        <div className="flex gap-2">
          <select
            value={estado}
            onChange={(e) => {
              setEstado(e.target.value);
            }}
            className="p-2 border w-72"
            name="statusSelect"
            id="statusSelect"
          >
            <option value="pendiente">Pendiente</option>
            <option value="finalizada">Finalizada</option>
            <option value="rechazada">Rechazada</option>
          </select>
          <Button onClick={cambiarEstado} text="Aplicar" variant="primary" />
        </div>
        {/* Información del solicitante */}
        <div className="mt-4">
          <h2 className="text-xl mb-2 font-semibold">Información del solicitante</h2>
          <div className="bg-[#fff] p-4 shadow rounded">
            <p>
              <strong>Nombre organización: </strong>
              {!loading ? (
                requestData?.respuestas?.orgName
              ) : (
                <span className="inline-block h-4 rounded-full w-72 bg-slate-200 animate-pulse"></span>
              )}
            </p>
            <p>
              <strong>RUT organización: </strong>
              {!loading ? (
                requestData?.respuestas?.orgRut
              ) : (
                <span className="inline-block h-4 rounded-full w-72 bg-slate-200 animate-pulse"></span>
              )}
            </p>
            <p>
              <strong>Fecha de solicitud: </strong>
              {!loading ? (
                formatDate(requestData?.respuestas?.date, 'DD [de] MMMM [de] YYYY')
              ) : (
                <span className="inline-block h-4 rounded-full w-72 bg-slate-200 animate-pulse"></span>
              )}
            </p>
            <p>
              <strong>Estado: </strong>
              {!loading ? (
                requestData?.estado
              ) : (
                <span className="inline-block h-4 rounded-full w-72 bg-slate-200 animate-pulse"></span>
              )}
            </p>
          </div>
        </div>
        {/* Datos de la solicitud */}
        <div className="mt-4">
          {documentosSubidos && (
            <div>
              <h2 className="text-xl mt-6 mb-2 font-semibold">Documentos asociados</h2>
              {documentosSubidos}
            </div>
          )}
        </div>
      </div>
    );
  }

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
        <OriginTag status={origen} />
      </div>
      {/* Fecha de la solicitud */}
      <p className="text-slate-500">
        <strong>Fecha de ingreso: </strong>
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
