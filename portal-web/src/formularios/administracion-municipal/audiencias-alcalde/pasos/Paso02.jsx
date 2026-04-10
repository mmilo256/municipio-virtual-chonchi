import FormField from '../../../../components/form/FormField';
import InputSelect from '../../../../components/form/Inputs/InputSelect';
import InputTextarea from '../../../../components/form/Inputs/InputTextarea';

const Paso02 = ({ values, onChange, errors }) => {
  const options = [
    { value: 'laboral', label: 'Laboral' },
    { value: 'ayuda social', label: 'Ayuda Social' },
    { value: 'infraestructura y espacio público', label: 'Infraestructura y Espacio Público' },
    { value: 'proyecto o propuesta', label: 'Proyecto o Propuesta' },
    { value: 'otro', label: 'Otro' },
  ];

  return (
    <div className="flex flex-col gap-2">
      <FormField error={errors.motivoAudiencia} id="motivoAudiencia" label="Motivo de la audiencia">
        <InputSelect
          id="motivoAudiencia"
          onChange={onChange}
          value={values.motivoAudiencia}
          options={options}
        />
      </FormField>
      <FormField
        error={errors.descripcionMotivo}
        id="descripcionMotivo"
        label="Descripción del motivo"
      >
        <InputTextarea
          value={values.descripcionMotivo}
          onChange={onChange}
          placeholder="Descripción del motivo por el cual se solicita audiencia con el Alcalde"
        />
      </FormField>
    </div>
  );
};

export default Paso02;
