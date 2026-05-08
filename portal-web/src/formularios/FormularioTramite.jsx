import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { obtenerFormularioDelTramite } from '../services/tramites.service';
import { useState } from 'react';
import FormStepper from '../components/form/FormStepper';
import InputRenderer from '../components/form/Inputs/InputRenderer';
import { sanitizarValor } from '../utils/sanitizadores';
import { validarCampo } from '../utils/validaciones';
import { createRequest } from '../services/requests.service';
import Accordion from '../components/ui/Accordion';
import useAuthStore from '../stores/useAuthStore';
import { camposContacto } from '../data/camposContacto';
import { renderValorRespuesta } from '../utils/utils';

const FormularioTramite = () => {
  const { slug } = useParams();

  const navigate = useNavigate();

  const user = useAuthStore((state) => state.sessionData);
  const userNombreCompleto = `${user.nombres} ${user.apellidos}`;

  const [formulario, setFormulario] = useState({});
  const [pasoActual, setPasoActual] = useState(0);
  const [respuestas, setRespuestas] = useState({});
  const [infoContacto, setInfoContacto] = useState({
    nombreCompleto: userNombreCompleto || '',
    rut: user.run || '',
    email: '',
    telefono: '',
    direccion: '',
  });

  const [loading, setLoading] = useState(false);

  const [mostrarErroresPaso, setMostrarErroresPaso] = useState(false);

  // Cargar formulario
  useEffect(() => {
    (async () => {
      const response = await obtenerFormularioDelTramite(slug);
      setFormulario(response.data);
    })();
  }, [slug]);

  const pasosOriginales = formulario.pasos_formularios || [];

  const newPasos = [
    {
      id: 'contacto',
      titulo: 'Información de contacto',
      tipoPaso: 'contacto',
      descripcion:
        'Estos datos se utilizarán para comunicarnos contigo y avisarte sobre el estado de tu solicitud.',
      campos_formularios: [],
    },
    ...pasosOriginales.map((paso) => ({
      ...paso,
      tipoPaso: 'dinamico',
    })),
    {
      id: 'confirmacion',
      titulo: 'Confirmar formulario',
      tipoPaso: 'confirmacion',
      descripcion: 'Confirma tus respuestas antes de enviar el formulario',
      campos_formularios: [],
    },
  ];

  const totalPasos = newPasos?.length - 1;
  const paso = newPasos?.[pasoActual];

  // Manejar cambio de estado de las respuestas
  const handleChange = (campo, valor) => {
    const nuevoValor = sanitizarValor(campo, valor);
    setRespuestas((prev) => ({
      ...prev,
      [campo.nombre_interno]: nuevoValor,
    }));
  };

  const handleChangeContacto = (campo, valor) => {
    const nuevoValor = sanitizarValor(campo, valor);
    setInfoContacto((prev) => ({
      ...prev,
      [campo.nombre_interno]: nuevoValor,
    }));
  };

  // Validar paso actual
  const validarPasoActual = () => {
    if (paso.tipoPaso === 'contacto') {
      const errores = {};

      camposContacto.forEach((campo) => {
        const valor = infoContacto[campo.nombre_interno];
        const error = validarCampo(campo.tipo, valor, campo.config, campo.obligatorio);

        if (error) {
          errores[campo.nombre_interno] = error;
        }
      });

      return Object.keys(errores).length === 0;
    }

    if (paso.tipoPaso === 'dinamico') {
      const campos = paso.campos_formularios || [];
      const errores = {};

      campos.forEach((campo) => {
        const valor = respuestas[campo.nombre_interno];
        const error = validarCampo(campo.tipo, valor, JSON.parse(campo.config), campo.obligatorio);

        if (error) {
          errores[campo.nombre_interno] = error;
        }
      });

      return Object.keys(errores).length === 0;
    }

    return true;
  };

  // Volver al paso anterior
  const volverAlPasoAnterior = () => {
    if (pasoActual > 0) {
      setPasoActual((prev) => prev - 1);
    } else {
      navigate('../' + slug);
    }
  };

  const enviarFormulario = async () => {
    // Ir al paso siguiente
    const esValido = validarPasoActual();
    if (!esValido) {
      setMostrarErroresPaso(true);
      return;
    }
    setMostrarErroresPaso(false);
    if (pasoActual < totalPasos) {
      setPasoActual((prev) => prev + 1);
    } else {
      // Enviar formulario
      const newRespuestas = [];
      const archivos = [];
      newPasos.forEach((paso) => {
        paso.campos_formularios.forEach((campo) => {
          const valor = respuestas[campo.nombre_interno];

          if (valor !== undefined && valor !== null && valor !== '') {
            if (campo.tipo === 'file') {
              archivos.push({
                nombre: campo.nombre_interno,
                campo_id: campo.id,
                valor,
              });
            } else {
              newRespuestas.push({
                campo_id: campo.id,
                valor,
              });
            }
          }
        });
      });

      const data = new FormData();

      data.append('tramite', slug);
      data.append('formularioId', formulario.id);
      data.append('canal', 'digital');
      data.append('respuestas', JSON.stringify(newRespuestas));
      data.append('infoContacto', JSON.stringify(infoContacto));

      archivos.forEach((archivo) => {
        console.log(archivo);
        data.append(archivo.nombre, archivo.valor);
      });

      data.append(
        'archivosMeta',
        JSON.stringify(
          archivos.map((item) => ({
            campo_id: item.campo_id,
            slug: item.nombre,
          })),
        ),
      );

      try {
        setLoading(true);
        const response = await createRequest(data);
        navigate(`../${slug}/enviado`, { state: { solicitud: response.data } });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-medium text-secondary mb-1">{formulario?.titulo}</h1>
      <p className="text-sm text-gray-600 mb-6">{formulario?.descripcion}</p>
      <div className="grid grid-cols-3">
        <FormStepper pasos={newPasos} pasoActual={pasoActual} />
        {newPasos?.length > 0 && (
          <div className="bg-white shadow shadow-slate-400 p-6 rounded col-span-2">
            <h2 className="text-2xl font-medium text-secondary mb-1">
              {`${pasoActual + 1}. ${newPasos[pasoActual]?.titulo}`}
            </h2>
            <p className="text-sm text-slate-500 mb-4">{newPasos[pasoActual]?.descripcion}</p>
            <form className={`flex flex-col ${pasoActual === totalPasos ? 'gap-y-2' : 'gap-y-4'}`}>
              {paso?.tipoPaso === 'contacto' &&
                camposContacto.map((campo) => (
                  <InputRenderer
                    disabled={campo.disabled}
                    tipo={campo.tipo}
                    key={campo.id}
                    mostrarErrores={mostrarErroresPaso}
                    placeholder={campo.placeholder}
                    textoAyuda={campo.texto_ayuda}
                    opciones={campo.opciones}
                    config={campo.config}
                    obligatorio={campo.obligatorio}
                    etiqueta={campo.etiqueta}
                    value={infoContacto[campo.nombre_interno] || ''}
                    onChange={(e) => {
                      handleChangeContacto(campo, e.target.value);
                    }}
                  />
                ))}
              {paso?.tipoPaso === 'dinamico' &&
                newPasos[pasoActual].campos_formularios.map((campo) => {
                  return (
                    <InputRenderer
                      tipo={campo.tipo}
                      key={campo.id}
                      slug={campo.slug}
                      mostrarErrores={mostrarErroresPaso}
                      placeholder={campo.placeholder}
                      textoAyuda={campo.texto_ayuda}
                      opciones={campo.opciones}
                      config={JSON.parse(campo.config)}
                      obligatorio={campo.obligatorio}
                      etiqueta={campo.etiqueta}
                      value={respuestas[campo.nombre_interno] || ''}
                      onChange={(e) => {
                        if (campo.tipo === 'file') {
                          handleChange(campo, e.target.files[0] || null);
                        } else {
                          handleChange(campo, e.target.value);
                        }
                      }}
                    />
                  );
                })}
              {paso?.tipoPaso === 'confirmacion' && (
                <>
                  <Accordion isOpen title="Información de contacto">
                    <div className="space-x-1">
                      <strong>Nombre completo:</strong>
                      <span>{renderValorRespuesta(infoContacto.nombreCompleto)}</span>
                    </div>
                    <div className="space-x-1">
                      <strong>RUT:</strong>
                      <span>{renderValorRespuesta(infoContacto.rut)}</span>
                    </div>
                    <div className="space-x-1">
                      <strong>Correo electrónico:</strong>
                      <span>{renderValorRespuesta(infoContacto.email)}</span>
                    </div>
                    <div className="space-x-1">
                      <strong>Número de teléfono:</strong>
                      <span>{renderValorRespuesta(infoContacto.telefono)}</span>
                    </div>
                    <div className="space-x-1">
                      <strong>Dirección:</strong>
                      <span>{renderValorRespuesta(infoContacto.direccion)}</span>
                    </div>
                  </Accordion>
                  {formulario?.pasos_formularios?.map((paso) => (
                    <Accordion title={paso.titulo} key={paso.id}>
                      {paso.campos_formularios.map((campo) => (
                        <div key={campo.id} className="space-x-1">
                          <strong>{campo.etiqueta}:</strong>
                          <span>{renderValorRespuesta(respuestas[campo.nombre_interno])}</span>
                        </div>
                      ))}
                    </Accordion>
                  ))}
                </>
              )}
            </form>
            <div className="flex gap-2 justify-end mt-6">
              <button onClick={volverAlPasoAnterior} className="border border-slate-400 p-2">
                Atrás
              </button>
              <button onClick={enviarFormulario} className="border border-slate-400 p-2">
                {pasoActual === totalPasos
                  ? loading
                    ? 'Cargando...'
                    : 'Enviar formulario'
                  : 'Siguiente'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormularioTramite;
