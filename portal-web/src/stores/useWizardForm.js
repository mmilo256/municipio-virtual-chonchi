import { useState } from 'react';

const useWizardForm = ({ initialValues, steps, onSubmit }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [values, setValues] = useState(initialValues || {});

  /* TOTAL DE PASOS DEL FORMULARIO */

  const totalSteps = steps.length;

  /* DETECTAR CUANDO EL VALOR DE UN CAMPO DEL FORMULARIO CAMBIA */

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setValues((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  /* NAVEGACIÓN ENTRE PASOS DEL FORMULARIO */

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      console.log(values);
    }
  };
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  /* FUNCIÓN PARA EL ENVÍO DEL FORMULARIO */

  const handleSubmit = async (event) => {
    if (event) {
      event.preventDefault();
    }
    if (!onSubmit) return;

    await onSubmit(values);
  };

  return {
    currentStep,
    values,
    totalSteps,
    handleChange,
    handleSubmit,
    nextStep,
    prevStep,
  };
};

export default useWizardForm;
