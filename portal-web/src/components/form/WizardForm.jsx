import FormActions from './FormActions';
import FormStepper from './FormStepper';

const WizardForm = ({ steps, values, currentStep, handleChange, nextStep, prevStep }) => {
  const StepComponent = steps[currentStep]?.component;

  return (
    <form className="flex flex-col md:flex-row gap-4">
      <div className="col-span-2">
        <FormStepper currentStep={currentStep} steps={steps} />
      </div>
      <div className="col-span-3 bg-white shadow p-6 rounded w-full">
        <h2 className="text-2xl font-medium text-customBlack">{`${currentStep + 1}. ${steps[currentStep]?.label}`}</h2>
        <p className="text-slate-500 text-sm mb-4">{steps[currentStep].description}</p>
        {StepComponent && <StepComponent values={values} onChange={handleChange} />}
        <div className="mt-6">
          <FormActions onPrev={prevStep} onNext={nextStep} />
        </div>
      </div>
    </form>
  );
};

export default WizardForm;
