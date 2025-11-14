import WizardForm from '../../components/form/WizardForm';
import steps from '../../formularios/administracion-municipal/config';
import initialValues from '../../formularios/administracion-municipal/initialValues';
import validateStep from '../../formularios/administracion-municipal/validation';

const PermisosTransitoriosForm = () => {
  const handleSubmit = async (values) => {
    // Aquí llamas a tu API del trámite
    await createNuevoTramiteSolicitud(values);
    // Redirigir o mostrar mensaje de éxito
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-semibold text-gray-900 mb-1">Nuevo Trámite</h1>
      <p className="text-sm text-gray-600 mb-6">Completa los pasos para enviar tu solicitud.</p>

      <WizardForm
        steps={steps}
        initialValues={initialValues}
        validateStep={validateStep}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default PermisosTransitoriosForm;
