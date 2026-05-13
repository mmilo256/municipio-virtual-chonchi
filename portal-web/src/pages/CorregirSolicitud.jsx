import { useParams } from 'react-router-dom'; // Para obtener parámetros de la URL (como el ID de la solicitud)
import { useEffect, useState } from 'react'; // Hooks de React para efectos y estados
import { obtenerSolicitudPorCodigo } from '../services/requests.service';
import Container from '../components/ui/Container';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import { formatDate } from '../utils/utils';
import StatusTag from '../components/ui/StatusTag';
import InputRenderer from '../components/form/Inputs/InputRenderer';
import Button from '../components/ui/buttons/Button';

const CorregirSolicitud = () => {
  // Obtiene el ID de la solicitud desde los parámetros de la URL
  const { codigo, slug } = useParams();

  const [solicitud, setSolicitud] = useState({});
  const [respuestasNuevas, setRespuestasNuevas] = useState([]);

  const pasosFormulario = solicitud?.tramite?.formulario?.pasos_formularios ?? [];

  /* const observacion = {
    mensaje: solicitud?.observacion,
    requiere_correccion: solicitud?.requiere_correccion,
    campos_correccion: solicitud?.campos_correccion ? JSON.parse(solicitud?.campos_correccion) : [],
  }; */

  const campos = [];
  pasosFormulario.forEach((paso) => {
    paso?.campos_formularios?.forEach((campo) => {
      campos.push(campo);
    });
  });

  console.log(campos);

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

  const handleOnChange = (nombreInterno, valor) => {
    setRespuestasNuevas((prev) => ({
      ...prev,
      [nombreInterno]: valor,
    }));
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
      <p className="bg-blue-50 p-4 rounded border border-blue-200 text-blue-700">
        <strong>Observaciones:</strong> {solicitud?.observacion}
      </p>
      <div>
        <form className="bg-white p-8 rounded shadow shadow-slate-400 mt-6 flex flex-col gap-4">
          {campos &&
            campos.length !== 0 &&
            campos.map((campo) => (
              <InputRenderer
                key={campo.id}
                config={campo.config}
                obligatorio={campo.obligatorio}
                textoAyuda={campo.texto_ayuda}
                value={respuestasNuevas[campo.nombre_interno]}
                onChange={(e) => {
                  handleOnChange(campo.nombre_interno, e.target.value);
                }}
                etiqueta={campo.etiqueta}
                slug={campo.nombre_interno}
                tipo={campo.tipo}
              />
            ))}
          <div className="flex gap-4 mt-4 justify-end">
            <Button variant="secondary" label="Volver" />
            <Button label="Enviar corrección" />
          </div>
        </form>
      </div>
    </Container>
  );
};

export default CorregirSolicitud;
