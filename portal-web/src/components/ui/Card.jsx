import { Link } from 'react-router-dom';

const Card = ({ title, desc, href, direccion, habilitado = true }) => {
  let colorDireccion;

  switch (direccion) {
    case 'Administración Municipal':
      colorDireccion = 'text-teal-600';
      break;
    case 'Secretaría Municipal':
      colorDireccion = 'text-violet-600';
      break;
  }

  return (
    <Link
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
    </Link>
  );
};

export default Card;
