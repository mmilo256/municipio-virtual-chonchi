import InputText from '../../../../components/ui/InputText';
import FormField from '../../../../components/form/FormField';

const Paso01 = ({ values, onChange }) => {
  return (
    <div className="flex flex-col gap-2">
      <FormField id="name" label="Nombre del solicitante">
        <InputText
          disabled
          value={values.name}
          onChange={onChange}
          placeholder="Ej: Juan López Pérez"
        />
      </FormField>
      <FormField id="rut" label="RUT" helper="Ingrese el RUT sin puntos y con guión">
        <InputText disabled value={values.rut} onChange={onChange} placeholder="Ej: 12345678-9" />
      </FormField>
      <FormField id="email" label="Correo electrónico">
        <InputText
          value={values.email}
          onChange={onChange}
          type="email"
          placeholder="Ej: correo@ejemplo.cl"
        />
      </FormField>
      <FormField id="phone" label="Número de teléfono">
        <InputText value={values.phone} onChange={onChange} placeholder="Ej: 912345678" />
      </FormField>
    </div>
  );
};

export default Paso01;
