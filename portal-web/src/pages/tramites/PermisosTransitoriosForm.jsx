import { useParams } from 'react-router-dom';
import WizardForm from '../../components/form/WizardForm';
import steps from '../../formularios/administracion-municipal/permisos-transitorios/config';
import createInitialValues from '../../formularios/administracion-municipal/permisos-transitorios/initialValues';
import {
  crearSolicitud,
  adjuntarDocumento,
} from '../../services/tramites/administracion-municipal/permisosTransitoriosApi';
import useWizardForm from '../../stores/useWizardForm';
import useAuthStore from '../../stores/useAuthStore';
import validateStep from '../../formularios/administracion-municipal/permisos-transitorios/validation';
import { useState } from 'react';
import FormCompleted from './FormCompleted';

const PermisosTransitoriosForm = () => {
  const initialValues = createInitialValues();
  const { id } = useParams();
  const usuarioId = useAuthStore((state) => state?.sessionData?.id);

  const [loading, setLoading] = useState(false);

  const [isSubmitted, setIsSubmitted] = useState(false);

  const onSubmit = async () => {
    setLoading(true);
    /* Separa documentos del resto de respuestas */
    const {
      docCI,
      docRutTributario,
      docVigenciaPersonaJuridica,
      docOcupacionRecinto,
      docDeclaracionJurada,
      docCertificadoAntecedentes,
      docFirmaPresidente,
      ...respuestas
    } = values;

    /* Se envía las respuestas del formulario y se recibe el ID de la solicitud */

    const data = {
      respuestas,
      tramite_id: id,
      usuarioId,
    };

    try {
      const requestData = await crearSolicitud(data);
      const requestId = requestData?.request?.id;

      /* Se usa el ID de la solicitud para subir los archivos adjuntos */

      const documentos = [
        { file: docCI, tipo: 'docCI' },
        { file: docRutTributario, tipo: 'docRutTributario' },
        { file: docVigenciaPersonaJuridica, tipo: 'docVigenciaPersonaJuridica' },
        { file: docOcupacionRecinto, tipo: 'docOcupacionRecinto' },
        { file: docDeclaracionJurada, tipo: 'docDeclaracionJurada' },
        { file: docCertificadoAntecedentes, tipo: 'docCertificadoAntecedentes' },
        { file: docFirmaPresidente, tipo: 'docFirmaPresidente' },
      ];

      // 4️⃣ Subir archivos uno por uno
      for (const doc of documentos) {
        if (doc.file) {
          const formData = new FormData();
          formData.append('archivo', doc.file);
          formData.append('tipoDocumento', doc.tipo);

          await adjuntarDocumento(formData, requestId);
        }
      }

      setIsSubmitted(true);
    } catch (e) {
      alert('No se pudo enviar la cosa');
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const {
    currentStep,
    values,
    totalSteps,
    handleChange,
    nextStep,
    prevStep,
    goBack,
    errors,
    handleSubmit,
  } = useWizardForm({
    initialValues,
    steps,
    onSubmit,
    validateStep,
    idTramite: id,
    slugTramite: 'permisos-transitorios',
  });

  if (isSubmitted) {
    return <FormCompleted />;
  }

  return (
    <div className="w-full max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-medium text-secondary mb-1">
        Autorización Especial Transitoria
      </h1>
      <p className="text-sm text-gray-600 mb-6">Completa los pasos para enviar tu solicitud.</p>

      <WizardForm
        steps={steps}
        isLoading={loading}
        handleChange={handleChange}
        initialValues={initialValues}
        goBack={goBack}
        values={values}
        errors={errors}
        currentStep={currentStep}
        totalSteps={totalSteps}
        nextStep={nextStep}
        prevStep={prevStep}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default PermisosTransitoriosForm;
