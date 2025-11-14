import InputText from '../../../components/ui/InputText';
import FormField from '../../../components/form/FormField';

const Paso01 = ({ values, errors, onChange }) => {
  return (
    <div className="flex flex-col gap-4">
      <FormField id="nombre" label="Nombre completo">
        <InputText />
      </FormField>
      <FormField helper="Ingrese el RUT sin puntos y con guión" id="rut" label="RUT">
        <InputText />
      </FormField>
      <FormField id="email" label="Correo electrónico">
        <InputText />
      </FormField>
    </div>
  );
};

export default Paso01;
