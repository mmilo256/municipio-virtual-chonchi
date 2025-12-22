import { useEffect, useState } from 'react';
import useAuthStore from '../../stores/useAuthStore';
import HomeSection from '../home/HomeSection';
import ProcedureButton from '../home/ProcedureButton';
import { obtenerTramites } from '../../services/proceduresServices';
import Breadcrumbs from '../ui/Breadcrumbs';

const Home = () => {
  
  const { sessionData } = useAuthStore();
  const [loading, setLoading] = useState(true);

  const [procedures, setProcedures] = useState([]);
  
    const arrayRoles = sessionData?.rol?.split(",")
  
    // Obtener los trámites según los permisos del usuario
    useEffect(() => {
      (async () => {
        setLoading(true);
        try {
          const data = await obtenerTramites();
          const filteredData = data.filter(tramite => arrayRoles.includes(tramite.nombre))
          setProcedures(filteredData);
        } catch (e) {
          console.log(e);
        }
        setLoading(false);
      })();
    }, [sessionData]);

  return (
    <div>
      {/* <Alert type="warning" text="Hay cosas pendientes" /> */}
      <main>
        <Breadcrumbs />
        <p className="text-4xl my-4">Bienvenido(a), {sessionData.nombres}</p>
        <HomeSection title="Solicitudes por trámite">
          <div className="grid grid-cols-2 gap-2">
            {!loading ? (
              procedures.map((procedure, index) => (
                <ProcedureButton
                  key={index}
                  to={procedure.nombre}
                  text={procedure.titulo}
                  description={procedure.descripcion_corta}
                  direccionMunicipal={procedure.direcciones_municipale.nombre}
                />
              ))
            ) : (
              <div className="h-[8.5rem] w-full bg-slate-200 animate-pulse rounded"></div>
            )}
          </div>
        </HomeSection>
      </main>
    </div>
  );
};

export default Home;
