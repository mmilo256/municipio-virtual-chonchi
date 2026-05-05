import { FaRegLightbulb } from 'react-icons/fa';
import Breadcrumbs from '../ui/Breadcrumbs';
import Button from '../ui/Button';
import { ToastContainer } from 'react-toastify';
import { useEffect, useState } from 'react';
import { obtenerSolicitudPorCodigo } from '../../services/solicitudes.service';
import { useParams } from 'react-router-dom';
import { formatDate } from '../../utils/format';

const AprobarSolicitud = () => {
  const { codigo } = useParams();
  const [solicitud, setSolicitud] = useState({});

  const usuario = solicitud?.solicitud?.usuario;
  const config = solicitud?.solicitud?.tramite?.config;

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

  return (
    <div className="max-w-[60rem] mx-auto bg-[#fff] p-6 pt-0 mt-4 rounded border">
      <Breadcrumbs breadcrumbs={[]} />
      <h1 className="text-2xl font-bold mt-4">Aprobar solicitud</h1>
      <p className="mb-4 text-sm text-slate-500">
        Revisa la información antes de finalizar la solicitud.
      </p>
      <p className="bg-amber-50 border border-amber-200 p-2 rounded text-amber-600 mb-4 flex items-center gap-2">
        {' '}
        <FaRegLightbulb className="text-amber-600" /> Esta acción dará por finalizada la solicitud y
        se notificará automáticamente al solicitante.
      </p>
      <div>
        <h2 className="text-xl font-bold mb-2">Resumen de la solicitud</h2>
        <div className="grid grid-cols-2 gap-4 border p-4 rounded mb-4">
          <div>
            <p className="font-bold text-sm text-slate-500">CÓDIGO</p>
            <p className="font-bold">{codigo}</p>
          </div>
          <div>
            <p className="font-bold text-sm text-slate-500">TRÁMITE</p>
            <p className="font-bold">{solicitud?.solicitud?.tramite?.titulo}</p>
          </div>
          <div>
            <p className="font-bold text-sm text-slate-500">SOLICITANTE</p>
            <p className="font-bold">{`${usuario?.nombres} ${usuario?.apellidos}`}</p>
          </div>
          <div>
            <p className="font-bold text-sm text-slate-500">FECHA DE INGRESO</p>
            <p className="font-bold">
              {formatDate(solicitud?.solicitud?.createdAt, 'DD MMM YYYY, HH:mm')}
            </p>
          </div>
          <div>
            <p className="font-bold text-sm text-slate-500">CORREO ELECTRÓNICO</p>
            <p className="font-bold">{solicitud?.solicitud?.email_contacto}</p>
          </div>
          <div>
            <p className="font-bold text-sm text-slate-500">Teléfono</p>
            <p className="font-bold">{solicitud?.solicitud?.telefono_contacto}</p>
          </div>
        </div>
      </div>

      {/* <label className="block mb-1" htmlFor="destinatario">
        Agregar destinatario
      </label>
      <form className="flex gap-2">
        <select id="destinatario" className="block w-full border-2 rounded p-1">
          <option value="">-- Selecciona un destinatario --</option>
        </select>
        <button className="flex items-center justify-center gap-2 bg-primary text-white hover:bg-primaryHover rounded py-2 w-40">
          {' '}
          <IoIosAddCircleOutline size={25} /> Agregar
        </button>
      </form>
      <div className="mt-4"></div>
      <hr className="my-4" />
      {
        <button
          className="block py-1 px-4 text-blue-500 border underline font-bold"
          target="_blank"
          type="button"
        >
          DECRETO.PDF
        </button>
      } */}

      <div className="mt-10 flex justify-end gap-2">
        <Button variant="primary" text="Volver" />
        <Button variant="secondary" text="Aprobar solicitud" />
      </div>
      <ToastContainer />
    </div>
  );
};

export default AprobarSolicitud;
