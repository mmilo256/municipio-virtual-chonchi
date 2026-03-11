import useAuthStore from '../../../stores/useAuthStore';

const createInitialValues = () => {
  const userData = useAuthStore.getState().sessionData;

  return {
    name: `${userData.nombres} ${userData.apellidos}`,
    rut: userData.run,
    email: '',
    phone: '',
    domicilio: '',
    motivoAudiencia: '', // laboral, ayuda social, infraestructura y espacio público, proyecto o propuesta, otros
    descripcionMotivo: '',
  };
};

export default createInitialValues;
