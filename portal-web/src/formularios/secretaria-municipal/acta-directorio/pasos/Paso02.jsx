import InputText from '../../../../components/ui/InputText';
import FormField from '../../../../components/form/FormField';
import InputSelect from '../../../../components/ui/InputSelect';

const Paso02 = ({ values, onChange, errors }) => {
  const options = [
    { value: 'junta de vecinos - territoriales', label: 'Junta de Vecinos - Territoriales' },
    { value: 'organizacion funcional', label: 'Organización Funcional' },
    { value: 'union comunal', label: 'Unión Comunal' },
  ];

  return (
    <div className="flex flex-col gap-2">
      <FormField error={errors.orgName} id="orgName" label="Nombre de la organización">
        <InputText
          value={values.orgName}
          onChange={onChange}
          placeholder="Ej: Junta de vecinos 29"
        />
      </FormField>
      <FormField error={errors.orgNum} id="orgNum" label="Personalidad Jurídica N°">
        <InputText
          value={values.orgNum}
          maxLength={8}
          onChange={(event) => {
            onChange(event, 'phone');
          }}
          placeholder="Ej: 12345678"
        />
      </FormField>
      <FormField error={errors.orgType} id="orgType" label="Tipo de Organización Comunitaria">
        <InputSelect
          value={values.orgType}
          options={options}
          onChange={onChange}
          placeholder="Ej: 12345678"
        />
      </FormField>
    </div>
  );
};

export default Paso02;
