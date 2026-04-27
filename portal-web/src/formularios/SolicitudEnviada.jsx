import { Navigate, useLocation } from 'react-router-dom';
import Button from '../components/ui/buttons/Button';
import Container from '../components/ui/Container';
import { formatDate } from '../utils/utils';

const SolicitudEnviada = () => {
  const location = useLocation();
  const solicitud = location.state?.solicitud;

  if (!solicitud) {
    return <Navigate to="/inicio" />;
  }

  return (
    <Container>
      <div className="bg-white max-w-[50rem] mx-auto mt-10 border rounded overflow-hidden">
        <div className="bg-green-50 p-10">
          <h1 className="text-center mb-2 text-3xl font-bold text-green-900">
            Tu solicitud fue realizada con éxito
          </h1>
          <p className="text-center text-green-700">
            Hemos recibido tu solicitud y será revisada por el área correspondiente. Te
            notificaremos el resultado a través de los medios de contacto registrados.
          </p>
        </div>
        <div className="p-10">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 border p-2 rounded">
              <p className="mb-1 uppercase text-sm text-slate-500">Código de solicitud</p>
              <p className="font-bold">{solicitud.codigo}</p>
            </div>
            <div className="bg-slate-50 border p-2 rounded">
              <p className="mb-1 uppercase text-sm text-slate-500">Fecha de envío</p>
              <p className="font-bold">{formatDate(solicitud.fechaSolicitud, 2)}</p>
            </div>
            <div className="bg-slate-50 border p-2 rounded">
              <p className="mb-1 uppercase text-sm text-slate-500">Trámite solicitado</p>
              <p className="font-bold">{solicitud.tramite.titulo}</p>
            </div>
            <div className="bg-slate-50 border p-2 rounded">
              <p className="mb-1 uppercase text-sm text-slate-500">Estado actual</p>
              <p className="font-bold">Pendiente</p>
            </div>
          </div>
          <div className="mt-10">
            <h2 className="text-lg font-bold">Información de contacto</h2>
            <p className="text-slate-500">
              Esta información sera utilizada para informar sobre el estado de su solicitud
            </p>
            <hr className="my-4" />
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="mb-1 uppercase text-sm text-slate-500">SOLICITANTE</h3>
                <p className="font-bold">{solicitud.solicitante.nombre}</p>
              </div>

              <div>
                <h3 className="mb-1 uppercase text-sm text-slate-500">RUT</h3>
                <p className="font-bold">{solicitud.solicitante.run}</p>
              </div>

              <div>
                <h3 className="mb-1 uppercase text-sm text-slate-500">CORREO ELECTRÓNICO</h3>
                <p className="font-bold">{solicitud.solicitante.email}</p>
              </div>

              <div>
                <h3 className="mb-1 uppercase text-sm text-slate-500">TELÉFONO</h3>
                <p className="font-bold">{solicitud.solicitante.telefono}</p>
              </div>
            </div>
            <div className="bg-blue-50 text-blue-900 p-4 rounded-lg border border-blue-200 mt-8">
              <h2 className="font-bold mb-4">¿Qué sigue ahora?</h2>
              <ul className="space-y-4">
                <ol className="flex gap-x-2">
                  <span className="text bg-blue-100 h-6 w-6 text-xs font-bold flex items-center justify-center rounded-full">
                    1
                  </span>
                  <p className="text-sm">
                    La solicitud será revisada por el funcionario o unidad correspondiente.
                  </p>
                </ol>
                <ol className="flex gap-x-2">
                  <span className="text bg-blue-100 h-6 w-6 text-xs font-bold flex items-center justify-center rounded-full">
                    2
                  </span>
                  <p className="text-sm">
                    Si se requiere información adicional o documentación complementaria, se
                    contactará al solicitante.
                  </p>
                </ol>
                <ol className="flex gap-x-2">
                  <span className="text bg-blue-100 h-6 w-6 text-xs font-bold flex items-center justify-center rounded-full">
                    3
                  </span>
                  <p className="text-sm">
                    El resultado del trámite será informado mediante correo electrónico y/o en la
                    plataforma.
                  </p>
                </ol>
              </ul>
            </div>
            <div className="flex gap-4 mt-10 justify-end">
              <Button label="Ver mis solicitudes" />
              <Button variant="secondary" label="Volver al inicio" />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default SolicitudEnviada;
