import { useState } from 'react';

const useWizardForm = ({ initialValues, steps, onSubmit, validateStep }) => {
  const [currentStep, setCurrentStep] = useState(2);
  const [values, setValues] = useState(initialValues || {});
  const [errors, setErrors] = useState({});

  /* TOTAL DE PASOS DEL FORMULARIO */

  const totalSteps = steps.length;

  /* DETECTAR CUANDO EL VALOR DE UN CAMPO DEL FORMULARIO CAMBIA */

  const handleChange = (event) => {
    const { name, value, type, checked, files } = event.target;

    setValues((prev) => ({
      ...prev,
      [name]:
        type === 'checkbox'
          ? checked
          : type === 'file'
            ? files?.[0] || null // 👈 un solo archivo
            : value,
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
    const { isValid } = runValidation();
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
