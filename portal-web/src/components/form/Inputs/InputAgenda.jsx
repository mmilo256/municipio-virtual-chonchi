import { useState } from 'react';
import { validarCampo } from '../../../utils/validaciones';
import LoadingOverlay from '../../ui/LoadingOverlay';

const InputAgenda = ({
  mostrarErrores,
  value,
  tipo,
  onChange,
  fechas,
  contexto,
  obligatorio,
  textoAyuda,
  config,
}) => {
  const error = mostrarErrores ? validarCampo(tipo, value, config, obligatorio, contexto) : null;

  const [fechaSeleccionada, setFechaSeleccionada] = useState([]);
  const [horarioSeleccionado, setHorarioSeleccionado] = useState([]);

  const [loading, setLoading] = useState(false);

  const onSeleccionarFecha = async (fecha) => {
    try {
      setLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      setFechaSeleccionada(fecha);
      setHorarioSeleccionado([]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const onSeleccionarHorario = async (horario) => {
    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setHorarioSeleccionado(horario);
      const data = {
        fecha: fechaSeleccionada?.fecha,
        inicio: horario.inicio,
        termino: horario.termino,
      };
      onChange({ target: { value: data } });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <LoadingOverlay show={loading} text="Cargando horarios disponibles..." />
      <div className="grid grid-cols-3 gap-4 text-sm">
        <div>
          <p className="text-sm font-medium text-slate-500 mb-1">Fechas disponibles</p>
          <div className="space-y-2">
            {fechas.map((fecha) => (
              <button
                type="button"
                onClick={() => {
                  onSeleccionarFecha(fecha);
                }}
                key={fecha.fecha}
                className={`rounded block border hover:border-sky-300 ${fecha === fechaSeleccionada ? 'border-sky-300 text-sky-700 bg-sky-50' : 'border-slate-300'} font-medium p-3 w-full`}
              >
                {fecha.label}
              </button>
            ))}
          </div>
        </div>
        <div className="col-span-2">
          <p className="text-sm font-medium text-slate-500 mb-1">Horarios disponibles</p>
          {fechaSeleccionada?.length !== 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
              {fechaSeleccionada?.bloques?.map((bloque, index) => (
                <button
                  type="button"
                  key={index}
                  onClick={() => {
                    onSeleccionarHorario(bloque);
                  }}
                  disabled={!bloque.disponible}
                  className={`block border rounded p-2 w-full ${bloque === horarioSeleccionado ? 'border-sky-300 text-sky-700 bg-sky-100' : 'border-slate-300'} ${bloque.disponible ? ' text-black hover:border-sky-300' : 'bg-slate-100 text-slate-300'}`}
                >
                  {bloque.inicio} - {bloque.termino}
                </button>
              ))}
            </div>
          ) : (
            <p className="bg-slate-50 text-slate-600 p-2 mt-2 rounded border italic">
              Seleccione una fecha para ver los horarios disponibles
            </p>
          )}
          {fechaSeleccionada?.length !== 0 && horarioSeleccionado?.length !== 0 && (
            <p className="bg-sky-50 rounded border border-sky-200 text-sky-700 p-2 mt-6">
              Horario seleccionado:{' '}
              <strong>
                {fechaSeleccionada?.label}, de {horarioSeleccionado?.inicio} a{' '}
                {horarioSeleccionado?.termino}
              </strong>
            </p>
          )}
        </div>
      </div>
      {error ? (
        <span className="text-xs text-red-500">{error}</span>
      ) : (
        <span className="text-xs text-slate-500">{textoAyuda}</span>
      )}
    </>
  );
};

export default InputAgenda;
