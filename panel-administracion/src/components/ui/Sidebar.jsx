import { Link } from 'react-router-dom';
import LogoutButton from './LogoutButton';
import { MdNavigateNext } from 'react-icons/md';

const Sidebar = ({ state, setState }) => {
  const onToggleSidebar = () => {
    setState((prev) => !prev);
  };

  return (
    <aside
      className={`fixed h-dvh flex flex-col bg-primary text-white transition-all ${state ? 'w-80' : 'w-16'} p-4`}
    >
      {state && (
        <p className="font-bold text-4xl py-4">
          Municipio Virtual
          <br />
          Chonchi
        </p>
      )}
      <button onClick={onToggleSidebar}>
        <MdNavigateNext
          className={`absolute -right-4 top-2 bg-primary ${state ? 'rotate-180' : 'rotate-0'} hover:bg-secondary text-white border-2 rounded-full`}
          size={30}
        />
      </button>
      <div className="h-full flex flex-col justify-between">
        {state ? (
          <ul className="flex flex-col gap-2">
            <li>
              <Link to="/" className="hover:underline">
                Inicio
              </Link>
            </li>
            <li>
              <Link to="permisos-transitorios" className="hover:underline">
                Permisos Transitorios
              </Link>
            </li>
            <li>
              <Link to="fecha-eleccion-directorio" className="hover:underline">
                Comunicación fecha de elección de directorio
              </Link>
            </li>
            <li>
              <Link to="acta-directorio" className="hover:underline">
                Depósito de acta de elección de directorio
              </Link>
            </li>
          </ul>
        ) : (
          <div></div>
        )}
        <LogoutButton btnText={state && 'Cerrar sesión'} />
      </div>
    </aside>
  );
};

export default Sidebar;
