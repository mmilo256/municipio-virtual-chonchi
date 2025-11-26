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
    comName1: '',
    comLastName1: '',
    comRut1: '',
    comEmail1: '',
    comName2: '',
    comLastName2: '',
    comRut2: '',
    comEmail2: '',
    comName3: '',
    comLastName3: '',
    comRut3: '',
    comEmail3: '',
    comIsValid: false,
    elecDate: '',
    docElecDate: null,
  };
};

export default createInitialValues;
