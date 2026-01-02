import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useWizardForm = ({
  initialValues,
  steps,
  onSubmit,
  validateStep,
  idTramite,
  slugTramite,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [values, setValues] = useState(initialValues || {});
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  /* TOTAL DE PASOS DEL FORMULARIO */

  const totalSteps = steps.length;

  /* DETECTAR CUANDO EL VALOR DE UN CAMPO DEL FORMULARIO CAMBIA */

  const handleChange = (event, validation) => {
    const { name, value, type, checked, files } = event.target;

    let newValue = value;

    if (validation === 'phone') {
      newValue = newValue.replace(/[^0-9+]/g, '');
    }

    if (validation === 'rut') {
      newValue = newValue
        .replace(/[^0-9kK-]/g, '') // permite solo 0-9, K, k y '-'
        .replace(/k/g, 'K'); // convierte k a K (opcional pero recomendado)
    }

    setValues((prev) => ({
      ...prev,
      [name]:
        type === 'checkbox'
          ? checked
          : type === 'file'
            ? files?.[0] || null // 👈 un solo archivo
            : newValue,
    }));
  };

  /* VALIDACIÓN DE LOS CAMPOS DEL FORMULARIO */

  const runValidation = () => {
    if (!validateStep) return { isValid: true, errors: {} };
    const stepErrors = validateStep(currentStep, values);
    const isValid = !stepErrors || Object.keys(stepErrors).length === 0;
    setErrors(stepErrors || {});
    return { isValid, errors: stepErrors || {} };
  };

  /* NAVEGACIÓN ENTRE PASOS DEL FORMULARIO */

  const nextStep = () => {
    /* const { isValid } = runValidation(); */
    const isValid = true;
    if (!isValid) return;
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      setErrors({});
    }
  };
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setErrors({});
    }
  };

  const goBack = () => {
    navigate(`/${idTramite}/${slugTramite}`);
  };

  /* FUNCIÓN PARA EL ENVÍO DEL FORMULARIO */

  const handleSubmit = async (event) => {
    if (event) {
      event.preventDefault();
    }

    const { isValid } = runValidation();
    if (!isValid) return;

    if (!onSubmit) return;

    await onSubmit(values);
  };

  return {
    currentStep,
    values,
    goBack,
    totalSteps,
    errors,
    handleChange,
    setValues,
    handleSubmit,
    nextStep,
    prevStep,
  };
};

export default useWizardForm;
