import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { obtenerTramitePorSlug } from '../../services/tramites.service';

const RutasTramites = () => {
  const { slug } = useParams();

  const [tramite, setTramite] = useState({});

  console.log(tramite);

  useEffect(() => {
    (async () => {
      const response = await obtenerTramitePorSlug(slug);
      setTramite(response.data);
    })();
  }, [slug]);

  return (
    <div>
      <pre>{JSON.stringify(tramite, null, 4)}</pre>
    </div>
  );
};

export default RutasTramites;
