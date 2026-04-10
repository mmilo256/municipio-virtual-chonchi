import FormField from '../../../../components/form/FormField';
import InputText from '../../../../components/form/Inputs/InputText';

const Paso01 = ({ values, onChange, errors }) => {
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
      <FormField id="rut" label="RUT">
        <InputText disabled value={values.rut} onChange={onChange} placeholder="Ej: 12345678-9" />
      </FormField>
      <FormField error={errors.email} id="email" label="Correo electrónico">
        <InputText
          value={values.email}
          onChange={onChange}
          type="email"
          placeholder="Ej: correo@ejemplo.cl"
        />
      </FormField>
      <FormField error={errors.phone} id="phone" label="Número de teléfono">
        <InputText
          value={values.phone}
          maxLength={12}
          onChange={(event) => {
            onChange(event, 'phone');
          }}
          placeholder="Ej: 912345678"
        />
      </FormField>
    </div>
  );
};

export default Paso01;
