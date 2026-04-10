import FormField from '../../../../components/form/FormField';
import InputFile from '../../../../components/form/Inputs/InputFile';

const Paso05 = ({ values, onChange, errors }) => {
  return (
    <div className="flex flex-col gap-2">
      <FormField
        error={errors.docAntPresidente}
        helper="Formatos permitidos: PDF, DOCX, JPG, PNG. Tamaño máximo: 2 MB."
        id="docAntPresidente"
        label="Presidente"
      >
        <InputFile values={values} accept=".pdf, .docx, .jpg, .jpeg, .png" onChange={onChange} />
      </FormField>
      <FormField
        error={errors.docAntSecretario}
        helper="Formatos permitidos: PDF, DOCX, JPG, PNG. Tamaño máximo: 2 MB."
        id="docAntSecretario"
        label="Secretario/a"
      >
        <InputFile values={values} accept=".pdf, .docx, .jpg, .jpeg, .png" onChange={onChange} />
      </FormField>

      <FormField
        error={errors.docAntTesorero}
        helper="Formatos permitidos: PDF, DOCX, JPG, PNG. Tamaño máximo: 2 MB."
        id="docAntTesorero"
        label="Tesorero/a"
      >
        <InputFile values={values} accept=".pdf, .docx, .jpg, .jpeg, .png" onChange={onChange} />
      </FormField>

      <FormField
        error={errors.docAntPrimerDirector}
        helper="Formatos permitidos: PDF, DOCX, JPG, PNG. Tamaño máximo: 2 MB."
        id="docAntPrimerDirector"
        label="Primer director"
        opcional
      >
        <InputFile values={values} accept=".pdf, .docx, .jpg, .jpeg, .png" onChange={onChange} />
      </FormField>

      <FormField
        error={errors.docAntSegundoDirector}
        helper="Formatos permitidos: PDF, DOCX, JPG, PNG. Tamaño máximo: 2 MB."
        id="docAntSegundoDirector"
        label="Segundo director"
        opcional
      >
        <InputFile values={values} accept=".pdf, .docx, .jpg, .jpeg, .png" onChange={onChange} />
      </FormField>
    </div>
  );
};

export default Paso05;
