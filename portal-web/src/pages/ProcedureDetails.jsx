import { useEffect, useState } from 'react';
import { obtenerTramitePorSlug } from '../services/tramites.service';
import Container from '../components/ui/Container';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import Button from '../components/ui/buttons/Button';
import { useParams } from 'react-router-dom';

const ProcedureDetails = () => {
  const { slug } = useParams();
  const [tramite, setTramite] = useState({});

  const breadcrumbs = [{ label: tramite.titulo, href: `/${tramite.slug}` }];

  // Obtener metadatos del trámite
  useEffect(() => {
    (async () => {
      const response = await obtenerTramitePorSlug(slug);
      setTramite(response.data);
    })();
  }, [slug]);

  return (
    <Container>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <div className="mb-4">
        <h1 className="text-3xl text-center md:text-left my-10">{tramite.titulo}</h1>
      </div>
      <div className="block md:hidden mb-6">
        <Button href="formulario" type="link" label="Iniciar trámite" variant="primary" fullWidth />
      </div>
      <div className="grid lg:grid-cols-9 gap-4 text-slate-700">
        <main className="space-y-6 lg:col-span-6">
          <div>
            <h2 className="text-xl font-bold mb-1">Descripción</h2>
            <p>{tramite.descripcion}</p>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-1">Requisitos</h2>
            <p>{tramite.requisitos}</p>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-1">Información Adicional</h2>
            <p>{tramite.info_adicional}</p>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-1">Costo</h2>
            <p>{tramite.costo}</p>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-1">Modalidad de pago</h2>
            <p>{tramite.modalidad_pago}</p>
          </div>
        </main>
        <div className="lg:col-span-3 max-h-min shadow-sm rounded p-4 text-sm bg-white shadow-slate-400 space-y-4">
          <h2 className="text-2xl font-bold">Contacto y atención</h2>
          <div>
            <h3 className="text-xl font-bold">Dirección</h3>
            <p className="break-words">{tramite?.direccion}</p>
          </div>
          <div>
            <h3 className="text-xl font-bold">Horario de atención</h3>
            <p className="break-words">{tramite?.horario_atencion}</p>
          </div>

          <div>
            <h3 className="text-xl font-bold">Correo electrónico</h3>
            <p className="break-words">{tramite?.email}</p>
          </div>

          <div>
            <h3 className="text-xl font-bold">Teléfono</h3>
            <p className="break-words">{tramite?.telefono}</p>
          </div>

          <div className="mt-4 hidden md:block">
            <Button
              href="formulario"
              type="link"
              label="Iniciar trámite"
              variant="primary"
              fullWidth
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ProcedureDetails;
