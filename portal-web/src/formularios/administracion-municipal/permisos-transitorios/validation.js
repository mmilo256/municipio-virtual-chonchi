import {
  validateEmail,
  validatePhone,
  validateRut,
  validateRequired,
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
    if (validateRut(values.orgRut)) errors.orgRut = validateRut(values.orgRut);
    if (validateRequired(values.orgAddress))
      errors.orgAddress = validateRequired(values.orgAddress);
    if (validateEmail(values.orgEmail)) errors.orgEmail = validateEmail(values.orgEmail);
    if (validatePhone(values.orgPhone)) errors.orgPhone = validatePhone(values.orgPhone);
    if (validateRequired(values.orgType)) errors.orgType = validateRequired(values.orgType);
  }

  /* PASO 03 */
  if (stepIndex === 2) {
    if (validateRequired(values.presidentName))
      errors.presidentName = validateRequired(values.presidentName);
    if (validateRut(values.presidentRut)) errors.presidentRut = validateRut(values.presidentRut);
    if (validateRequired(values.presidentAddress))
      errors.presidentAddress = validateRequired(values.presidentAddress);
    if (validateEmail(values.presidentEmail))
      errors.presidentEmail = validateEmail(values.presidentEmail);
    if (validatePhone(values.presidentPhone))
      errors.presidentPhone = validatePhone(values.presidentPhone);
  }

  /* PASO 04 */
  if (stepIndex === 3) {
    if (validateRequired(values.permissionName))
      errors.permissionName = validateRequired(values.permissionName);
    if (validateRequired(values.permissionPlace))
      errors.permissionPlace = validateRequired(values.permissionPlace);
    if (validateRequired(values.permissionStartDate))
      errors.permissionStartDate = validateRequired(values.permissionStartDate);
    if (validateRequired(values.permissionStartTime))
      errors.permissionStartTime = validateRequired(values.permissionStartTime);
    if (validateRequired(values.permissionEndDate))
      errors.permissionEndDate = validateRequired(values.permissionEndDate);
    if (validateRequired(values.permissionEndTime))
      errors.permissionEndTime = validateRequired(values.permissionEndTime);
    if (validateRequired(values.permissionAlcohol))
      errors.permissionAlcohol = validateRequired(values.permissionAlcohol);
    if (validateRequired(values.permissionFood))
      errors.permissionFood = validateRequired(values.permissionFood);
    if (validateRequired(values.permissionDescription))
      errors.permissionDescription = validateRequired(values.permissionDescription);
    if (validateRequired(values.permissionPurpose))
      errors.permissionPurpose = validateRequired(values.permissionPurpose);
  }

  /* PASO 05 */
  if (stepIndex === 4) {
    if (validateRequired(values.docCI)) errors.docCI = validateRequired(values.docCI);
    if (validateRequired(values.docRutTributario))
      errors.docRutTributario = validateRequired(values.docRutTributario);
    if (validateRequired(values.docVigenciaPersonaJuridica))
      errors.docVigenciaPersonaJuridica = validateRequired(values.docVigenciaPersonaJuridica);
    if (validateRequired(values.docOcupacionRecinto))
      errors.docOcupacionRecinto = validateRequired(values.docOcupacionRecinto);
    if (validateRequired(values.docDeclaracionJurada))
      errors.docDeclaracionJurada = validateRequired(values.docDeclaracionJurada);
    if (validateRequired(values.docCertificadoAntecedentes))
      errors.docCertificadoAntecedentes = validateRequired(values.docCertificadoAntecedentes);
    if (validateRequired(values.docFirmaPresidente))
      errors.docFirmaPresidente = validateRequired(values.docFirmaPresidente);
  }

  return errors;
};

export default validateStep;
