import useAuthStore from '../../../stores/useAuthStore';

const createInitialValues = () => {
  const userData = useAuthStore.getState().sessionData;

  return {
    name: `${userData.nombres} ${userData.apellidos}`,
    rut: userData.run,
    email: '',
    phone: '',
    orgName: '',
    orgNum: '',
    orgType: '',
    comMembers: [],
    elecDate: '',
    docElecDate: null,
  };
};

export default createInitialValues;
