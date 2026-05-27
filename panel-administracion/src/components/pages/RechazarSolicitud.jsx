import { FaRegLightbulb } from 'react-icons/fa';
import Breadcrumbs from '../ui/Breadcrumbs';
import Button from '../ui/Button';
import { ToastContainer } from 'react-toastify';
import { useEffect, useState } from 'react';
import { obtenerSolicitudPorCodigo, rechazarSolicitud } from '../../services/solicitudes.service';
import { useNavigate, useParams } from 'react-router-dom';
import { formatDate } from '../../utils/format';
import Modal from '../ui/Modal';
import Input from '../ui/Input';

const RechazarSolicitud = () => {
  const { codigo, slug } = useParams();
  const [solicitud, setSolicitud] = useState({});

  const [motivoRechazo, setMotivoRechazo] = useState('');

  const [loading, setLoading] = useState(false);

  const [modal, setModal] = useState(false);

  const navigate = useNavigate();

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

  const onRechazarSolicitud = async () => {
    setLoading(true);
    const data = {
      codigo,
      motivo: motivoRechazo,
    };

    try {
      const res = await rechazarSolicitud(codigo, data);
      console.log(res);
      navigate(`../${slug}/${codigo}`);
    } catch (error) {
      console.log(error);
      alert(error.message);
    } finally {
      setLoading(false);
      setModal(false);
    }
  };

  return (
    <div className="max-w-[60rem] mx-auto bg-[#fff] p-6 pt-0 mt-4 rounded border">
      <Modal
        onClick={onRechazarSolicitud}
        btnText="Rechazar solicitud"
        loading={loading}
        title="Rechazar solicitud"
        modal={modal}
        toggleModal={() => {
          setModal(!modal);
        }}
      >
        <p>¿Está seguro que desea rechazar la solicitud?</p>
        <p>Esta acción da por finalizado el trámite y se notificará al solicitante.</p>
        <p className="mt-4">
          Motivo del rechazo: <strong>{motivoRechazo}</strong>
        </p>
      </Modal>
      <Breadcrumbs breadcrumbs={[]} />
      <h1 className="text-2xl font-bold mt-4">Rechazar solicitud</h1>
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
            <p className="font-bold">{solicitud?.solicitud?.nombre_contacto}</p>
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

      <hr className="mt-6 mb-4" />

      <form>
        <Input
          label="Motivo del rechazo"
          type="textarea"
          placeholder="¿Por qué se rechaza la solicitud?"
          value={motivoRechazo}
          onChange={setMotivoRechazo}
        />
      </form>

      <div className="mt-10 flex justify-end gap-2">
        <Button variant="primary" text="Volver" />
        <Button
          onClick={() => {
            if (motivoRechazo !== '') {
              setModal(true);
            }
          }}
          variant="secondary"
          text="Rechazar solicitud"
        />
      </div>
      <ToastContainer />
    </div>
  );
};

export default RechazarSolicitud;
