import useWizardForm from '../../stores/useWizardForm';
import FormActions from './FormActions';
import FormStepper from './FormStepper';

const WizardForm = ({ steps, initialValues, validateStep, onSubmit }) => {
  const {
    currentStep,
    totalSteps,
    values,
    errors,
    isSubmitting,
    handleChange,
    nextStep,
    prevStep,
    handleSubmit,
  } = useWizardForm({
    initialValues,
    steps,
    validateStep,
    onSubmit,
  });

  const StepComponent = steps[currentStep]?.component;

  return (
    <form className="grid grid-cols-5 gap-2">
      <div className="col-span-2">
        <FormStepper steps={steps} />
      </div>
      <div className="col-span-3 bg-white shadow p-6 rounded w-full">
        <h2 className="text-2xl font-medium text-secondary">{steps[currentStep].label}</h2>
        <p className="text-slate-500 text-sm mb-4">{steps[currentStep].description}</p>
        {StepComponent && <StepComponent />}
        <div className="mt-6">
          <FormActions />
        </div>
      </div>
    </form>
  );
};

export default WizardForm;
