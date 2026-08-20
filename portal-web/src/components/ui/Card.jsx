import { useNavigate } from 'react-router-dom';
import Button from './buttons/Button';
import BotonClaveUnica from './buttons/BotonClaveUnica';

const Card = ({ title, desc, href, direccion, habilitado = true }) => {
  const navigate = useNavigate();

  let colorDireccion;

  switch (direccion) {
    case 'Administración Municipal':
      colorDireccion = 'bg-orange-50 text-orange-700';
      break;
    case 'Secretaría Municipal':
      colorDireccion = 'bg-cyan-50 text-cyan-700';
      break;
    case 'Control Interno':
      colorDireccion = 'bg-blue-50 text-blue-700';
      break;
    case 'DIDECO':
      colorDireccion = 'bg-green-50 text-green-700';
      break;
    case 'DIDEL':
      colorDireccion = 'bg-violet-50 text-violet-700';
      break;
    case 'Administración y Finanzas':
      colorDireccion = 'bg-red-50 text-red-700';
      break;
    case 'Jurídica':
      colorDireccion = 'bg-rose-50 text-rose-700';
      break;
    case 'Juzgado de Policía Local':
      colorDireccion = 'bg-sky-50 text-sky-700';
      break;
    case 'Dirección de Obras':
      colorDireccion = 'bg-lime-50 text-lime-700';
      break;
    case 'SECPLAN':
      colorDireccion = 'bg-teal-50 text-teal-700';
      break;
    case 'Seguridad Pública, Tránsito y Transporte Público':
      colorDireccion = 'bg-yellow-50 text-yellow-700';
      break;
  }

  const navegar = () => {
    if (habilitado) {
      navigate(href);
    }
  };

  return (
    <>
      <article className="bg-[#fff] border rounded p-4 flex flex-col justify-between">
        <div>
          <span className={`text-sm rounded-full  py-1 px-3 ${colorDireccion}`}>{direccion}</span>
          <h3 className="font-bold my-4 text-lg">{title}</h3>
          <p className="text-slate-500 mb-4 text-sm">{desc}</p>
        </div>
        {habilitado ? (
          <Button onClick={navegar} fullWidth variant="secondary" label="Iniciar trámite" />
        ) : (
          <BotonClaveUnica />
        )}
      </article>
      {/* <Link
      to={habilitado && href}
      className={`rounded p-4 flex flex-col gap-2 shadow shadow-slate-600 group text-center bg-white transition-all duration-300 ${habilitado && 'hover:-translate-y-0.5 hover:bg-primary hover:text-white'}`}
    >
      <span
        className={`text-xs font-bold rounded-full ${colorDireccion} transition-all ${habilitado && 'group-hover:text-white'}`}
      >
        {direccion}
      </span>
      <p
        className={`transition-all flex items-center justify-center text-slate-800 text-xl font-semibold ${habilitado && 'group-hover:text-white'}`}
      >
        {title}
      </p>
      <p
        className={`transition-all flex items-center justify-center text-slate-600 ${habilitado && 'group-hover:text-white'}`}
      >
        {desc}
      </p>
      <Button label="Iniciar trámite" />
    </Link> */}
    </>
  );
};

export default Card;
