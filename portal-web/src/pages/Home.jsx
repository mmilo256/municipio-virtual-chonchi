import { useEffect, useState } from 'react';
import useAuthStore from '../stores/useAuthStore';
import { obtenerTramites } from '../services/tramites.service';
import Container from '../components/ui/Container';
import Heading from '../components/ui/Heading';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import Card from '../components/ui/Card';
import { FaInfoCircle } from 'react-icons/fa';
import { obtenerDireccionesMunicipales } from '../services/direccionesMunicipales.service';
import SearchBar from '../components/ui/SearchBar';
import Dropdown from '../components/ui/Dropdown';
import LoadingOverlay from '../components/ui/LoadingOverlay';

const Home = () => {
  // Declaración del estado para almacenar los procedimientos.
  const [tramites, setTramites] = useState([]);

  const [loading, setLoading] = useState(false);

  const [direccionesMunicipales, setDireccionesMunicipales] = useState([]);
  const [direccionSeleccionada, setDireccionSeleccionada] = useState('');

  const [busqueda, setBusqueda] = useState('');

  const user = useAuthStore((state) => state.sessionData);

  // useEffect para cargar los procedimientos cuando el componente se monta.
  useEffect(() => {
    (async () => {
      setLoading(true);
      const response = await obtenerTramites(direccionSeleccionada, busqueda);
      setTramites(response.data);
      const responseDirecciones = await obtenerDireccionesMunicipales();
      setDireccionesMunicipales(responseDirecciones.data);
      setLoading(false);
    })();
  }, [direccionSeleccionada, busqueda]); // Dependencia vacía, lo que significa que solo se ejecutará una vez cuando el componente se monte.

  return (
    <>
      <LoadingOverlay show={loading} text="Cargando solicitudes..." />
      {/* Sección de encabezado con una imagen de fondo */}
      <div
        style={{ backgroundPosition: 'center 70%' }}
        className="relative bg-[url('/chonchi-aereo.jpg')] bg-cover bg-center py-28 mb-2"
      >
        <div className="absolute inset-0 bg-customBlack bg-opacity-80 flex flex-col justify-center items-center">
          {/* Contenedor de texto centralizado */}
          <Container>
            {/* Título del portal */}
            <Heading className="text-center" darkMode>
              Hola, {user.nombres}
            </Heading>
            {/* Descripción corta debajo del título */}
            <p className="text-center text-slate-300">
              Desde aquí puedes iniciar nuevos trámites y revisar el estado de tus solicitudes
              municipales.
            </p>
          </Container>
        </div>
      </div>
      {/* Subtítulo de la sección de servicios */}
      <Container>
        <p className="flex items-center gap-2 text-sm md:text-base bg-sky-100 p-3 my-4 border-l-4 font-medium text-sky-700 border-sky-500 shadow rounded">
          <FaInfoCircle size={24} />
          <span>
            Este portal se encuentra en proceso de ampliación. Se irán incorporando nuevos trámites
            de forma progresiva.
          </span>
        </p>
        <Breadcrumbs />
      </Container>
      <Heading className="text-center" level={3}>
        Servicios disponibles
      </Heading>

      {/* Componente para mostrar los procedimientos en un grid de tarjetas */}
      <Container>
        <div className="flex flex-col md:flex-row gap-4 mb-2 items-center">
          <SearchBar setValue={setBusqueda} placeholder="Ej: Permisos transitorios" />
          <Dropdown
            className="w-full md:w-96"
            options={direccionesMunicipales}
            value={direccionSeleccionada}
            onChange={(e) => {
              setDireccionSeleccionada(e.target.value);
            }}
          />
        </div>

        <div className="flex gap-2">
          {busqueda && (
            <div
              onClick={() => {
                setBusqueda('');
              }}
              className="flex space-x-2 cursor-pointer hover:bg-sky-200 text-sm bg-sky-100 rounded w-min text-nowrap py-1 px-4"
            >
              <div>
                <span>Búsqueda: </span>
                <strong>{busqueda}</strong>
              </div>
              <span className="font-bold text-slate-500">x</span>
            </div>
          )}

          {direccionSeleccionada && (
            <div
              onClick={() => {
                setDireccionSeleccionada('');
              }}
              className="flex space-x-2 cursor-pointer hover:bg-sky-200 text-sm bg-sky-100 rounded w-min text-nowrap py-1 px-4"
            >
              <div>
                <span>Dirección municipal: </span>
                <strong>
                  {direccionesMunicipales.find((d) => d.id == direccionSeleccionada).nombre}
                </strong>
              </div>
              <span className="font-bold text-slate-500">x</span>
            </div>
          )}
        </div>

        <div className="py-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <p className="text-center col-span-full py-24 rounded text-xl font-bold text-slate-500">
              Cargando trámites...
            </p>
          ) : tramites?.length === 0 ? (
            <p className="text-center col-span-full py-24 rounded text-xl font-bold text-slate-500">
              No se encontraron trámites
            </p>
          ) : (
            tramites.map((card) => {
              return (
                <Card
                  key={card.id}
                  habilitado={true}
                  title={card?.titulo}
                  desc={card?.descripcion_corta}
                  href={`/${card.slug}`}
                  direccion={card?.direcciones_municipale?.nombre}
                />
              );
            })
          )}
        </div>
      </Container>
    </>
  );
};

export default Home;
