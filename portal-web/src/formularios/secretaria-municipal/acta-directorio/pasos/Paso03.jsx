import InputText from '../../../../components/ui/InputText';
import FormField from '../../../../components/form/FormField';

const Paso03 = ({ values, onChange, errors }) => {
  return (
    <div className="flex flex-col gap-2">
      <FormField error={errors.presidentName} id="presidentName" label="Nombre completo">
        <InputText value={values.presidentName} onChange={onChange} placeholder="Ej: Juan Pérez" />
      </FormField>
      <FormField
        helper="Ingrese el RUT sin puntos y con guión"
        error={errors.presidentRut}
        id="presidentRut"
        label="RUT"
      >
        <InputText value={values.presidentRut} onChange={onChange} placeholder="Ej: 12345678-9" />
      </FormField>
      <FormField error={errors.presidentAddress} id="presidentAddress" label="Dirección">
        <InputText
          value={values.presidentAddress}
          onChange={onChange}
          placeholder="Ej: Calle 123"
        />
      </FormField>
      <FormField error={errors.presidentEmail} id="presidentEmail" label="Correo electrónico">
        <InputText
          value={values.presidentEmail}
          onChange={onChange}
          placeholder="Ej: ejemplo@gmail.com"
        />
      </FormField>
      <FormField error={errors.presidentPhone} id="presidentPhone" label="Teléfono">
        <InputText value={values.presidentPhone} onChange={onChange} placeholder="Ej: 912345678" />
      </FormField>
      <FormField opcional error={errors.presidentPhone2} id="presidentPhone2" label="Teléfono 2">
        <InputText value={values.presidentPhone2} onChange={onChange} placeholder="Ej: 912345678" />
      </FormField>
    </div>
  );
};

export default Paso03;
