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
    const {
      docActa,
      docRegistroSociosActualizado,
      docRegistroSociosVotacion,
      docAntPresidente,
      docAntSecretario,
      docAntTesorero,
      docAntPrimerDirector,
      docAntSegundoDirector,
      docAntSup1,
      docAntSup2,
      docAntSup3,
      docAntSup4,
      docAntSup5,
      docActaComision,
      docActaReunion,
      docActaInscripcion,
      docOtrosAntecedentes,
      ...respuestas
    } = values;

    /* Se envía las respuestas del formulario y se recibe el ID de la solicitud */

    const data = {
      respuestas,
      tramite_id: id,
      usuarioId,
    };

    let requestId = null;

    try {
      // 1️⃣ Crear solicitud
      const requestData = await crearSolicitud(data);
      requestId = requestData?.request?.id;

      if (!requestId) {
        throw new Error('No se recibió un ID de solicitud válido');
      }
    } catch (e) {
      console.error('Error creando solicitud', e);
      alert('No se pudo enviar la solicitud. Inténtalo nuevamente más tarde.');
      setLoading(false);
      return; // 👈 importante: no sigas con los documentos
    }

    // 2️⃣ Si llegaste aquí, la solicitud SÍ existe
    const documentos = [
      { file: docActa, tipo: 'docActa' },
      { file: docRegistroSociosActualizado, tipo: 'docRegistroSociosActualizado' },
      { file: docRegistroSociosVotacion, tipo: 'docRegistroSociosVotacion' },
      { file: docAntPresidente, tipo: 'docAntPresidente' },
      { file: docAntSecretario, tipo: 'docAntSecretario' },
      { file: docAntTesorero, tipo: 'docAntTesorero' },
      { file: docAntPrimerDirector, tipo: 'docAntPrimerDirector' },
      { file: docAntSegundoDirector, tipo: 'docAntSegundoDirector' },
      { file: docAntSup1, tipo: 'docAntSup1' },
      { file: docAntSup2, tipo: 'docAntSup2' },
      { file: docAntSup3, tipo: 'docAntSup3' },
      { file: docAntSup4, tipo: 'docAntSup4' },
      { file: docAntSup5, tipo: 'docAntSup5' },
      { file: docActaComision, tipo: 'docActaComision' },
      { file: docActaReunion, tipo: 'docActaReunion' },
      { file: docActaInscripcion, tipo: 'docActaInscripcion' },
      { file: docOtrosAntecedentes, tipo: 'docOtrosAntecedentes' },
    ].filter((doc) => doc.file);

    let huboErrorEnAdjuntos = false;

    try {
      for (const doc of documentos) {
        const formData = new FormData();
        formData.append('archivo', doc.file);
        formData.append('tipoDocumento', doc.tipo);

        await adjuntarDocumento(formData, requestId);
      }
    } catch (e) {
      console.error('Error adjuntando documentos', e);
      huboErrorEnAdjuntos = true;
    } finally {
      setLoading(false);
    }

    // 3️⃣ Mensaje según cómo haya ido
    if (huboErrorEnAdjuntos) {
      alert(
        'La solicitud fue enviada, pero hubo problemas al adjuntar uno o más documentos. Por favor contacte a la municipalidad o intente nuevamente subirlos.',
      );
    } else {
      setIsSubmitted(true);
      // acá tu mensaje bonito de éxito
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
