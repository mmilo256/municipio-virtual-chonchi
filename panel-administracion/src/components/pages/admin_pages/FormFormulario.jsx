import Breadcrumbs from '../../ui/Breadcrumbs';
import Button from '../../ui/Button';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import Input from '../../ui/Input';
import Textarea from '../../ui/Textarea';
import { useEffect, useState } from 'react';
import {
  crearFormulario,
  editarFormulario,
  obtenerFormularioPorId,
} from '../../../services/formularios.service';

const FormFormulario = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const [tituloFormulario, setTituloFormulario] = useState('');
  const [descripcionFormulario, setDescripcionFormulario] = useState('');
  const [activoFormulario, setActivoFormulario] = useState(true);

  // Estado inicial
  useEffect(() => {
    if (id) {
      (async () => {
        try {
          const response = await obtenerFormularioPorId(id);
          const data = response.data;
          setTituloFormulario(data.titulo);
          setDescripcionFormulario(data.descripcion);
          setActivoFormulario(data.activo);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [id]);

  // Resetear formulario
  const resetearForm = () => {
    setTituloFormulario('');
    setDescripcionFormulario('');
    setActivoFormulario(true);
  };

  // BREADCRUMBS
  let breadcrumbs;

  if (id) {
    breadcrumbs = [
      { label: 'Formularios', href: '/formularios' },
      { label: 'Editar formulario', href: `/formularios/${id}/editar` },
    ];
  } else {
    breadcrumbs = [
      { label: 'Formularios', href: '/formularios' },
      { label: 'Crear formulario', href: '/formularios/crear' },
    ];
  }

  // NAVEGACIÓN
  const goBack = () => {
    navigate('..');
  };

  // MODIFICAR FORMULARIO
  const onEditarFormulario = async () => {
    const data = {};
    data.activo = activoFormulario;
    if (tituloFormulario !== '') data.titulo = tituloFormulario;
    if (descripcionFormulario !== '') data.descripcion = descripcionFormulario;
    try {
      const response = await editarFormulario(id, data);
      toast.success(response.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // GUARDAR FORMULARIO
  const onCrearFormulario = async () => {
    const data = {
      titulo: tituloFormulario,
      descripcion: descripcionFormulario,
      activo: activoFormulario,
    };
    try {
      const response = await crearFormulario(data);
      resetearForm();
      toast.success(response.message);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="mb-4 max-w-[50rem] mx-auto">
      <ToastContainer />
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <h1 className="text-2xl font-bold my-4">{id ? 'Editar formulario' : 'Crear formulario'}</h1>
      <form className="space-y-4">
        <div className="p-4 bg-[#fff] shadow rounded shadow-slate-500">
          <h2 className="font-bold">Información General</h2>
          <p className="text-sm text-slate-500">Información básica del formulario</p>
          <Input value={tituloFormulario} onChange={setTituloFormulario} label="Título" />
          <Textarea
            value={descripcionFormulario}
            onChange={setDescripcionFormulario}
            label="Descripción"
          />
          <label>
            <input
              checked={activoFormulario}
              onChange={(e) => {
                setActivoFormulario(e.target.checked);
              }}
              className="mr-2"
              type="checkbox"
            />
            <span>¿Activo?</span>
          </label>
        </div>
      </form>
      <div className="flex gap-4 justify-end mt-4">
        <Button onClick={goBack} variant="primary" text="Volver" />
        <Button
          onClick={id ? onEditarFormulario : onCrearFormulario}
          variant="secondary"
          text={id ? 'Guardar cambios' : 'Crear formulario'}
        />
      </div>
    </div>
  );
};

export default FormFormulario;
