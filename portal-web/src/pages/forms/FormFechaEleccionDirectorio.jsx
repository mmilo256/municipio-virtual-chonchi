import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAuthStore from '../../stores/useAuthStore';
import useFormsStore from '../../stores/useFormsStore';
import { sendRequest } from '../../services/requests.service';
import FormCompleted from '../../components/formularios/permisos-transitorios/FormCompleted';
import FormLayout from '../../components/formularios/FormLayout';
import Heading from '../../components/ui/Heading';
import Paso0 from '../../components/formularios/Paso0';
import Paso1 from '../../components/formularios/fecha-eleccion-directorio/Paso1';
import Paso2 from '../../components/formularios/fecha-eleccion-directorio/Paso2';
import Paso3 from '../../components/formularios/fecha-eleccion-directorio/Paso3';
import Confirmacion from '../../components/formularios/fecha-eleccion-directorio/Confirmacion';
import Button from '../../components/ui/buttons/Button';

const FormFechaEleccionDirectorio = () => {
  const navigate = useNavigate();

  const { sessionData } = useAuthStore();

  const { id } = useParams();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [docs, setDocs] = useState({
    docFechaEleccion: null,
  });
  const { setInputsValues, setDocsValues, inputsValues, docsValues } = useFormsStore();

  const [isLoading, setIsLoading] = useState(false);

  const isValid = docs.docFechaEleccion;

  const [step, setStep] = useState(0);
  const lastStep = 4;
  const stepTitles = [
    '1. Contacto del solicitante',
    '2. Información de la Organización Comunitaria',
    '3. Identificación de la Comisión Electoral',
    '4. Datos de la elección',
    'Confirmar formulario',
  ];

  const prevStep = () => {
    if (step > 0) {
      setStep((prev) => prev - 1);
    } else {
      navigate('../');
    }
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    setInputsValues(data);
    setDocsValues(docs);
    if (step < lastStep) {
      setStep((prev) => prev + 1);
    } else {
      const formData = {
        respuestas: inputsValues,
        documentos: docsValues,
        tramite_id: id,
        usuarioId: sessionData.id,
      };
      try {
        await sendRequest(formData);
        setStep((prev) => prev + 1);
      } catch (error) {
        console.log(error);
        alert('Hubo un error');
      }
    }
    setIsLoading(false);
  };

  if (step === 5) {
    return (
      <FormCompleted text="Con fecha (fecha de hoy xd), se ha recepcionado el aviso o comunicación de la fecha de la elección del directorio de la organización comunitaria denominada:" />
    );
  }

  return (
    <FormLayout
      titulo="Comunicación Fecha de Elección de Directorio"
      nombre="fecha-eleccion-directorio"
    >
      <Heading level={3}>{stepTitles[step]}</Heading>
      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        {step === 0 && <Paso0 register={register} errors={errors} setValue={setValue} />}
        {step === 1 && <Paso1 register={register} errors={errors} />}
        {step === 2 && <Paso2 register={register} errors={errors} />}
        {step === 3 && <Paso3 register={register} errors={errors} docs={docs} setDocs={setDocs} />}
        {step === 4 && <Confirmacion />}
        <div className="mt-4 flex gap-2 justify-end">
          {!isLoading && (
            <Button onClick={prevStep} type="button">
              Anterior
            </Button>
          )}
          <Button
            isLoading={isLoading}
            disabled={step === 3 && !isValid}
            variant="secondary"
            type="submit"
          >
            {step < lastStep ? 'Siguiente' : 'Finalizar'}
          </Button>
        </div>
      </form>
    </FormLayout>
  );
};

export default FormFechaEleccionDirectorio;
