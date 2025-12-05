import FormField from '../../../../components/form/FormField';
import InputFile from '../../../../components/ui/InputFile';

const Paso06 = ({ values, onChange, errors }) => {
  return (
    <div className="flex flex-col gap-2">
      <FormField
        error={errors.docAntSup1}
        helper="Formatos permitidos: PDF, DOCX, JPG, PNG. Tamaño máximo: 2 MB."
        id="docAntSup1"
        label="Suplente 1"
      >
        <InputFile values={values} accept=".pdf, .docx, .jpg, .jpeg, .png" onChange={onChange} />
      </FormField>
      <FormField
        error={errors.docAntSup2}
        helper="Formatos permitidos: PDF, DOCX, JPG, PNG. Tamaño máximo: 2 MB."
        id="docAntSup2"
        label="Suplente 2"
      >
        <InputFile values={values} accept=".pdf, .docx, .jpg, .jpeg, .png" onChange={onChange} />
      </FormField>

      <FormField
        error={errors.docAntSup3}
        helper="Formatos permitidos: PDF, DOCX, JPG, PNG. Tamaño máximo: 2 MB."
        id="docAntSup3"
        label="Suplente 3"
      >
        <InputFile values={values} accept=".pdf, .docx, .jpg, .jpeg, .png" onChange={onChange} />
      </FormField>

      <FormField
        error={errors.docAntSup4}
        helper="Formatos permitidos: PDF, DOCX, JPG, PNG. Tamaño máximo: 2 MB."
        id="docAntSup4"
        label="Suplente 4"
        opcional
      >
        <InputFile values={values} accept=".pdf, .docx, .jpg, .jpeg, .png" onChange={onChange} />
      </FormField>

      <FormField
        error={errors.docAntSup5}
        helper="Formatos permitidos: PDF, DOCX, JPG, PNG. Tamaño máximo: 2 MB."
        id="docAntSup5"
        label="Suplente 5"
        opcional
      >
        <InputFile values={values} accept=".pdf, .docx, .jpg, .jpeg, .png" onChange={onChange} />
      </FormField>
    </div>
  );
};

export default Paso06;
