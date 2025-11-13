import { useParams } from 'react-router-dom';
import Breadcrumbs from '../ui/Breadcrumbs';
import Container from '../ui/Container';
import Heading from '../ui/Heading';
import { useEffect, useState } from 'react';
import { fetchProcedureById } from '../../services/procedures.service';

const FormLayout = ({ titulo, children }) => {
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [procedure, setProcedure] = useState([]);

  // Obtener toda la información del trámite
  useEffect(() => {
    (async () => {
      setLoading(true);
      const data = await fetchProcedureById(id);
      setProcedure(data);
      setLoading(false);
    })();
  }, [id]);

  const breadcrumbs = [
    { label: procedure?.titulo, href: `/${procedure?.nombre}` },
    { label: 'Formulario', href: `/${procedure?.nombre}/formulario` },
  ];

  return (
    <Container className="py-4 px-10 mt-4 mx-auto shadow rounded bg-white">
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <Heading className="text-slate-500 font-light" level={3}>
        {titulo}
      </Heading>
      {children}
    </Container>
  );
};

export default FormLayout;
