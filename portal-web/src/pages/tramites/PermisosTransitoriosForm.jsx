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
import { correosSolicitud, formatDate } from '../../utils/utils';
import { CORREOS_FUNCIONARIOS } from '../../config';

const PermisosTransitoriosForm = () => {
  const initialValues = createInitialValues();
  const { id } = useParams();
  const usuarioId = useAuthStore((state) => state?.sessionData?.id);

  const fechaHoy = new Date();
  const fechaHoyFormatted = formatDate(fechaHoy, 2);

  const [loading, setLoading] = useState(false);

  const [isSubmitted, setIsSubmitted] = useState(false);

  const onSubmit = async () => {
    setLoading(true);

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

    const infoSolicitante = {
      name: values.name,
      rut: values.rut,
      email: values.email,
      phone: values.phone,
    };

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
      { file: docCI, tipo: 'docCI' },
      { file: docRutTributario, tipo: 'docRutTributario' },
      { file: docVigenciaPersonaJuridica, tipo: 'docVigenciaPersonaJuridica' },
      { file: docOcupacionRecinto, tipo: 'docOcupacionRecinto' },
      { file: docDeclaracionJurada, tipo: 'docDeclaracionJurada' },
      { file: docCertificadoAntecedentes, tipo: 'docCertificadoAntecedentes' },
      { file: docFirmaPresidente, tipo: 'docFirmaPresidente' },
    ].filter((doc) => doc.file);

    let huboErrorEnAdjuntos = false;

    try {
      for (const doc of documentos) {
        const formData = new FormData();
        formData.append('archivo', doc.file);
        formData.append('tipoDocumento', doc.tipo);
        await adjuntarDocumento(formData, requestId);
      }
      await correosSolicitud(
        CORREOS_FUNCIONARIOS.permisosTransitorios,
        CORREOS_FUNCIONARIOS.ofPartes,
        infoSolicitante.email,
        infoSolicitante.name,
        infoSolicitante.phone,
        'Autorización Especial Transitoria',
        requestId,
        fechaHoyFormatted,
      );
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
