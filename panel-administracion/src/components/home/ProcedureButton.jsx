import { useNavigate } from 'react-router-dom';

const ProcedureButton = ({ text = 'Trámite', description = '', to, direccionMunicipal }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(to, { state: { title: text } });
  };

  return (
    <button
      onClick={handleNavigate}
      className={`border border-primary hover:bg-primary transition-colors hover:text-white flex flex-col gap-2 rounded w-full p-2`}
    >
      <p className='text-sm text-slate-600 font-light'>{direccionMunicipal}</p>
      <p className="text-xl">{text}</p>
      <p className="text-slate-500">{description}</p>
    </button>
  );
};

export default ProcedureButton;
