import {
  validateEmail,
  validatePhone,
  validateRut,
  validateRequired,
  validateComissionMember,
  validarFechaActaEleccion,
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
    if (validarFechaActaEleccion(values.elecDate))
      errors.elecDate = validarFechaActaEleccion(values.elecDate);
    if (validateRequired(values.numIntegrantes))
      errors.numIntegrantes = validateRequired(values.numIntegrantes);
    if (validateRequired(values.docActa)) errors.docActa = validateRequired(values.docActa);
    if (validateRequired(values.docRegistroSociosActualizado))
      errors.docRegistroSociosActualizado = validateRequired(values.docRegistroSociosActualizado);
    if (validateRequired(values.docRegistroSociosVotacion))
      errors.docRegistroSociosVotacion = validateRequired(values.docRegistroSociosVotacion);
  }

  /* PASO 05 */
  if (stepIndex === 4) {
    if (validateRequired(values.docAntPresidente))
      errors.docAntPresidente = validateRequired(values.docAntPresidente);
    if (validateRequired(values.docAntSecretario))
      errors.docAntSecretario = validateRequired(values.docAntSecretario);
    if (validateRequired(values.docAntTesorero))
      errors.docAntTesorero = validateRequired(values.docAntTesorero);
  }

  /* PASO 06 */
  if (stepIndex === 5) {
    if (validateRequired(values.docAntSup1))
      errors.docAntSup1 = validateRequired(values.docAntSup1);
    if (validateRequired(values.docAntSup2))
      errors.docAntSup2 = validateRequired(values.docAntSup2);
    if (validateRequired(values.docAntSup3))
      errors.docAntSup3 = validateRequired(values.docAntSup3);
  }

  /* PASO 07 */
  if (stepIndex === 6) {
    if (validateRequired(values.docActaComision))
      errors.docActaComision = validateRequired(values.docActaComision);
    if (validateRequired(values.docActaReunion))
      errors.docActaReunion = validateRequired(values.docActaReunion);
    if (validateRequired(values.docActaInscripcion))
      errors.docActaInscripcion = validateRequired(values.docActaInscripcion);
    if (validateRequired(values.docOtrosAntecedentes))
      errors.docOtrosAntecedentes = validateRequired(values.docOtrosAntecedentes);
  }

  return errors;
};

export default validateStep;
