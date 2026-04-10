import FormField from '../../../../components/form/FormField';
import InputFile from '../../../../components/form/Inputs/InputFile';

const Paso07 = ({ values, onChange, errors }) => {
  return (
    <div className="flex flex-col gap-2">
      <FormField
        error={errors.docActaComision}
        id="docActaComision"
        label="Acta de Elección Comisión Electoral (Formulario 1)"
      >
        <InputFile values={values} accept=".pdf, .docx, .jpg, .jpeg, .png" onChange={onChange} />
      </FormField>
      <FormField
        error={errors.docActaReunion}
        id="docActaReunion"
        label="Acta de Reunión de Comisión Electoral para Fijar Fecha de Inscripción de Candidatos (Formulario 2)"
      >
        <InputFile values={values} accept=".pdf, .docx, .jpg, .jpeg, .png" onChange={onChange} />
      </FormField>

      <FormField
        error={errors.docActaInscripcion}
        id="docActaInscripcion"
        label="Acta Comisión Electoral Inscripción de Candidatos, con su respectivo anexo (Formulario 4)"
      >
        <InputFile values={values} accept=".pdf, .docx, .jpg, .jpeg, .png" onChange={onChange} />
      </FormField>

      <FormField
        error={errors.docOtrosAntecedentes}
        id="docOtrosAntecedentes"
        label="Otros Antecedentes Relevantes Para el Proceso de Elección del Directorio"
      >
        <InputFile values={values} accept=".pdf, .docx, .jpg, .jpeg, .png" onChange={onChange} />
      </FormField>
    </div>
  );
};

export default Paso07;
