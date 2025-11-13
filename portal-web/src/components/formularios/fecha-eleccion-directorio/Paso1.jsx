import Input from '../../ui/Input';
// import { ORG_TYPES } from '../../../config.js';
import { validationRules } from '../validations';

const Paso1 = ({ register, errors }) => {
  /* const orgTypes = ORG_TYPES.map((type) => ({
    value: type,
    label: type,
  })); */

  const orgTypes = [
    { value: 'junta-vecinos', label: 'Junta de vecinos - Territoriales' },
    { value: 'org-funcional', label: 'Organización Funcional' },
    { value: 'union-comunal', label: 'Unión Comunal' },
  ];

  return (
    <>
      <Input
        name="orgName"
        label="Nombre de la Organización Comunitaria"
        placeholder="Ej: Junta de vecinos 77"
        register={register}
        error={errors['orgName']}
        validations={{
          required: validationRules.required,
        }}
      />
      <Input
        name="orgNum"
        label="Personalidad Jurídica N°"
        placeholder="Ej: 12345678"
        register={register}
        type="text"
        error={errors['orgNum']}
        validations={{
          required: validationRules.required,
        }}
      />
      <Input
        name="orgType"
        label="Tipo de Organización Comunitaria"
        type="select"
        register={register}
        error={errors['orgType']}
        validations={{
          required: validationRules.required,
        }}
        options={orgTypes}
      />
    </>
  );
};

export default Paso1;
