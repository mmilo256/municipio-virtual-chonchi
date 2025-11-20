import Button from '../../components/ui/buttons/Button';
import Container from '../../components/ui/Container';
import Heading from '../../components/ui/Heading';

const FormCompleted = () => {
  return (
    <Container>
      <div className="py-24 flex flex-col gap-4">
        <Heading className="text-center" level={1}>
          ¡Solicitud enviada!
        </Heading>
        <p className="text-center text-xl font-light text-slate-600">
          Tu solicitud se ha enviado exitosamente a la Ilustre Municipalidad de Chonchi
        </p>
        <div className="max-w-fit mx-auto">
          <Button type="link" href="/inicio" variant="primary" label="Volver al inicio" />
        </div>
      </div>
    </Container>
  );
};

export default FormCompleted;
