import InputText from '../../../../components/ui/InputText';
import FormField from '../../../../components/form/FormField';
import InputSelect from '../../../../components/ui/InputSelect';

const Paso02 = ({ values, onChange, errors }) => {
  const options = [
    { value: 'junta de vecinos', label: 'Junta de vecinos' },
    { value: 'club deportivo', label: 'Club Deportivo' },
  ];

  return (
    <div className="flex flex-col gap-2">
      <FormField error={errors.orgName} id="orgName" label="Nombre o razón social">
        <InputText
          value={values.orgName}
          onChange={onChange}
          placeholder="Ej: Junta de vecinos 29"
        />
      </FormField>
      <FormField
        error={errors.orgRut}
        id="orgRut"
        label="RUT de la organización"
        helper="Ingrese el RUT sin puntos y con guión"
      >
        <InputText value={values.orgRut} onChange={onChange} placeholder="Ej: 12345678-9" />
      </FormField>
      <FormField error={errors.orgAddress} id="orgAddress" label="Dirección">
        <InputText
          value={values.orgAddress}
          onChange={onChange}
          type="email"
          placeholder="Ej: Calle 123"
        />
      </FormField>
      <FormField error={errors.orgEmail} id="orgEmail" label="Correo electrónico">
        <InputText
          value={values.orgEmail}
          onChange={onChange}
          placeholder="Ej: ejemplo@gmail.com"
        />
      </FormField>
      <FormField error={errors.orgPhone} id="orgPhone" label="Teléfono">
        <InputText value={values.orgPhone} onChange={onChange} placeholder="Ej: 912345678" />
      </FormField>
      <FormField error={errors.orgType} id="orgType" label="Tipo de organización">
        <InputSelect value={values.orgType} onChange={onChange} options={options} />
      </FormField>
    </div>
  );
};

export default Paso02;
