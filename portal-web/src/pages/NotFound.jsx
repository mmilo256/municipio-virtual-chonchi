import { Link } from 'react-router-dom';

const NotFound = () => (
  <main className="min-h-dvh flex items-center justify-center px-6">
    <div className="max-w-lg rounded bg-white p-8 text-center shadow">
      <p className="text-sm font-semibold text-secondary">Error 404</p>
      <h1 className="mt-2 text-3xl font-medium">Página no encontrada</h1>
      <p className="mt-3 text-slate-600">La dirección ingresada no existe o fue modificada.</p>
      <Link className="mt-6 inline-block rounded bg-secondary px-4 py-2 text-white" to="/inicio">
        Volver al inicio
      </Link>
    </div>
  </main>
);

export default NotFound;
