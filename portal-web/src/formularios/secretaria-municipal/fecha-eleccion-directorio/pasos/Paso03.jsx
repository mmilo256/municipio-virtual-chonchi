import InputText from '../../../../components/ui/InputText';
import FormField from '../../../../components/form/FormField';
import Button from '../../../../components/ui/buttons/Button';
import { FaTimes } from 'react-icons/fa';
import { useState } from 'react';

const Paso03 = ({ values, setValues, errors }) => {
  const members = values.comMembers;

  const [memberError, setMemberError] = useState(false);

  const [currentMember, setCurrentMember] = useState({
    name: '',
    lastName: '',
    rut: '',
    email: '',
  });

  const handleMemberChange = (value, field) => {
    setCurrentMember((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const addMember = () => {
    if (currentMember.name && currentMember.lastName && currentMember.rut && currentMember.email) {
      setValues((prev) => ({
        ...prev,
        comMembers: [
          ...prev.comMembers,
          {
            name: currentMember.name,
            lastName: currentMember.lastName,
            rut: currentMember.rut,
            email: currentMember.email,
          },
        ],
      }));
      setMemberError(false);
      setCurrentMember({
        name: '',
        lastName: '',
        rut: '',
        email: '',
      });
    } else {
      setMemberError(true);
    }
  };

  const removeMember = () => {
    console.log();
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="grid grid-cols-2 gap-4">
        <FormField id="comName1" label="Nombres">
          <InputText
            value={currentMember?.name}
            onChange={(e) => {
              handleMemberChange(e.target.value, 'name');
            }}
            placeholder="Ej: Juan Alberto"
          />
        </FormField>
        <FormField id="comLastName1" label="Apellidos">
          <InputText
            value={currentMember?.lastName}
            onChange={(e) => {
              handleMemberChange(e.target.value, 'lastName');
            }}
            placeholder="Ej: López Pérez"
          />
        </FormField>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <FormField id="comRut1" label="RUT">
          <InputText
            value={currentMember?.rut}
            onChange={(e) => {
              handleMemberChange(e.target.value, 'rut');
            }}
            placeholder="Ej: 12345678-9"
          />
        </FormField>
        <FormField id="comEmail1" label="Correo electrónico">
          <InputText
            value={currentMember?.email}
            onChange={(e) => {
              handleMemberChange(e.target.value, 'email');
            }}
            placeholder="Ej: correo@ejemplo.com"
          />
        </FormField>
      </div>
      {memberError && (
        <p className="text-red-500 text-xs">
          Debe rellenar todos los campos para agregar un integrante
        </p>
      )}
      <div className="py-4">
        <Button onClick={addMember} fullWidth label="Agregar integrante" variant="secondary" />
      </div>
      <div className="bg-slate-100 p-4 rounded">
        <h3 className="mb-2 font-bold text-customBlack">Integrantes de la comisión</h3>
        <FormField id="comMembers" error={errors['comMembers']}>
          <ul
            onClick={() => {
              console.log(members);
            }}
            className="flex"
          >
            {members.map((member, index) => (
              <li
                key={index}
                className="flex items-center mb-2 bg-white py-1 px-2 rounded justify-between border-b pb-2"
              >
                <div>
                  <p className="text-sm font-medium">{`${member?.name} ${member?.lastName}`}</p>
                  <p className="text-xs">{`${member?.rut} | ${member?.email}`}</p>
                </div>
                <button
                  onClick={() => {
                    removeMember(member);
                  }}
                  type="button"
                  className="text-red-500 hover:bg-red-500 hover:text-white h-6 w-6 flex items-center justify-center rounded-full"
                >
                  <FaTimes />
                </button>
              </li>
            ))}
          </ul>
        </FormField>
      </div>
    </div>
  );
};

export default Paso03;
