// src/forms/wizard/useWizardForm.js
import { useState } from 'react';

/**
 * options:
 * - initialValues: objeto con los valores iniciales del formulario
 * - steps: array de pasos (para saber cuántos hay)
 * - validateStep: función (stepIndex, values) => { isValid, errors }
 * - onSubmit: función async (values) que se llama al final
 */
export default function useWizardForm({ initialValues, steps, validateStep, onSubmit }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [values, setValues] = useState(initialValues || {});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalSteps = steps.length;

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setValues((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const goToStep = (index) => {
    if (index < 0 || index >= totalSteps) return;
    setCurrentStep(index);
  };

  const validateCurrentStep = async () => {
    if (!validateStep) return { isValid: true, errors: {} };

    const result = await validateStep(currentStep, values);

    // Puedes hacer que validateStep retorne solo errors y aquí marcar isValid
    if (result && typeof result === 'object') {
      const stepErrors = result.errors || result;
      const isValid = !stepErrors || Object.keys(stepErrors).length === 0;

      setErrors(stepErrors || {});
      return { isValid, errors: stepErrors || {} };
    }

    return { isValid: true, errors: {} };
  };

  const nextStep = async () => {
    const { isValid } = await validateCurrentStep();
    if (!isValid) return;

    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1);
      setErrors({});
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
      setErrors({});
    }
  };

  const handleSubmit = async (event) => {
    if (event) {
      event.preventDefault();
    }

    // Validar último paso antes de enviar
    const { isValid } = await validateCurrentStep();
    if (!isValid) return;

    if (!onSubmit) return;

    try {
      setIsSubmitting(true);
      await onSubmit(values);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    currentStep,
    totalSteps,
    values,
    errors,
    isSubmitting,
    handleChange,
    nextStep,
    prevStep,
    goToStep,
    handleSubmit,
    setValues,
    setErrors,
  };
}
