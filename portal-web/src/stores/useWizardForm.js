import { useState } from 'react';

const useWizardForm = ({ initialValues, steps }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [values, setValues] = useState(initialValues || {});

  const totalSteps = steps.length;

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setValues((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  /* const goToStep = (index) => {
    if (index < 0 || index >= totalSteps) return;
    setCurrentStep(index);
  }; */

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

  return {
    currentStep,
    values,
    totalSteps,
    handleChange,
    nextStep,
    prevStep,
  };
};

export default useWizardForm;
