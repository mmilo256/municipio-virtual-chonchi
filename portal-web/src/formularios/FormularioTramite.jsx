import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { obtenerFormularioDelTramite } from '../services/tramites.service';
import { useState } from 'react';
import FormStepper from '../components/form/FormStepper';
import InputRenderer from '../components/form/Inputs/InputRenderer';

const FormularioTramite = () => {
  const { slug } = useParams();

  const [formulario, setFormulario] = useState({});
  const [pasoActual, setPasoActual] = useState(0);
  const [respuestas, setRespuestas] = useState({});

  const totalPasos = formulario.pasos_formularios?.length;

  // Cargar formulario
  useEffect(() => {
    (async () => {
      const response = await obtenerFormularioDelTramite(slug);
      setFormulario(response.data);
    })();
  }, [slug]);

  // Manejar cambio de estado de las respuestas
  const handleChange = (slug, valor) => {
    setRespuestas((prev) => ({
      ...prev,
      [slug]: valor,
    }));
  };

  // Enviar formulario
  const enviarFormulario = () => {
    console.log(respuestas);
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
                    placeholder={campo.placeholder}
                    textoAyuda={campo.texto_ayuda}
                    opciones={campo.opciones}
                    config={JSON.parse(campo.config)}
                    obligatorio={campo.obligatorio}
                    etiqueta={campo.etiqueta}
                    value={respuestas[campo.nombre_interno] || ''}
                    onChange={(e) => {
                      if (campo.tipo === 'archivo') {
                        handleChange(campo.nombre_interno, e.target.files[0] || null);
                      } else {
                        handleChange(campo.nombre_interno, e.target.value);
                      }
                    }}
                  />
                );
              })}
            </form>
            <div className="mt-4 w-fit ml-auto">
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
