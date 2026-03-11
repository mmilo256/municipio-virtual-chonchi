import { useParams } from 'react-router-dom';
import WizardForm from '../../components/form/WizardForm';
import steps from '../../formularios/administracion-municipal/audiencias-alcalde/config';
import createInitialValues from '../../formularios/administracion-municipal/audiencias-alcalde/initialValues';
import useWizardForm from '../../stores/useWizardForm';
import useAuthStore from '../../stores/useAuthStore';
import validateStep from '../../formularios/administracion-municipal/audiencias-alcalde/validation';
import { useState } from 'react';
import FormCompleted from './FormCompleted';
import { crearSolicitud } from '../../services/tramites/administracion-municipal/audienciasAlcaldeApi';
import { CORREOS_FUNCIONARIOS } from '../../config';
import { correosSolicitud, formatDate } from '../../utils/utils';

const AudienciasAlcaldeForm = () => {
  const initialValues = createInitialValues();
  const { id } = useParams();
  const usuarioId = useAuthStore((state) => state?.sessionData?.id);

  const fechaHoy = new Date();
  const fechaHoyFormatted = formatDate(fechaHoy, 2);

  const [loading, setLoading] = useState(false);

  const [isSubmitted, setIsSubmitted] = useState(false);

  const onSubmit = async () => {
    setLoading(true);

    /* Se envía las respuestas del formulario y se recibe el ID de la solicitud */

    const data = {
      respuestas: values,
      tramite_id: id,
      usuarioId,
    };

    const infoSolicitante = {
      name: values.name,
      rut: values.rut,
      email: values.email,
      phone: values.phone,
    };

    let requestId = null;

    try {
      const requestData = await crearSolicitud(data);
      requestId = requestData?.request?.id;

      if (!requestId) {
        throw new Error('No se recibió un ID de solicitud válido');
      }

      await correosSolicitud(
        CORREOS_FUNCIONARIOS.audienciasAlcalde,
        infoSolicitante.email,
        infoSolicitante.name,
        infoSolicitante.phone,
        'Audiencia con el Alcalde',
        requestId,
        fechaHoyFormatted,
      );

      setIsSubmitted(true);
    } catch (e) {
      alert('No se pudo enviar la solicitud');
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
    slugTramite: 'audiencias-alcalde',
  });

  if (isSubmitted) {
    return <FormCompleted />;
  }

  return (
    <div className="w-full max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-medium text-secondary mb-1">Audiencia con el Alcalde</h1>
      <p className="text-sm text-gray-600 mb-6">
        Completa los pasos para solicitar una audiencia con el Alcalde de la comuna.
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

export default AudienciasAlcaldeForm;
