import FormField from '../../../../components/form/FormField';
import InputFile from '../../../../components/ui/InputFile';

const Paso05 = ({ onChange, values, errors }) => {
  return (
    <div className="flex flex-col gap-4">
      <FormField
        error={errors.docCI}
        id="docCI"
        label="Cédula de identidad del representante legal"
      >
        <InputFile values={values} accept=".pdf, .docx, .jpg, .jpeg, .png" onChange={onChange} />
      </FormField>
      <FormField error={errors.docRutTributario} id="docRutTributario" label="RUT Tributario">
        <InputFile values={values} accept=".pdf, .docx, .jpg, .jpeg, .png" onChange={onChange} />
      </FormField>
      <FormField
        error={errors.docVigenciaPersonaJuridica}
        id="docVigenciaPersonaJuridica"
        label="Certificado de antecedentes para fines especiales"
      >
        <InputFile values={values} accept=".pdf, .docx, .jpg, .jpeg, .png" onChange={onChange} />
      </FormField>
      <FormField
        error={errors.docOcupacionRecinto}
        id="docOcupacionRecinto"
        label="Certificado de vigencia de Persona Jurídica"
      >
        <InputFile values={values} accept=".pdf, .docx, .jpg, .jpeg, .png" onChange={onChange} />
      </FormField>
      <FormField
        error={errors.docDeclaracionJurada}
        id="docDeclaracionJurada"
        label="Documento que acredita la ocupación legal del recinto"
      >
        <InputFile values={values} accept=".pdf, .docx, .jpg, .jpeg, .png" onChange={onChange} />
      </FormField>
      <FormField
        error={errors.docCertificadoAntecedentes}
        id="docCertificadoAntecedentes"
        label="Declaración jurada simple Ley 19.925 de alcoholes"
      >
        <InputFile values={values} accept=".pdf, .docx, .jpg, .jpeg, .png" onChange={onChange} />
      </FormField>
      <FormField
        error={errors.docFirmaPresidente}
        id="docFirmaPresidente"
        label="Firma del representante legal"
      >
        <InputFile values={values} accept=".pdf, .docx, .jpg, .jpeg, .png" onChange={onChange} />
      </FormField>
    </div>
  );
};

export default Paso05;
