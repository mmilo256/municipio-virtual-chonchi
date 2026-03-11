import {
  validatePhone,
  validateRequired,
  /* validateRut,
  validateRequired, */
} from '../../../utils/validators';

const validateStep = (stepIndex, values) => {
  const errors = {};

  /* PASO 01 */
  if (stepIndex === 0) {
    if (validatePhone(values.phone)) errors.phone = validatePhone(values.phone);
    if (validateRequired(values.domicilio)) errors.domicilio = validateRequired(values.domicilio);
  }

  /* PASO 02 */
  if (stepIndex === 1) {
    if (validateRequired(values.motivoAudiencia))
      errors.motivoAudiencia = validateRequired(values.motivoAudiencia);
    if (validateRequired(values.descripcionMotivo))
      errors.descripcionMotivo = validateRequired(values.descripcionMotivo);
  }

  return errors;
};

export default validateStep;
