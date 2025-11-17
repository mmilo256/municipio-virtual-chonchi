import useAuthStore from '../../../stores/useAuthStore';

const createInitialValues = () => {
  const userData = useAuthStore.getState().sessionData;

  return {
    name: `${userData.nombres} ${userData.apellidos}`,
    rut: userData.run,
    email: '',
    phone: '',
    orgName: '',
    orgRut: '',
    orgAddress: '',
    orgEmail: '',
    orgPhone: '',
    orgType: '',
    presidentName: '',
    presidentRut: '',
    presidentAddress: '',
    presidentEmail: '',
    presidentPhone: '',
    presidentPhone2: '',
    permissionName: '',
    permissionPlace: '',
    permissionStartDate: '',
    permissionStartTime: '',
    permissionEndDate: '',
    permissionEndTime: '',
    permissionAlcohol: '',
    permissionFood: '',
    permissionDescription: '',
    permissionPurpose: '',
  };
};

export default createInitialValues;
