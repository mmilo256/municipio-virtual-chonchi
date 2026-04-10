import FormField from '../../../../components/form/FormField';
import InputFile from '../../../../components/form/Inputs/InputFile';

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
        label="Certificado de Vigencia de la persona jurídica"
      >
        <InputFile values={values} accept=".pdf, .docx, .jpg, .jpeg, .png" onChange={onChange} />
      </FormField>
      <FormField
        error={errors.docOcupacionRecinto}
        id="docOcupacionRecinto"
        label="Documento que acredita la ocupación legal del recinto"
      >
        <InputFile values={values} accept=".pdf, .docx, .jpg, .jpeg, .png" onChange={onChange} />
      </FormField>
      <FormField
        error={errors.docDeclaracionJurada}
        id="docDeclaracionJurada"
        label="Declaración jurada simple - Ley N° 19.925 de alcoholes (Sólo si es con consumo/venta de alcohol)"
      >
        <InputFile values={values} accept=".pdf, .docx, .jpg, .jpeg, .png" onChange={onChange} />
      </FormField>
      <FormField
        error={errors.docCertificadoAntecedentes}
        id="docCertificadoAntecedentes"
        label="Certificado de Antecedentes para fines especiales del representante legal (Sólo si es con consumo/venta de alcohol)"
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
      <FormField
        error={errors.docAutoridadSanitaria}
        id="docAutoridadSanitaria"
        label="Formulario Autoridad Sanitaria (Sólo si es con consumo/venta de alimentos)"
      >
        <InputFile values={values} accept=".pdf, .docx, .jpg, .jpeg, .png" onChange={onChange} />
      </FormField>
    </div>
  );
};

export default Paso05;
