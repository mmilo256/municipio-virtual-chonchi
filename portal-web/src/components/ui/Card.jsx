import { Link } from 'react-router-dom';

const Card = ({ title, desc, href, direccion }) => {
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
      to={href}
      className="rounded p-4 flex flex-col gap-2 shadow hover:-translate-y-0.5 shadow-slate-600 group text-center bg-white hover:text-white transition-all duration-300 hover:bg-primary group"
    >
      <span
        className={`text-xs font-bold rounded-full ${colorDireccion} group-hover:text-white transition-all`}
      >
        {direccion}
      </span>
      <p className="group-hover:text-white transition-all flex items-center justify-center text-slate-800 text-xl font-semibold">
        {title}
      </p>
      <p className="group-hover:text-white transition-all flex items-center justify-center text-slate-600">
        {desc}
      </p>
    </Link>
  );
};

export default Card;
