import { useEffect, useState } from 'react';
import { obtenerTramites } from '../services/tramites.service';
import Container from '../components/ui/Container';
import Heading from '../components/ui/Heading';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import Card from '../components/ui/Card';
import { FaInfoCircle } from 'react-icons/fa';
import BotonClaveUnica from '../components/ui/buttons/BotonClaveUnica';
import useAuthStore from '../stores/useAuthStore';
import { Navigate } from 'react-router-dom';
import SearchBar from '../components/ui/SearchBar';
import Dropdown from '../components/ui/Dropdown';
import Footer from '../components/ui/Footer';
import Navbar from '../components/ui/Navbar';
import { obtenerDireccionesMunicipales } from '../services/direccionesMunicipales.service';

const Login2 = () => {
  const { sessionData } = useAuthStore();

  const [tramites, setTramites] = useState([]);
  const [loading, setLoading] = useState(false);

  const [direccionesMunicipales, setDireccionesMunicipales] = useState([]);
  const [direccionSeleccionada, setDireccionSeleccionada] = useState('');

  const [busqueda, setBusqueda] = useState('');

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

  if (Object.values(sessionData).length !== 0) {
    return <Navigate to={'/inicio'} />;
  }

  return (
    <>
      <Navbar
        navegacion={[
          {
            name: 'Volver al sitio web',
            href: 'https://municipalidadchonchi.cl/web',
          },
        ]}
      />
      <div>
        <div className="h-96 relative col-span-4 bg-cover bg-left bg-[url('/chonchi-aereo.jpg')]">
          <div className="absolute inset-0 bg-customBlack bg-opacity-80 flex flex-col justify-center text-center items-center text-white">
            <Container>
              <h1 className="text-4xl md:text-6xl font-bold mb-4 md:mb-2">
                Municipio Virtual <span className="text-orange-500">Chonchi</span>
              </h1>
              <p className="text-lg text-slate-200 mb-10">
                Accede con tu ClaveÚnica para realizar solicitudes y consultar el estado de tus
                trámites de forma segura.
              </p>
              <BotonClaveUnica className="mx-auto" />
            </Container>
          </div>
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
            tramites.map((card) => (
              <Card
                key={card.id}
                habilitado={false}
                title={card?.titulo}
                desc={card?.descripcion_corta}
                href={`/${card.slug}`}
                direccion={card?.direcciones_municipale?.nombre}
              />
            ))
          )}
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default Login2;
