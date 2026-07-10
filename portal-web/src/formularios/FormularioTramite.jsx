import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { obtenerFormularioDelTramite } from '../services/tramites.service';
import { useState } from 'react';
import FormStepper from '../components/form/FormStepper';
import InputRenderer from '../components/form/Inputs/InputRenderer';
import { sanitizarValor } from '../utils/sanitizadores';
import { validarCampo } from '../utils/validaciones';
import { enviarSolicitud } from '../services/requests.service';
import Accordion from '../components/ui/Accordion';
import useAuthStore from '../stores/useAuthStore';
import { camposContacto } from '../data/camposContacto';
import { formatDate, renderValorRespuesta } from '../utils/utils';
import Button from '../components/ui/buttons/Button';
import LoadingOverlay from '../components/ui/LoadingOverlay';

const FormularioTramite = () => {
  const { slug } = useParams();

  const navigate = useNavigate();

  const user = useAuthStore((state) => state.sessionData);
  const userNombreCompleto = `${user.nombres} ${user.apellidos}`;

  const [formulario, setFormulario] = useState({});
  const [tramite, setTramite] = useState('');
  const [pasoActual, setPasoActual] = useState(0);
  const [respuestas, setRespuestas] = useState({});
  const [infoContacto, setInfoContacto] = useState({
    nombreCompleto: userNombreCompleto || '',
    rut: user?.run || '',
    email: '',
    telefono: '',
    direccion: '',
  });

  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('');

  const [mostrarErroresPaso, setMostrarErroresPaso] = useState(false);

  // Cargar formulario
  useEffect(() => {
    (async () => {
      setLoadingText('Cargando formulario...');
      setLoading(true);
      try {
        const response = await obtenerFormularioDelTramite(slug);
        setFormulario(response.data);
        setTramite(response.tramite);
      } catch (error) {
        alert(error.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [slug]);

  const pasosOriginales = formulario?.pasos_formularios || [];

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

  const limpiarCamposOcultos = (respuestasActuales) => {
    const nuevasRespuestas = { ...respuestasActuales };

    newPasos.forEach((paso) => {
      paso.campos_formularios.forEach((campo) => {
        const config = parseConfig(campo.config);

        if (!config.visibleWhen) return;

        const { campo_id, value } = config.visibleWhen;

        if (nuevasRespuestas[campo_id] !== value) {
          nuevasRespuestas[campo.nombre_interno] = campo.tipo === 'checkboxGroup' ? [] : '';
        }
      });
    });

    return nuevasRespuestas;
  };

  const pasoTieneCamposVisibles = (paso, respuestas) => {
    return paso.campos_formularios.some((campo) => {
      const config = parseConfig(campo.config);

      if (!config.visibleWhen) return true;

      return respuestas[config.visibleWhen.campo_id] === config.visibleWhen.value;
    });
  };

  useEffect(() => {
    const paso = newPasos[pasoActual];

    if (!paso || paso.tipoPaso !== 'dinamico') return;

    if (!pasoTieneCamposVisibles(paso, respuestas)) {
      setPasoActual((prev) => prev + 1);
    }
  }, [respuestas, pasoActual]);

  // Manejar cambio de estado de las respuestas
  const handleChange = (campo, valor) => {
    const nuevoValor = sanitizarValor(campo, valor);

    setRespuestas((prev) => {
      const nuevasRespuestas = {
        ...prev,
        [campo.nombre_interno]: nuevoValor,
      };

      return limpiarCamposOcultos(nuevasRespuestas);
    });
  };

  const handleChangeContacto = (campo, valor) => {
    const nuevoValor = sanitizarValor(campo, valor);
    setInfoContacto((prev) => ({
      ...prev,
      [campo.nombre_interno]: nuevoValor,
    }));
  };

  // Validar paso actual
  const validarPasoActual = (respuestasAValidar = respuestas) => {
    if (paso.tipoPaso === 'contacto') {
      const errores = {};

      camposContacto.forEach((campo) => {
        const valor = infoContacto[campo.nombre_interno];
        const error = validarCampo(campo.tipo, valor, campo.config, campo.obligatorio, { user });

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
        const config = parseConfig(campo.config);

        const visibleWhen = config?.visibleWhen;

        if (visibleWhen) {
          const valorCampoRelacionado = respuestasAValidar[visibleWhen.campo_id];

          if (valorCampoRelacionado !== visibleWhen.value) {
            return;
          }
        }

        const valor = respuestasAValidar[campo.nombre_interno];
        const error = validarCampo(campo.tipo, valor, config, campo.obligatorio, {
          user,
        });

        if (error) {
          errores[campo.nombre_interno] = error;
        }
      });

      return Object.keys(errores).length === 0;
    }

    return true;
  };

  const completarRespuestasVacias = () => {
    const nuevasRespuestas = { ...respuestas };

    newPasos.forEach((paso) => {
      paso.campos_formularios.forEach((campo) => {
        if (campo.tipo === 'file') return;

        if (nuevasRespuestas[campo.nombre_interno] === undefined) {
          nuevasRespuestas[campo.nombre_interno] = campo.tipo === 'checkboxGroup' ? [] : '';
        }
      });
    });

    setRespuestas(nuevasRespuestas);

    return nuevasRespuestas;
  };

  // Volver al paso anterior
  const volverAlPasoAnterior = () => {
    if (pasoActual === 0) {
      navigate('../' + slug);
      return;
    }

    let nuevoPaso = pasoActual - 1;

    while (nuevoPaso > 0) {
      const paso = newPasos[nuevoPaso];

      if (paso.tipoPaso !== 'dinamico' || pasoTieneCamposVisibles(paso, respuestas)) {
        break;
      }

      nuevoPaso--;
    }

    setPasoActual(nuevoPaso);
  };

  const enviarFormulario = async () => {
    // Ir al paso siguiente
    const respuestasCompletas = completarRespuestasVacias();
    const esValido = validarPasoActual(respuestasCompletas);
    if (!esValido) {
      setMostrarErroresPaso(true);
      return;
    }
    setMostrarErroresPaso(false);
    if (pasoActual < totalPasos) {
      setPasoActual((prev) => prev + 1);
    } else {
      // Enviar formulario
      setLoadingText('Enviando solicitud a la Municipalidad de Chonchi...');
      setLoading(true);
      const newRespuestas = [];
      const archivos = [];
      newPasos.forEach((paso) => {
        paso.campos_formularios.forEach((campo) => {
          const valor = respuestas[campo.nombre_interno];

          if (campo.tipo === 'file') {
            if (valor) {
              archivos.push({
                nombre: campo.nombre_interno,
                campo_id: campo.id,
                valor,
              });
            }

            return;
          }

          newRespuestas.push({
            campo_id: campo.id,
            nombre: campo.nombre_interno,
            valor: valor ?? '',
          });
        });
      });

      const data = new FormData();

      data.append('tramite', slug);
      data.append('formularioId', formulario.id);
      data.append('canal', 'digital');
      data.append('respuestas', JSON.stringify(newRespuestas));
      data.append('infoContacto', JSON.stringify(infoContacto));

      archivos.forEach((archivo) => {
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
        const response = await enviarSolicitud(data);
        navigate(`../${slug}/enviado`, { state: { solicitud: response.data } });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  // BORRAR
  const fechas = [
    {
      fecha: '2026-06-15',
      label: 'Lunes 15 de junio',
      disponibles: 6,
      bloques: [
        {
          inicio: '09:00',
          termino: '09:20',
          disponible: false,
          estado: 'agendado',
        },
        {
          inicio: '09:20',
          termino: '09:40',
          disponible: false,
          estado: 'agendado',
        },
        {
          inicio: '09:40',
          termino: '10:00',
          disponible: true,
          estado: 'disponible',
        },
        {
          inicio: '10:00',
          termino: '10:20',
          disponible: true,
          estado: 'disponible',
        },
        {
          inicio: '10:20',
          termino: '10:40',
          disponible: false,
          estado: 'agendado',
        },
        {
          inicio: '10:40',
          termino: '11:00',
          disponible: true,
          estado: 'disponible',
        },
        {
          inicio: '11:00',
          termino: '11:20',
          disponible: true,
          estado: 'disponible',
        },
        {
          inicio: '11:20',
          termino: '11:40',
          disponible: false,
          estado: 'agendado',
        },
        {
          inicio: '11:40',
          termino: '12:00',
          disponible: true,
          estado: 'disponible',
        },
      ],
    },
    {
      fecha: '2026-06-22',
      label: 'Lunes 22 de junio',
      disponibles: 4,
      bloques: [
        {
          inicio: '09:00',
          termino: '09:20',
          disponible: false,
          estado: 'agendado',
        },
        {
          inicio: '09:20',
          termino: '09:40',
          disponible: false,
          estado: 'agendado',
        },
        {
          inicio: '09:40',
          termino: '10:00',
          disponible: false,
          estado: 'agendado',
        },
        {
          inicio: '10:00',
          termino: '10:20',
          disponible: true,
          estado: 'disponible',
        },
        {
          inicio: '10:20',
          termino: '10:40',
          disponible: false,
          estado: 'agendado',
        },
        {
          inicio: '10:40',
          termino: '11:00',
          disponible: true,
          estado: 'disponible',
        },
        {
          inicio: '11:00',
          termino: '11:20',
          disponible: true,
          estado: 'disponible',
        },
        {
          inicio: '11:20',
          termino: '11:40',
          disponible: false,
          estado: 'agendado',
        },
        {
          inicio: '11:40',
          termino: '12:00',
          disponible: true,
          estado: 'disponible',
        },
      ],
    },
    {
      fecha: '2026-06-29',
      label: 'Lunes 29 de junio',
      disponibles: 8,
      bloques: [
        {
          inicio: '09:00',
          termino: '09:20',
          disponible: true,
          estado: 'disponible',
        },
        {
          inicio: '09:20',
          termino: '09:40',
          disponible: true,
          estado: 'disponible',
        },
        {
          inicio: '09:40',
          termino: '10:00',
          disponible: false,
          estado: 'agendado',
        },
        {
          inicio: '10:00',
          termino: '10:20',
          disponible: true,
          estado: 'disponible',
        },
        {
          inicio: '10:20',
          termino: '10:40',
          disponible: true,
          estado: 'disponible',
        },
        {
          inicio: '10:40',
          termino: '11:00',
          disponible: true,
          estado: 'disponible',
        },
        {
          inicio: '11:00',
          termino: '11:20',
          disponible: true,
          estado: 'disponible',
        },
        {
          inicio: '11:20',
          termino: '11:40',
          disponible: true,
          estado: 'disponible',
        },
        {
          inicio: '11:40',
          termino: '12:00',
          disponible: true,
          estado: 'disponible',
        },
      ],
    },
  ];

  const parseConfig = (config) => {
    if (!config) return {};
    if (typeof config !== 'object') return JSON.parse(config);
    return config;
  };

  return (
    <>
      <LoadingOverlay show={loading} text={loadingText} />
      <div className="w-full max-w-5xl mx-auto p-6">
        <h1 className="text-3xl font-medium text-secondary mb-1">{tramite?.titulo}</h1>
        <p className="text-sm text-gray-600 mb-6">{tramite?.descripcion_corta}</p>
        <div className="grid grid-cols-3">
          <FormStepper className="hidden md:flex" pasos={newPasos} pasoActual={pasoActual} />
          {newPasos?.length > 0 && (
            <div className="bg-white shadow shadow-slate-400 p-6 rounded col-span-full md:col-span-2">
              <h2 className="text-2xl font-medium text-secondary mb-1">
                {`${pasoActual + 1}. ${newPasos[pasoActual]?.titulo}`}
              </h2>
              <p className="text-sm text-slate-500 mb-4">{newPasos[pasoActual]?.descripcion}</p>
              <form className="flex flex-col gap-y-2">
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
                      contexto={{ user }}
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
                        respuestas={respuestas}
                        fechas={fechas}
                        mostrarErrores={mostrarErroresPaso}
                        placeholder={campo.placeholder}
                        textoAyuda={campo.texto_ayuda}
                        contexto={{ user }}
                        opciones={campo.opciones}
                        config={parseConfig(campo.config)}
                        obligatorio={campo.obligatorio}
                        etiqueta={campo.etiqueta}
                        value={
                          campo.tipo === 'checkboxGroup'
                            ? respuestas[campo.nombre_interno] || []
                            : respuestas[campo.nombre_interno] || ''
                        }
                        onChange={(e) => {
                          if (campo.tipo === 'file') {
                            handleChange(campo, e.target.files[0] || null);
                            return;
                          }

                          if (campo.tipo === 'checkbox') {
                            handleChange(campo, e.target.checked);
                            return;
                          }

                          if (campo.tipo === 'checkboxGroup') {
                            const valorActual = respuestas[campo.nombre_interno] || [];
                            const valorCheckbox = e.target.value;

                            if (e.target.checked) {
                              handleChange(campo, [...valorActual, valorCheckbox]);
                            } else {
                              handleChange(
                                campo,
                                valorActual.filter((item) => item !== valorCheckbox),
                              );
                            }

                            return;
                          }
                          handleChange(campo, e.target.value);
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
                            {campo.tipo === 'date' ? (
                              <span>
                                {formatDate(
                                  renderValorRespuesta(respuestas[campo.nombre_interno]),
                                  1,
                                )}
                              </span>
                            ) : (
                              <span>{renderValorRespuesta(respuestas[campo.nombre_interno])}</span>
                            )}
                          </div>
                        ))}
                      </Accordion>
                    ))}
                  </>
                )}
              </form>
              <div className="flex gap-2 justify-end mt-6">
                <Button
                  disabled={loading}
                  onClick={volverAlPasoAnterior}
                  label="Atrás"
                  variant="secondary"
                />
                <Button
                  onClick={enviarFormulario}
                  isLoading={loading}
                  label={pasoActual === totalPasos ? 'Enviar formulario' : 'Siguiente'}
                  variant="primary"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default FormularioTramite;
