import useFormsStore from '../../../stores/useFormsStore';
import Container from '../../ui/Container';
import Respuestas from './Respuestas';

const Confirmacion = () => {
  const { inputsValues, docsValues } = useFormsStore();

  const docsFiles = Object.values(docsValues);

  const formattedDocs = docsFiles.map((doc) => ({
    ruta: URL.createObjectURL(doc),
  }));

  return (
    <Container>
      <div className="mt-4 text-sm">
        {/* Acordeones para mostrar los datos organizados */}
        <Respuestas data={inputsValues} docs={formattedDocs} direct />
      </div>
    </Container>
  );
};

export default Confirmacion;
