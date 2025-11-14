import InputText from '../../../ui/InputText';
import FormField from '../../FormField';

const Paso01 = () => {
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
