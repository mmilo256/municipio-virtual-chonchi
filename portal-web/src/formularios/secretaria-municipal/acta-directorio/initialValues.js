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
    numIntegrantes: '',
    docActa: null,
    docRegistroSociosActualizado: null,
    docRegistroSociosVotacion: null,
    docAntPresidente: null,
    docAntSecretario: null,
    docAntTesorero: null,
    docAntPrimerDirector: null,
    docAntSegundoDirector: null,
    docAntSup1: null,
    docAntSup2: null,
    docAntSup3: null,
    docAntSup4: null,
    docAntSup5: null,
    docActaComision: null,
    docActaReunion: null,
    docActaInscripcion: null,
    docOtrosAntecedentes: null,
  };
};

export default createInitialValues;
