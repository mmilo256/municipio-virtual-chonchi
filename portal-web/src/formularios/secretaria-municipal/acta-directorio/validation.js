import {
  validateEmail,
  validatePhone,
  validateRut,
  validateRequired,
  validateComissionMember,
  validateDate,
} from '../../../utils/validators';

const validateStep = (stepIndex, values) => {
  const errors = {};

  /* PASO 01 */
  if (stepIndex === 0) {
    if (validateEmail(values.email)) errors.email = validateEmail(values.email);
    if (validatePhone(values.phone)) errors.phone = validatePhone(values.phone);
  }

  /* PASO 02 */
  if (stepIndex === 1) {
    if (validateRequired(values.orgName)) errors.orgName = validateRequired(values.orgName);
    if (validateRequired(values.orgNum)) errors.orgNum = validateRut(values.orgNum);
    if (validateRequired(values.orgType)) errors.orgType = validateRequired(values.orgType);
  }

  /* PASO 03 */
  if (stepIndex === 2) {
    if (validateRequired(values.comName1)) errors.comName1 = validateRequired(values.comName1);
    if (validateRequired(values.comLastName1))
      errors.comLastName1 = validateRequired(values.comLastName1);
    if (validateRut(values.comRut1)) errors.comRut1 = validateRut(values.comRut1);
    if (validateEmail(values.comEmail1)) errors.comEmail1 = validateEmail(values.comEmail1);
    if (validateRequired(values.comName2)) errors.comName2 = validateRequired(values.comName2);
    if (validateRequired(values.comLastName2))
      errors.comLastName2 = validateRequired(values.comLastName2);
    if (validateRut(values.comRut2)) errors.comRut2 = validateRut(values.comRut2);
    if (validateEmail(values.comEmail2)) errors.comEmail2 = validateEmail(values.comEmail2);
    if (validateRequired(values.comName3)) errors.comName3 = validateRequired(values.comName3);
    if (validateRequired(values.comLastName3))
      errors.comLastName3 = validateRequired(values.comLastName3);
    if (validateRut(values.comRut3)) errors.comRut3 = validateRut(values.comRut3);
    if (validateEmail(values.comEmail3)) errors.comEmail3 = validateEmail(values.comEmail3);
    if (validateComissionMember(values.comIsValid))
      errors.comIsValid = validateComissionMember(values.comIsValid);
  }

  /* PASO 04 */
  if (stepIndex === 3) {
    if (validateDate(values.elecDate)) errors.elecDate = validateDate(values.elecDate);
    if (validateRequired(values.docElecDate))
      errors.docElecDate = validateRequired(values.docElecDate);
  }

  return errors;
};

export default validateStep;
