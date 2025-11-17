import FormField from '../../../../components/form/FormField';
import InputFile from '../../../../components/ui/InputFile';

const Paso05 = () => {
  return (
    <div className="flex flex-col gap-4">
      <FormField label="Cédula de identidad del representante legal">
        <InputFile />
      </FormField>
      <FormField label="Certificado de antecedentes para fines especiales">
        <InputFile />
      </FormField>
      <FormField label="Certificado de vigencia de Persona Jurídica">
        <InputFile />
      </FormField>
      <FormField label="Documento que acredita la ocupación legal del recinto">
        <InputFile />
      </FormField>
      <FormField label="Declaración jurada simple Ley 19.925 de alcoholes">
        <InputFile />
      </FormField>
      <FormField label="Firma del representante legal">
        <InputFile />
      </FormField>
    </div>
  );
};

export default Paso05;
