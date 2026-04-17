import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { obtenerFormularioDelTramite } from '../services/tramites.service';
import { useState } from 'react';
import FormStepper from '../components/form/FormStepper';
import InputRenderer from '../components/form/Inputs/InputRenderer';
import { sanitizarValor } from '../utils/sanitizadores';
import { validarCampo } from '../utils/validaciones';
import { createRequest } from '../services/requests.service';

const FormularioTramite = () => {
  const { slug } = useParams();

  const navigate = useNavigate();

  const [formulario, setFormulario] = useState({});
  const [pasoActual, setPasoActual] = useState(0);
  const [respuestas, setRespuestas] = useState({});

  const [mostrarErroresPaso, setMostrarErroresPaso] = useState(false);

  const totalPasos = formulario.pasos_formularios?.length;

  // Cargar formulario
  useEffect(() => {
    (async () => {
      const response = await obtenerFormularioDelTramite(slug);
      setFormulario(response.data);
    })();
  }, [slug]);

  // Manejar cambio de estado de las respuestas
  const handleChange = (campo, valor) => {
    const nuevoValor = sanitizarValor(campo, valor);
    setRespuestas((prev) => ({
      ...prev,
      [campo.nombre_interno]: nuevoValor,
    }));
  };

  // Validar paso actual
  const validarPasoActual = () => {
    const campos = formulario.pasos_formularios?.[pasoActual]?.campos_formularios || [];

    const errores = {};

    campos.forEach((campo) => {
      const valor = respuestas[campo.nombre_interno];
      const error = validarCampo(campo.tipo, valor, JSON.parse(campo.config), campo.obligatorio);

      if (error) {
        errores[campo.nombre_interno] = error;
      }
    });

    return Object.values(errores).length === 0;
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
    console.log(esValido);
    if (!esValido) {
      setMostrarErroresPaso(true);
      return;
    }
    setMostrarErroresPaso(false);
    if (pasoActual < totalPasos - 1) {
      setPasoActual((prev) => prev + 1);
    } else {
      // Enviar formulario
      const newRespuestas = [];
      formulario.pasos_formularios.forEach((paso) => {
        paso.campos_formularios.forEach((campo) => {
          const valor = respuestas[campo.nombre_interno];

          if (valor !== undefined && valor !== null && valor !== '') {
            newRespuestas.push({
              campo_id: campo.id,
              valor,
            });
          }
        });
      });

      const data = {
        tramite: slug,
        formularioId: formulario.id,
        canal: 'web',
        respuestas: newRespuestas,
      };

      try {
        await createRequest(data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-medium text-secondary mb-1">{formulario.titulo}</h1>
      <p className="text-sm text-gray-600 mb-6">{formulario.descripcion}</p>
      <div className="grid grid-cols-3">
        <FormStepper pasos={formulario.pasos_formularios} pasoActual={pasoActual} />
        {formulario.pasos_formularios?.length > 0 && (
          <div className="bg-white shadow shadow-slate-400 p-6 rounded col-span-2">
            <h2 className="text-2xl font-medium text-secondary mb-1">
              {`${pasoActual + 1}. ${formulario.pasos_formularios[pasoActual].titulo}`}
            </h2>
            <p className="text-sm text-slate-500 mb-4">
              {formulario.pasos_formularios[pasoActual].descripcion}
            </p>
            <form className="flex flex-col gap-y-4">
              {formulario.pasos_formularios[pasoActual].campos_formularios.map((campo) => {
                return (
                  <InputRenderer
                    tipo={campo.tipo}
                    key={campo.id}
                    mostrarErrores={mostrarErroresPaso}
                    placeholder={campo.placeholder}
                    textoAyuda={campo.texto_ayuda}
                    opciones={campo.opciones}
                    config={JSON.parse(campo.config)}
                    obligatorio={campo.obligatorio}
                    etiqueta={campo.etiqueta}
                    value={respuestas[campo.nombre_interno] || ''}
                    onChange={(e) => {
                      if (campo.tipo === 'archivo') {
                        handleChange(campo, e.target.files[0] || null);
                      } else {
                        handleChange(campo, e.target.value);
                      }
                    }}
                  />
                );
              })}
            </form>
            <div className="flex gap-2 justify-end mt-6">
              <button onClick={volverAlPasoAnterior} className="border border-slate-400 p-2">
                Atrás
              </button>
              <button onClick={enviarFormulario} className="border border-slate-400 p-2">
                Siguiente
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormularioTramite;
