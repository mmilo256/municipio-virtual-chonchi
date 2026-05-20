import { useEffect, useState } from 'react';
import { obtenerTramitePorSlug } from '../services/tramites.service';
import Container from '../components/ui/Container';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import Button from '../components/ui/buttons/Button';
import { useParams, useNavigate } from 'react-router-dom';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSanitize from 'rehype-sanitize';

const ProcedureDetails = () => {
  const { slug } = useParams();
  const [tramite, setTramite] = useState({});

  const navigate = useNavigate();

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
        <h1 className="text-3xl text-center md:text-left mt-10">{tramite.titulo}</h1>
      </div>
      <div className="block md:hidden mb-6">
        <Button
          onClick={() => {
            navigate('formulario');
          }}
          type="link"
          label="Iniciar trámite"
          variant="primary"
          fullWidth
        />
      </div>
      <div className="grid lg:grid-cols-9 gap-4 text-slate-700">
        <main className="space-y-6 lg:col-span-6">
          <div>
            {/* <p>{tramite.descripcion}</p> */}
            <Markdown
              components={{
                h1: ({ children }) => <h1 className="text-3xl font-bold mb-4">{children}</h1>,
                h2: ({ children }) => <h2 className="text-2xl font-semibold mb-3">{children}</h2>,
                p: ({ children }) => <p className="mb-3 text-gray-700">{children}</p>,
                ul: ({ children }) => <ul className="list-disc pl-6 mb-4">{children}</ul>,
                a: ({ href, children }) => (
                  <a
                    href={href}
                    className="text-blue-600 underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {children}
                  </a>
                ),
              }}
              remarkPlugins={remarkGfm}
              rehypePlugins={rehypeSanitize}
            >
              {tramite.descripcion}
            </Markdown>
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
              onClick={() => {
                navigate('formulario');
              }}
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
