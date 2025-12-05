import InputText from '../../../../components/ui/InputText';
import FormField from '../../../../components/form/FormField';
import InputFile from '../../../../components/ui/InputFile';
import InputSelect from '../../../../components/ui/InputSelect';

const Paso04 = ({ values, onChange, errors }) => {
  const integrantesOps = [
    { value: 3, label: 3 },
    { value: 5, label: 5 },
  ];

  return (
    <div className="flex flex-col gap-2">
      <FormField
        error={errors.elecDate}
        id="elecDate"
        label="Fecha de la elección"
        helper="Recuerde que el depósito del acta de elección del nuevo directorio debe efectuarse a más tardar el quinto día hábil posterior a la fecha de la elección."
      >
        <InputText type="date" value={values.elecDate} onChange={onChange} />
      </FormField>

      <FormField error={errors.numIntegrantes} id="numIntegrantes" label="Número de integrantes">
        <InputSelect
          onChange={onChange}
          value={values.numIntegrantes}
          options={integrantesOps}
          id="numIntegrantes"
        />
      </FormField>

      <FormField
        error={errors.docActa}
        helper="Formatos permitidos: PDF, DOCX, JPG, PNG. Tamaño máximo: 2 MB."
        id="docActa"
        label="Acta de elección del directorio"
      >
        <InputFile values={values} accept=".pdf, .docx, .jpg, .jpeg, .png" onChange={onChange} />
      </FormField>

      <FormField
        error={errors.docRegistroSociosActualizado}
        helper="Formatos permitidos: PDF, DOCX, JPG, PNG. Tamaño máximo: 2 MB."
        id="docRegistroSociosActualizado"
        label="Registro de socios actualizado"
      >
        <InputFile values={values} accept=".pdf, .docx, .jpg, .jpeg, .png" onChange={onChange} />
      </FormField>

      <FormField
        error={errors.docRegistroSociosVotacion}
        helper="Formatos permitidos: PDF, DOCX, JPG, PNG. Tamaño máximo: 2 MB."
        id="docRegistroSociosVotacion"
        label="Registro de socios que votaron"
      >
        <InputFile values={values} accept=".pdf, .docx, .jpg, .jpeg, .png" onChange={onChange} />
      </FormField>
    </div>
  );
};

export default Paso04;
