import InputText from '../../../../components/ui/InputText';
import FormField from '../../../../components/form/FormField';
import InputFile from '../../../../components/ui/InputFile';
import { agregarDiasHabiles } from '../../../../utils/utils';

const Paso04 = ({ values, onChange, errors }) => {
  if (values.elecDate) {
    const quie = agregarDiasHabiles(values.elecDate, 1);
    console.log(quie);
  }

  return (
    <div className="flex flex-col gap-2">
      <button type="button" className="p-2 border hover:bg-blue-50">
        Debug
      </button>
      <FormField error={errors.elecDate} id="elecDate" label="Fecha de la elección">
        <InputText type="date" value={values.elecDate} onChange={onChange} />
      </FormField>
      <FormField
        error={errors.docElecDate}
        helper="Formatos permitidos: PDF, DOCX, JPG, PNG. Tamaño máximo: 2 MB."
        id="docElecDate"
        label="Comunicación de la fecha de elección"
      >
        <InputFile values={values} accept=".pdf, .docx, .jpg, .jpeg, .png" onChange={onChange} />
      </FormField>
    </div>
  );
};

export default Paso04;
