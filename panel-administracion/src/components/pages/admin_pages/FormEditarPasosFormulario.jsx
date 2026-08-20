import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Breadcrumbs from '../../ui/Breadcrumbs';
import { useEffect, useState } from 'react';
import { obtenerFormularioPorId } from '../../../services/formularios.service';

const FormEditarPasosFormulario = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [formulario, setFormulario] = useState({});
  const [pasosFormulario, setPasosFormulario] = useState([]);

  // Obtener datos del formulario a editar
  useEffect(() => {
    (async () => {
      const response = await obtenerFormularioPorId(id);
      setFormulario(response.data);
      if (response.data.pasos_formularios.length > 0) {
        setPasosFormulario(response.data.pasos_formularios);
      }
    })();
  }, [id]);

  // BREADCRUMBS
  let breadcrumbs;

  breadcrumbs = [
    { label: 'Formularios', href: '/formularios' },
    { label: 'Pasos formulario', href: `/formularios/${id}/pasos/editar` },
  ];

  const configurarCampos = (pasoId) => {
    navigate(`../${id}/pasos/${pasoId}`);
  };

  return (
    <div className="mb-4 max-w-[50rem] mx-auto">
      <ToastContainer />
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <h1 className="text-2xl font-bold my-4">{id ? 'Editar formulario' : 'Crear formulario'}</h1>
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
      <div className="space-y-4">
        <div className="">
          <h2 className="font-bold">Pasos del formulario</h2>
          <p className="text-sm text-slate-500 mb-4">
            Administre el orden y contenido general de cada paso
          </p>
          {pasosFormulario.length !== 0 ? (
            pasosFormulario.map((paso) => (
              <div
                key={paso.id}
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
                      configurarCampos(paso.id);
                    }}
                    className="border border-amber-500 text-amber-600 bg-amber-100 px-3 py-1 text-sm rounded"
                  >
                    Configurar campos
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
      </div>
    </div>
  );
};

export default FormEditarPasosFormulario;
