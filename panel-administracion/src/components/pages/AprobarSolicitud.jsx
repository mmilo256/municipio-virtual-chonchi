import { FaRegLightbulb } from 'react-icons/fa';
import Breadcrumbs from '../ui/Breadcrumbs';
import Button from '../ui/Button';
import { ToastContainer } from 'react-toastify';
import { useEffect, useState } from 'react';
import { aprobarSolicitud, obtenerSolicitudPorCodigo } from '../../services/solicitudes.service';
import { useNavigate, useParams } from 'react-router-dom';
import { formatDate } from '../../utils/format';
import { IoIosAddCircleOutline } from 'react-icons/io';
import Upload from '../ui/Upload';
import Modal from '../ui/Modal';
import LoadingOverlay from '../ui/LoadingOverlay';

const AprobarSolicitud = () => {
  const { codigo, slug } = useParams();
  const [solicitud, setSolicitud] = useState({});
  const [destinatarios, setDestinatarios] = useState([]);
  const [destinatarioActualSelect, setDestinatarioActualSelect] = useState('');
  const [destinatarioActualText, setDestinatarioActualText] = useState('');

  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('');

  const [modal, setModal] = useState(false);

  const [documentos, setDocumentos] = useState([]);

  const navigate = useNavigate();

  const config = solicitud?.solicitud?.tramite?.config
    ? JSON.parse(solicitud?.solicitud?.tramite?.config)
    : {};

  const destinatariosPredeterminados =
    config?.destinatarios?.destinatarios?.filter((correo) => !destinatarios.includes(correo)) || [];

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

  const agregarDestinatario = (origen) => {
    if (origen === 'select') {
      if (
        destinatarioActualSelect !== '' &&
        destinatarioActualSelect !== undefined &&
        destinatarioActualSelect !== null
      ) {
        setDestinatarios((prev) => [...prev, destinatarioActualSelect]);
        setDestinatarioActualSelect('');
      }
    }
    if (origen === 'text') {
      if (
        destinatarioActualText !== '' &&
        destinatarioActualText !== undefined &&
        destinatarioActualText !== null
      ) {
        setDestinatarios((prev) => [...prev, destinatarioActualText]);
        setDestinatarioActualText('');
      }
    }
  };

  const quitarDestinatario = (dest) => {
    const newDestinatarios = destinatarios.filter((destinatario) => destinatario !== dest);
    setDestinatarios(newDestinatarios);
  };

  const onChangeDocumentos = (nombre_interno, valor) => {
    setDocumentos((prev) => ({
      ...prev,
      [nombre_interno]: valor,
    }));
  };

  const onAprobarSolicitud = async () => {
    setLoadingText('Aprobando solicitud...');
    setLoading(true);
    const data = new FormData();

    data.append('codigo', codigo);

    Object.entries(documentos).forEach(([nombreInterno, doc]) => {
      data.append(nombreInterno, doc);
    });

    data.append('destinatarios', JSON.stringify(destinatarios));

    try {
      await aprobarSolicitud(codigo, data);
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
    <>
      <LoadingOverlay show={loading} text={loadingText} />
      <div className="max-w-[60rem] mx-auto bg-[#fff] p-6 pt-0 mt-4 rounded border">
        <Modal
          onClick={onAprobarSolicitud}
          btnText="Aprobar solicitud"
          loading={loading}
          title="Aprobar solicitud"
          modal={modal}
          toggleModal={() => {
            setModal(!modal);
          }}
        >
          <p>¿Está seguro que desea aprobar la solicitud?</p>
          <p>Esta acción da por finalizado el trámite y se notificará al solicitante.</p>
        </Modal>
        <Breadcrumbs breadcrumbs={[]} />
        <h1 className="text-2xl font-bold mt-4">Aprobar solicitud</h1>
        <p className="mb-4 text-sm text-slate-500">
          Revisa la información antes de finalizar la solicitud.
        </p>
        <p className="bg-amber-50 border border-amber-200 p-2 rounded text-amber-600 mb-4 flex items-center gap-2">
          {' '}
          <FaRegLightbulb className="text-amber-600" /> Esta acción dará por finalizada la solicitud
          y se notificará automáticamente al solicitante.
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

        {config?.archivos?.activo && config?.archivos?.archivos?.length !== 0 && (
          <div>
            {config?.archivos?.archivos?.map((ar) => (
              <Upload
                file={documentos[ar.nombre_interno]}
                setFile={(e) => {
                  onChangeDocumentos(ar.nombre_interno, e.target.files[0]);
                }}
                key={ar.etiqueta}
                label={ar.etiqueta}
              />
            ))}
            <hr className="my-4" />
          </div>
        )}

        {config?.destinatarios?.activo && (
          <div>
            <h3 className="text-xl font-bold">Notificar a terceros</h3>
            <p className="text-sm text-slate-500 mb-2">
              Indique las instituciones, organismos o personas que deban recibir copia de la
              resolución aprobada para fines informativos o de coordinación. El solicitante será
              notificado automáticamente.
            </p>
            <div className="mb-4">
              <label className="block mb-1" htmlFor="destinatario">
                Agregar destinatario
              </label>
              <form className="flex gap-2">
                <input
                  value={destinatarioActualText}
                  onChange={(e) => {
                    setDestinatarioActualText(e.target.value);
                  }}
                  className="block w-full border-2 rounded p-1"
                  type="text"
                />
                <button
                  onClick={() => {
                    agregarDestinatario('text');
                  }}
                  type="button"
                  className="flex items-center justify-center gap-2 bg-primary text-white hover:bg-primaryHover rounded py-2 w-40"
                >
                  {' '}
                  <IoIosAddCircleOutline size={25} /> Agregar
                </button>
              </form>
            </div>
            {config?.destinatarios?.destinatarios?.length !== 0 && (
              <div>
                <label className="block mb-1" htmlFor="destinatario">
                  Agregar destinatario predefinido
                </label>
                <form className="flex gap-2">
                  <select
                    value={destinatarioActualSelect}
                    onChange={(e) => {
                      setDestinatarioActualSelect(e.target.value);
                    }}
                    id="destinatario"
                    className="block w-full border-2 rounded p-1"
                  >
                    <option disabled value="">
                      -- Selecciona un destinatario --
                    </option>
                    {destinatariosPredeterminados?.map((dest) => (
                      <option key={dest} value={dest}>
                        {dest}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => {
                      agregarDestinatario('select');
                    }}
                    type="button"
                    className="flex items-center justify-center gap-2 bg-primary text-white hover:bg-primaryHover rounded py-2 w-40"
                  >
                    {' '}
                    <IoIosAddCircleOutline size={25} /> Agregar
                  </button>
                </form>
              </div>
            )}
            <div className="mt-4 space-x-2">
              {destinatarios.map((dest) => (
                <button
                  onClick={() => {
                    quitarDestinatario(dest);
                  }}
                  key={dest}
                  className="inline bg-green-50 hover:bg-green-200 py-1 px-4 rounded text-sm font-bold space-x-4"
                >
                  <span>{dest}</span>
                  <span className="text-green-800">X</span>
                </button>
              ))}
            </div>
            <hr className="my-4" />
          </div>
        )}

        <div className="mt-10 flex justify-end gap-2">
          <Button variant="primary" text="Volver" />
          <Button
            onClick={() => {
              setModal(true);
            }}
            variant="secondary"
            text="Aprobar solicitud"
          />
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default AprobarSolicitud;
