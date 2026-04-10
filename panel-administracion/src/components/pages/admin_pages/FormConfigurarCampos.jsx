import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import Breadcrumbs from '../../ui/Breadcrumbs';
import { useParams } from 'react-router-dom';
import { obtenerFormularioPorId } from '../../../services/formularios.service';
import { obtenerPasoFormularioPorId } from '../../../services/pasosFormularios.service';
import Input from '../../ui/Input';
import Button from '../../ui/Button';
import SelectInput from '../../ui/SelectInput';
import Textarea from '../../ui/Textarea';
import { crearCamposFormulario } from '../../../services/camposFormularios.service';

const FormConfigurarCampos = () => {
  const { id, pasoId } = useParams();

  const [formulario, setFormulario] = useState({});
  const [pasoFormulario, setPasoFormulario] = useState({});
  const [campos, setCampos] = useState([]);

  const [etiqueta, setEtiqueta] = useState('');
  const [slug, setSlug] = useState('');
  const [placeholder, setPlaceholder] = useState('');
  const [tipoCampo, setTipoCampo] = useState('');
  const [opciones, setOpciones] = useState('');
  const [textoAyuda, setTextoAyuda] = useState('');
  const [obligatorio, setObligatorio] = useState(true);

  // Obtener datos del formulario a editar
  useEffect(() => {
    (async () => {
      const response = await obtenerFormularioPorId(id);
      const pasoResponse = await obtenerPasoFormularioPorId(pasoId);
      if (pasoResponse.data.campos_formularios.length > 0) {
        const camposExistentes = pasoResponse.data.campos_formularios.map((campo) => ({
          etiqueta: campo.etiqueta,
          slug: campo.nombre_interno,
          placeholder: campo.placeholder,
          tipoCampo: campo.tipo,
          opciones: campo.opciones,
          textoAyuda: campo.texto_ayuda,
          obligatorio: campo.obligatorio,
        }));
        setCampos(camposExistentes);
      }
      setFormulario(response.data);
      setPasoFormulario(pasoResponse.data);
    })();
  }, [id, pasoId]);

  // BREADCRUMBS
  let breadcrumbs;

  breadcrumbs = [
    { label: 'Formularios', href: '/formularios' },
    { label: 'Pasos formulario', href: `/formularios/${id}/pasos/editar` },
    { label: 'Configurar campos', href: `/formularios/${id}/pasos/${pasoId}` },
  ];

  const tiposCampos = [
    { label: 'Texto (corto)', value: 'text' },
    { label: 'Texto (largo)', value: 'textarea' },
    { label: 'Email', value: 'email' },
    { label: 'Teléfono', value: 'phone' },
    { label: 'RUT', value: 'rut' },
    { label: 'Selección', value: 'select' },
    { label: 'Archivo', value: 'file' },
  ];

  const agregarCampo = () => {
    setCampos((prev) => [
      ...prev,
      {
        etiqueta,
        slug,
        placeholder,
        tipoCampo,
        opciones,
        textoAyuda,
        obligatorio,
      },
    ]);
  };

  const guardarCambios = async () => {
    const data = {
      pasoId: Number(pasoId),
      campos,
    };
    try {
      const response = await crearCamposFormulario(data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mb-4 max-w-[50rem] mx-auto">
      <ToastContainer />
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <h1 className="text-2xl font-bold my-4">Crear campos</h1>
      <div className="p-4 bg-[#fff] shadow rounded shadow-slate-500 mb-4">
        <h2 className="font-bold mb-2">Paso seleccionado</h2>
        <p className="text-sm mb-1">
          <span className="font-semibold text-slate-500">Formulario: </span>
          <span className="text-slate-500">{formulario.titulo}</span>
        </p>
        <p className="text-sm mb-1">
          <span className="font-semibold text-slate-500">Título del paso: </span>
          <span className="text-slate-500">{pasoFormulario.titulo}</span>
        </p>
        <p className="text-sm mb-1">
          <span className="font-semibold text-slate-500">Descripción del paso: </span>
          <span className="text-slate-500">{pasoFormulario.descripcion}</span>
        </p>
      </div>
      <div className="p-4 bg-[#fff] shadow rounded shadow-slate-500 mb-4">
        <h2 className="font-bold mb-2">Agregar campo</h2>
        <p className="text-sm text-slate-500">Crea un nuevo campo para este formulario</p>
        <div className="grid grid-cols-2 gap-x-4">
          <Input value={etiqueta} onChange={setEtiqueta} label="Etiqueta" />
          <Input value={slug} onChange={setSlug} label="Slug" />
          <Input value={placeholder} onChange={setPlaceholder} label="Placeholder" />
          <SelectInput
            value={tipoCampo}
            onChange={setTipoCampo}
            label="Tipo de campo"
            options={tiposCampos}
          />
          <Textarea
            value={opciones}
            onChange={setOpciones}
            className="col-span-2"
            label="Opciones (si aplica)"
          />
          <p className="mb-2 text-sm text-slate-500">Escriba las opciones separadas por coma</p>
          <Input
            value={textoAyuda}
            onChange={setTextoAyuda}
            className="col-span-2"
            label="Texto de ayuda"
          />
          <label>
            <input
              checked={obligatorio}
              onChange={(e) => {
                setObligatorio(e.target.checked);
              }}
              className="mr-2"
              type="checkbox"
            />
            <span>Obligatorio</span>
          </label>
        </div>
        <div className="ml-auto bg-red-400 w-fit">
          <Button onClick={agregarCampo} variant="primary" text="Agregar campo" />
        </div>
      </div>
      <div className="space-y-4">
        <div className="">
          <h2 className="font-bold">Campos del formulario</h2>
          {campos.map((campo) => (
            <div
              key={campo.slug}
              className="flex justify-between items-start p-4 rounded bg-[#fff] shadow shadow-slate-400 mb-4"
            >
              <div>
                <div className="space-x-2 mb-2">
                  <span className="capitalize text-xs font-bold bg-slate-100 text-slate-600 py-1 px-3 rounded">
                    {campo.tipoCampo}
                  </span>
                  {campo.obligatorio && (
                    <span className="text-xs font-bold bg-green-100 text-green-600 py-1 px-3 rounded">
                      Obligatorio
                    </span>
                  )}
                </div>
                <h3 className="font-bold mb-2">{campo.etiqueta}</h3>
                <p className="text-sm text-slate-500">
                  <span className="font-bold">Slug: </span>
                  {campo.slug}
                </p>
                <p className="text-sm text-slate-500">
                  <span className="font-bold">Placeholder: </span>
                  {campo.placeholder}
                </p>
                {campo.textoAyuda !== '' && (
                  <p className="text-sm text-slate-500">
                    <span className="font-bold">Texto de ayuda: </span>
                    {campo.textoAyuda}
                  </p>
                )}
              </div>
              {
                <button
                  type="button"
                  className="border border-red-500 text-red-500 bg-red-100 px-3 py-1 text-sm rounded"
                >
                  Eliminar
                </button>
              }
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-4 justify-end mt-4">
        <Button variant="primary" text="Volver" />
        <Button onClick={guardarCambios} variant="secondary" text="Guardar cambios" />
      </div>
    </div>
  );
};

export default FormConfigurarCampos;
