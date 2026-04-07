import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import Breadcrumbs from '../../ui/Breadcrumbs';
import Button from '../../ui/Button';
import Input from '../../ui/Input';
import { useEffect, useState } from 'react';
import { obtenerFormularioPorId } from '../../../services/formularios.service';
import { crearPasosFormulario } from '../../../services/pasosFormularios.service';

const FormAgregarPasosFormulario = () => {
  const { id } = useParams();

  const [editMode, setEditMode] = useState(false);

  const [formulario, setFormulario] = useState({});
  const [pasosFormulario, setPasosFormulario] = useState([]);

  // Campos paso formulario
  const [tituloPasoActual, setTituloPasoActual] = useState('');
  const [descripcionPasoActual, setDescripcionPasoActual] = useState('');

  // Obtener datos del formulario a editar
  useEffect(() => {
    (async () => {
      const response = await obtenerFormularioPorId(id);
      setFormulario(response.data);
      if (response.data.pasos_formularios.length > 0) {
        setEditMode(true);
        setPasosFormulario(response.data.pasos_formularios);
      }
    })();
  }, [id]);

  // BREADCRUMBS
  let breadcrumbs;

  breadcrumbs = [
    { label: 'Formularios', href: '/formularios' },
    { label: 'Pasos formulario', href: `/formularios/${id}/pasos` },
  ];

  // Resetear campos
  const resetForm = () => {
    setTituloPasoActual('');
    setDescripcionPasoActual('');
  };

  // Guardar pasos
  const onGuardarCambios = async () => {
    const data = {
      formularioId: formulario.id,
      pasos: pasosFormulario,
    };
    try {
      const response = await crearPasosFormulario(data);
      toast.success(response.message);
      console.log(response);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Agregar pasos al formulario
  const onAgregarPaso = () => {
    if (tituloPasoActual) {
      const tituloExiste = pasosFormulario.some((paso) => paso.titulo === tituloPasoActual);
      if (!tituloExiste) {
        const data = {
          titulo: tituloPasoActual,
          descripcion: descripcionPasoActual,
          orden: pasosFormulario.length + 1,
        };
        setPasosFormulario((prev) => [...prev, data]);
        resetForm();
      } else {
        toast.warning('Ya existe un paso con este título');
      }
    } else {
      toast.warning('El título del paso es obligatorio');
    }
  };

  // Quitar un paso del formulario
  const onEliminarPaso = (paso) => {
    const newPasosFormulario = pasosFormulario.filter((p) => p.titulo !== paso);
    setPasosFormulario(newPasosFormulario);
  };

  return (
    <div className="mb-4 max-w-[50rem] mx-auto">
      <ToastContainer />
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <h1 className="text-2xl font-bold my-4">{editMode ? 'Modificar pasos' : 'Agregar pasos'}</h1>
      <div className="p-4 bg-[#fff] shadow rounded shadow-slate-500 mb-4">
        <h2 className="font-bold mb-2">Formulario creado</h2>
        <p className="text-sm mb-1">
          <span className="font-semibold text-slate-500">Título: </span>
          <span className="text-slate-500">{formulario.titulo}</span>
        </p>
        <p className="text-sm mb-1">
          <span className="font-semibold text-slate-500">Descripción: </span>
          <span className="text-slate-500">{formulario.descripcion}</span>
        </p>
        <p className="text-sm">
          <span className="font-semibold text-slate-500">Estado: </span>
          <span className="text-slate-500">{formulario.activo ? 'Activo' : 'Inactivo'}</span>
        </p>
      </div>
      <p className="bg-amber-100 p-2 rounded mb-4 border text-amber-800 border-amber-300">
        ADVERTENCIA: Al modificar los pasos de un formulario, tendrá que volver a configurar los
        campos de cada paso.
      </p>
      <form className="space-y-4">
        <div className="p-4 bg-[#fff] shadow rounded shadow-slate-500">
          <h2 className="font-bold">Agregar paso</h2>
          <p className="text-sm text-slate-500">Crea un nuevo paso para este formulario</p>
          <Input value={tituloPasoActual} onChange={setTituloPasoActual} label="Título del paso" />
          <Input
            value={descripcionPasoActual}
            onChange={setDescripcionPasoActual}
            label="Descripción del paso"
          />
          <div className="ml-auto bg-red-400 w-fit">
            <Button onClick={onAgregarPaso} variant="primary" text="Agregar paso" />
          </div>
        </div>
        <div className="">
          <h2 className="font-bold">Pasos del formulario</h2>
          <p className="text-sm text-slate-500 mb-4">
            Administre el orden y contenido general de cada paso
          </p>
          {pasosFormulario.length !== 0 ? (
            pasosFormulario.map((paso) => (
              <div
                key={paso.titulo}
                className="flex justify-between items-start p-4 rounded bg-[#fff] shadow shadow-slate-400 mb-4"
              >
                <div>
                  <h3 className="font-bold">{paso.titulo}</h3>
                  <p className="text-sm text-slate-500">{paso.descripcion}</p>
                </div>
                {
                  <button
                    type="button"
                    onClick={() => {
                      onEliminarPaso(paso.titulo);
                    }}
                    className="border border-red-500 text-red-500 bg-red-100 px-3 py-1 text-sm rounded"
                  >
                    Eliminar
                  </button>
                }
              </div>
            ))
          ) : (
            <p className="italic text-slate-500 text-sm bg-[#fff] border p-2 rounded">
              Este formulario no tiene pasos asignados
            </p>
          )}
        </div>
      </form>
      <div className="flex gap-4 justify-end mt-4">
        <Button type="button" variant="primary" text="Volver" />
        <Button
          onClick={onGuardarCambios}
          type="button"
          variant="secondary"
          text={id ? 'Guardar cambios' : 'Siguiente'}
        />
      </div>
    </div>
  );
};

export default FormAgregarPasosFormulario;
