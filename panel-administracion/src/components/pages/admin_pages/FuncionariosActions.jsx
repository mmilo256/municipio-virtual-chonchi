import { useNavigate } from 'react-router-dom';

const FuncionariosActions = ({ id }) => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate(`${id}/editar`);
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={onClick}
        className="py-0.5 px-4 bg-cyan-500 text-xs hover:bg-cyan-400 text-amber-50 rounded"
      >
        Editar
      </button>
    </div>
  );
};

export default FuncionariosActions;
