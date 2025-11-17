import InputText from '../../../../components/ui/InputText';
import FormField from '../../../../components/form/FormField';

const Paso03 = ({ values, onChange }) => {
  return (
    <div className="flex flex-col gap-2">
      <FormField id="presidentName" label="Nombre completo">
        <InputText value={values.presidentName} onChange={onChange} placeholder="Ej: Juan Pérez" />
      </FormField>
      <FormField id="presidentRut" label="RUT">
        <InputText value={values.presidentRut} onChange={onChange} placeholder="Ej: 12345678-9" />
      </FormField>
      <FormField id="presidentAddress" label="Dirección">
        <InputText
          value={values.presidentAddress}
          onChange={onChange}
          placeholder="Ej: Calle 123"
        />
      </FormField>
      <FormField id="presidentEmail" label="Correo electrónico">
        <InputText
          value={values.presidentEmail}
          onChange={onChange}
          placeholder="Ej: ejemplo@gmail.com"
        />
      </FormField>
      <FormField id="presidentPhone" label="Teléfono">
        <InputText value={values.presidentPhone} onChange={onChange} placeholder="Ej: 912345678" />
      </FormField>
      <FormField id="presidentPhone2" label="Teléfono 2">
        <InputText value={values.presidentPhone2} onChange={onChange} placeholder="Ej: 912345678" />
      </FormField>
    </div>
  );
};

export default Paso03;
