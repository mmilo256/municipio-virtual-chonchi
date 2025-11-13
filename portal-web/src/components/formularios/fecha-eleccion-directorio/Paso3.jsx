import Input from '../../ui/Input';
import { validationRules } from '../validations.js';
import FileInput from '../../ui/FileInput.jsx';

const Paso3 = ({ register, errors, docs, setDocs }) => {
  return (
    <>
      <Input
        name="fechaEleccion"
        label="Fecha de la elección"
        error={errors['fechaEleccion']}
        type="date"
        register={register}
        validations={{
          required: validationRules.required,
        }}
      />
      <p className="text-xs text-slate-500 font-medium mb-6">
        Recuerde que el aviso o comunicación de la fecha de la elección debe ingresarse o
        depositarse en Secretaría Municipal, con al menos 15 días hábiles de anticipación al día de
        la elección.
      </p>
      <FileInput
        name="docFechaEleccion"
        file={docs.docFechaEleccion}
        setFile={setDocs}
        label="Comunicación de la fecha de elección"
      />
    </>
  );
};

export default Paso3;
