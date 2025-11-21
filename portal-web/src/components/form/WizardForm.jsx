import { useEffect } from 'react';
import FormActions from './FormActions';
import FormStepper from './FormStepper';

const WizardForm = ({
  steps,
  values,
  currentStep,
  handleChange,
  nextStep,
  errors,
  prevStep,
  totalSteps,
  isLoading,
  onSubmit,
  setValues,
}) => {
  const StepComponent = steps[currentStep]?.component;

  const isLastStep = currentStep === totalSteps - 1;

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        if (e.target.tagName !== 'TEXTAREA') {
          // Evita que el form se envíe por defecto
          e.preventDefault();

          // Evitar enter en textarea
          if (e.target.tagName === 'TEXTAREA') return;

          if (isLastStep) {
            onSubmit(); // submit final
          } else {
            nextStep(); // avanzar paso
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLastStep, nextStep, onSubmit]);

  return (
    <form className="flex flex-col md:flex-row gap-4">
      <div className="col-span-2">
        <FormStepper currentStep={currentStep} steps={steps} />
      </div>
      <div className="col-span-3 bg-white shadow p-6 rounded w-full">
        <h2
          onClick={() => {
            console.log(values);
          }}
          className="text-2xl font-medium text-customBlack"
        >{`${currentStep + 1}. ${steps[currentStep]?.label}`}</h2>
        <p className="text-slate-500 text-sm mb-4">{steps[currentStep].description}</p>
        {StepComponent && (
          <StepComponent
            values={values}
            setValues={setValues}
            onChange={handleChange}
            errors={errors}
          />
        )}
        <div className="mt-6">
          <FormActions
            onSubmit={onSubmit}
            isLastStep={isLastStep}
            isLoading={isLoading}
            onPrev={prevStep}
            onNext={nextStep}
          />
        </div>
      </div>
    </form>
  );
};

export default WizardForm;
