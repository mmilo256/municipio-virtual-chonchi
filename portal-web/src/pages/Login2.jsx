import { useEffect, useState } from 'react';
import { obtenerTramites } from '../services/tramites.service';
import Container from '../components/ui/Container';
import Heading from '../components/ui/Heading';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import CardSkeleton from '../components/ui/Skeletons/CardSkeleton';
import Card from '../components/ui/Card';
import { FaInfoCircle } from 'react-icons/fa';
import BotonClaveUnica from '../components/ui/buttons/BotonClaveUnica';

const Login2 = () => {
  const [tramites, setTramites] = useState([]);
  const [loading, setLoading] = useState(false);

  // useEffect para cargar los procedimientos cuando el componente se monta.
  useEffect(() => {
    (async () => {
      setLoading(true);
      const response = await obtenerTramites();
      setTramites(response.data);
      setLoading(false);
    })();
  }, []); // Dependencia vacía, lo que significa que solo se ejecutará una vez cuando el componente se monte.

  console.log(tramites);

  return (
    <>
      {/* Sección de encabezado con una imagen de fondo */}
      <div
        style={{ backgroundPosition: 'center 70%' }}
        className="relative bg-[url('/chonchi-aereo.jpg')] bg-cover bg-center py-28 mb-2"
      >
        <div className="absolute inset-0 bg-customBlack bg-opacity-80 flex flex-col justify-center items-center">
          {/* Contenedor de texto centralizado */}
          <Container>
            {/* Descripción corta debajo del título */}
            <p className="text-center text-slate-300">
              Accede a nuestros servicios en línea de manera fácil y rápida.
            </p>
            <div className="flex justify-center pt-6">
              <BotonClaveUnica />
            </div>
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
      <Container className="py-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {!loading ? (
          tramites?.map((card, index) => (
            <Card
              habilitado={false}
              key={index}
              title={card?.titulo}
              desc={card?.descripcion_corta}
              href={`/${card.id}/${card.nombre}`}
              direccion={card?.direcciones_municipale?.nombre}
            />
          ))
        ) : (
          <CardSkeleton />
        )}
      </Container>
    </>
  );
};

export default Login2;
