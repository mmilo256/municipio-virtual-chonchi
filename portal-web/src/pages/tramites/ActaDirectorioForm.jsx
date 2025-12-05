import { useParams } from 'react-router-dom';
import WizardForm from '../../components/form/WizardForm';
import steps from '../../formularios/secretaria-municipal/acta-directorio/config';
import createInitialValues from '../../formularios/secretaria-municipal/acta-directorio/initialValues';
import {
  crearSolicitud,
  adjuntarDocumento,
} from '../../services/tramites/secretaria-municipal/fechaEleccionDirectorioApi';
import useWizardForm from '../../stores/useWizardForm';
import useAuthStore from '../../stores/useAuthStore';
import validateStep from '../../formularios/secretaria-municipal/acta-directorio/validation';
import { useState } from 'react';
import FormCompleted from './FormCompleted';

const ActaDirectorioForm = () => {
  const initialValues = createInitialValues();
  const { id } = useParams();
  const usuarioId = useAuthStore((state) => state?.sessionData?.id);

  const [loading, setLoading] = useState(false);

  const [isSubmitted, setIsSubmitted] = useState(false);

  const onSubmit = async () => {
    setLoading(true);
    /* Separa documentos del resto de respuestas */
    const { docElecDate, ...respuestas } = values;

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

      const documentos = [{ file: docElecDate, tipo: 'docElecDate' }];

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
    setValues,
    nextStep,
    goBack,
    prevStep,
    errors,
    handleSubmit,
  } = useWizardForm({
    initialValues,
    steps,
    onSubmit,
    validateStep,
    idTramite: id,
    slugTramite: 'acta-directorio',
  });

  if (isSubmitted) {
    return <FormCompleted />;
  }

  return (
    <div className="w-full max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-medium text-secondary mb-1">
        Depósito de Acta de Elección de Directorio
      </h1>
      <p className="text-sm text-gray-600 mb-6">
        Completa los pasos para el depósito del acta de elección del directorio
      </p>

      <WizardForm
        steps={steps}
        setValues={setValues}
        isLoading={loading}
        goBack={goBack}
        handleChange={handleChange}
        initialValues={initialValues}
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

export default ActaDirectorioForm;
