import WizardForm from '../../components/form/WizardForm';
import steps from '../../formularios/administracion-municipal/permisos-transitorios/config';
import createInitialValues from '../../formularios/administracion-municipal/permisos-transitorios/initialValues';
import useWizardForm from '../../stores/useWizardForm';

const PermisosTransitoriosForm = () => {
  const initialValues = createInitialValues();

  const onSubmit = () => {
    alert('Formulario enviado exitosamente');
  };

  const { currentStep, values, totalSteps, handleChange, nextStep, prevStep } = useWizardForm({
    initialValues,
    steps,
  });

  return (
    <div className="w-full max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-medium text-secondary mb-1">
        Autorización Especial Transitoria
      </h1>
      <p className="text-sm text-gray-600 mb-6">Completa los pasos para enviar tu solicitud.</p>

      <WizardForm
        steps={steps}
        handleChange={handleChange}
        initialValues={initialValues}
        values={values}
        currentStep={currentStep}
        totalSteps={totalSteps}
        nextStep={nextStep}
        prevStep={prevStep}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default PermisosTransitoriosForm;
