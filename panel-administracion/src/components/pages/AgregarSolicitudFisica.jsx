import { useEffect, useState } from 'react';
import Breadcrumbs from '../ui/Breadcrumbs';
import { useNavigate, useParams } from 'react-router-dom';
import { obtenerTramitePorSlug } from '../../services/tramites.service';
import { obtenerFormularioPorId } from '../../services/formularios.service';
import InputRenderer from '../Inputs/InputRenderer';
import Button from '../ui/Button';
import { camposContacto } from '../../utils/camposContacto';
import { sanitizarValor } from '../../utils/sanitizadores';
import { agregarSolicitud } from '../../services/solicitudes.service';

const AgregarSolicitudFisica = () => {
  const [tramite, setTramite] = useState({});
  const [formulario, setFormulario] = useState({});

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { slug } = useParams();

  const [respuestas, setRespuestas] = useState({});

  const breadcrumbs = [
    { label: tramite.titulo, href: '/permisos-transitorios' },
    { label: `Agregar solicitud`, href: '/permisos-transitorios/agregar' },
  ];

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const response = await obtenerTramitePorSlug(slug);
        setTramite(response.data);
        const responseFormulario = await obtenerFormularioPorId(response.data.formulario_id);
        setFormulario(responseFormulario.data);
      } catch (error) {
        alert(error.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [slug]);

  const handleChange = (campo, valor) => {
    const nuevoValor = sanitizarValor(campo, valor);
    setRespuestas((prev) => ({
      ...prev,
      [campo.nombre_interno]: {
        slug: campo.nombre_interno,
        valor: nuevoValor,
        campo_id: campo.id,
        tipo: campo.tipo,
      },
    }));
  };

  const onSubmit = async () => {
    setLoading(true);
    const formData = new FormData();
    const newRespuestas = [];
    const documentos = [];
    const infoSolicitante = [];
    formData.append('tramiteId', tramite.id);
    Object.values(respuestas)?.forEach((item) => {
      if (
        item.slug === 'nombreCompleto' ||
        item.slug === 'rut' ||
        item.slug === 'email' ||
        item.slug === 'telefono' ||
        item.slug === 'direccion'
      ) {
        infoSolicitante.push(item);
        return;
      }
      if (item.tipo !== 'file') {
        newRespuestas.push(item);
      } else {
        documentos.push(item);
      }
    });
    formData.append('infoSolicitante', JSON.stringify(infoSolicitante));
    formData.append('respuestas', JSON.stringify(newRespuestas));
    for (const item of documentos) {
      formData.append(item.slug, item.valor);
    }
    formData.append('documentosMeta', JSON.stringify(documentos));
    try {
      const response = await agregarSolicitud(formData);
      console.log(response);
      navigate(`../${slug}`);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[60rem] mx-auto">
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <div className="my-4">
        <h1 className="text-2xl font-bold">Agregar solicitud física</h1>
        <h2 className="text-xl font-bold text-slate-500">Trámite: {tramite.titulo}</h2>
      </div>
      <form className="grid grid-cols-5 gap-x-6" action="">
        <div className="col-span-2">
          <h3 className="text-xl font-bold mb-2">Datos del solicitante</h3>
          <div className="mb-4 flex flex-col gap-y-2">
            {camposContacto?.map((campo) => (
              <InputRenderer
                key={campo.id}
                obligatorio={campo.obligatorio}
                onChange={(e) => {
                  handleChange(campo, e.target.value);
                }}
                textoAyuda={campo.texto_ayuda}
                config={campo.config}
                placeholder={campo.placeholder}
                opciones={campo.opciones}
                etiqueta={campo.etiqueta}
                slug={campo.nombre_interno}
                tipo={campo.tipo}
                value={respuestas[campo.nombre_interno]?.valor}
              />
            ))}
          </div>
        </div>
        <div className="bg-[#fff] p-8 rounded border col-span-3">
          {formulario?.pasos_formularios?.map((paso, index) => (
            <div key={paso.id}>
              <h3 className="text-xl font-bold mb-2">
                {index + 1}. {paso.titulo}
              </h3>
              <div className="mb-4 flex flex-col gap-y-2">
                {paso?.campos_formularios?.map((campo) => (
                  <InputRenderer
                    tipo={campo.tipo}
                    onChange={(e) => {
                      if (campo.tipo === 'file') {
                        handleChange(campo, e.target.files[0] || null);
                      } else {
                        handleChange(campo, e.target.value);
                      }
                    }}
                    config={campo.config}
                    obligatorio={campo.obligatorio}
                    placeholder={campo.placeholder}
                    opciones={campo.opciones}
                    textoAyuda={campo.textoAyuda}
                    slug={campo.nombre_interno}
                    etiqueta={campo.etiqueta}
                    value={respuestas[campo.nombre_interno]?.valor}
                    key={campo.id}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-end col-span-full mt-4">
          <Button
            isLoading={loading}
            onClick={onSubmit}
            variant="secondary"
            text="Subir solicitud"
          />
        </div>
      </form>
    </div>
  );
};

export default AgregarSolicitudFisica;
