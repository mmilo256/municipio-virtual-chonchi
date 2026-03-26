import { useNavigate } from 'react-router-dom';

const FormulariosActions = ({ id }) => {
  const navigate = useNavigate();

  const onClickEditar = () => {
    navigate(`${id}/editar`);
  };

  const onClickAgregarPasos = () => {
    navigate(`${id}/pasos`);
  };

  const onClickEditarPasos = () => {
    navigate(`${id}/pasos/editar`);
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={onClickEditar}
        className="py-0.5 px-4 bg-blue-500 text-xs hover:bg-blue-400 text-amber-50 rounded"
      >
        Editar
      </button>
      <button
        onClick={onClickAgregarPasos}
        className="py-0.5 px-4 bg-green-500 text-xs hover:bg-green-400 text-amber-50 rounded"
      >
        Agregar pasos
      </button>
      <button
        onClick={onClickEditarPasos}
        className="py-0.5 px-4 bg-orange-500 text-xs hover:bg-orange-400 text-amber-50 rounded"
      >
        Editar pasos
      </button>
    </div>
  );
};

export default FormulariosActions;
