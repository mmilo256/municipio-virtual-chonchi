import { useParams } from 'react-router-dom'; // Para obtener parámetros de la URL (como el ID de la solicitud)
import { useEffect, useState } from 'react'; // Hooks de React para efectos y estados
import { enviarCorreccion, obtenerSolicitudPorCodigo } from '../services/requests.service';
import Container from '../components/ui/Container';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import { formatDate } from '../utils/utils';
import StatusTag from '../components/ui/StatusTag';
import InputRenderer from '../components/form/Inputs/InputRenderer';
import Button from '../components/ui/buttons/Button';
import { sanitizarValor } from '../utils/sanitizadores';
import { validarCampo } from '../utils/validaciones';

const CorregirSolicitud = () => {
  // Obtiene el ID de la solicitud desde los parámetros de la URL
  const { codigo, slug } = useParams();

  const [solicitud, setSolicitud] = useState({});
  const [respuestasNuevas, setRespuestasNuevas] = useState({});
  const [documentosNuevos, setDocumentosNuevos] = useState({});
  const [mostrarErroresPaso, setMostrarErroresPaso] = useState(false);

  const pasosFormulario = solicitud?.tramite?.formulario?.pasos_formularios ?? [];

  const observacion = {
    mensaje: solicitud?.observacion,
    requiere_correccion: solicitud?.requiere_correccion,
    campos_correccion: solicitud?.campos_correccion ? JSON.parse(solicitud?.campos_correccion) : [],
  };

  const campos = [];
  pasosFormulario.forEach((paso) => {
    paso?.campos_formularios?.forEach((campo) => {
      campos.push(campo);
    });
  });

  const camposFiltrados = campos.filter(
    (campo) => campo.id == observacion.campos_correccion[campo.nombre_interno]?.campo_id,
  );

  const breadcrumbs = [
    { label: 'Solicitudes', href: '/solicitudes' },
    { label: `Solicitud ${codigo}`, href: `/solicitudes/${slug}/${codigo}` },
  ];

  useEffect(() => {
    (async () => {
      try {
        const response = await obtenerSolicitudPorCodigo(codigo);
        setSolicitud(response.data.solicitud);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [codigo]);

  // Validar campos
  const validarPasoActual = () => {
    const errores = {};

    camposFiltrados.forEach((campo) => {
      const valor =
        campo.tipo === 'file'
          ? documentosNuevos[campo.nombre_interno]
          : respuestasNuevas[campo.nombre_interno];
      const error = validarCampo(campo.tipo, valor, JSON.parse(campo.config), campo.obligatorio);

      if (error) {
        errores[campo.nombre_interno] = error;
      }
    });

    return Object.keys(errores).length === 0;
  };

  // Manejar cambio de estado de las respuestas
  const handleChange = (campo, valor, tipo) => {
    if (tipo !== 'file') {
      const nuevoValor = sanitizarValor(campo, valor);
      setRespuestasNuevas((prev) => ({
        ...prev,
        [campo.nombre_interno]: {
          campo_id: campo.id,
          nombre_interno: campo.nombre_interno,
          valor: nuevoValor,
        },
      }));
    } else {
      setDocumentosNuevos((prev) => ({
        ...prev,
        [campo.nombre_interno]: {
          archivo: valor,
          campo_id: campo.id,
          nombre_interno: campo.nombre_interno,
        },
      }));
    }
  };

  const onEnviarCorreccion = async () => {
    const esValido = validarPasoActual();
    if (!esValido) {
      setMostrarErroresPaso(true);
      return;
    }

    const data = new FormData();

    data.append('respuestas', JSON.stringify(respuestasNuevas));
    Object.values(documentosNuevos).forEach((doc) => {
      data.append(doc.nombre_interno, doc.archivo);
    });
    data.append('documentosMeta', JSON.stringify(documentosNuevos));
    try {
      const response = await enviarCorreccion(codigo, data);
      console.log(response);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Container>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <h1 className="text-3xl font-bold mt-4">Corregir solicitud</h1>
      <p className="text-slate-600 mb-4">Revise el estado de su solicitud y sus respuestas.</p>
      <div className="bg-white p-4 rounded border shadow flex justify-between mb-4">
        <div>
          <p className="text-sm text-slate-600">CÓDIGO</p>
          <p className="font-bold">{solicitud?.codigo}</p>
        </div>
        <div>
          <p className="text-sm text-slate-600">TRÁMITE</p>
          <p className="font-bold">{solicitud?.tramite?.titulo}</p>
        </div>
        <div>
          <p className="text-sm text-slate-600">FECHA SOLICITUD</p>
          <p className="font-bold">{formatDate(solicitud?.createdAt, 2)}</p>
        </div>
        <div>
          <p className="text-sm text-slate-600">ESTADO</p>
          <p className="font-bold">
            <StatusTag status={solicitud?.estado} />
          </p>
        </div>
      </div>
      <p className="bg-amber-50 p-4 rounded border border-amber-200 text-amber-700">
        <strong>Observaciones:</strong> {solicitud?.observacion}
      </p>
      <div>
        <form className="bg-white p-8 rounded shadow shadow-slate-400 mt-6 flex flex-col gap-4">
          {camposFiltrados &&
            camposFiltrados.length !== 0 &&
            camposFiltrados.map((campo) => (
              <InputRenderer
                key={campo.id}
                mostrarErrores={mostrarErroresPaso}
                config={campo.config}
                opciones={campo.opciones}
                obligatorio={campo.obligatorio}
                textoAyuda={campo.texto_ayuda}
                etiqueta={campo.etiqueta}
                slug={campo.nombre_interno}
                tipo={campo.tipo}
                value={
                  campo.tipo === 'file'
                    ? documentosNuevos[campo.nombre_interno]?.archivo
                    : respuestasNuevas[campo.nombre_interno]?.valor
                }
                onChange={(e) => {
                  if (campo.tipo === 'file') {
                    handleChange(campo, e.target.files[0] || null, campo.tipo);
                  } else {
                    handleChange(campo, e.target.value, campo.tipo);
                  }
                }}
              />
            ))}
          <div className="flex gap-4 mt-4 justify-end">
            <Button type="button" variant="secondary" label="Volver" />
            <Button type="button" onClick={onEnviarCorreccion} label="Enviar corrección" />
          </div>
        </form>
      </div>
    </Container>
  );
};

export default CorregirSolicitud;
