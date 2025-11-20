import InputText from '../../../../components/ui/InputText';
import FormField from '../../../../components/form/FormField';
import Button from '../../../../components/ui/buttons/Button';

const Paso03 = ({ values, setValues, onChange, errors }) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="grid grid-cols-2 gap-4">
        <FormField error={errors.comName1} id="comName1" label="Nombres">
          <InputText value={values.comName1} onChange={onChange} placeholder="Ej: Juan Alberto" />
        </FormField>
        <FormField error={errors.comLastName1} id="comLastName1" label="Apellidos">
          <InputText
            value={values.comLastName1}
            onChange={onChange}
            placeholder="Ej: López Pérez"
          />
        </FormField>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <FormField error={errors.comRut1} id="comRut1" label="RUT">
          <InputText value={values.comRut1} onChange={onChange} placeholder="Ej: 12345678-9" />
        </FormField>
        <FormField error={errors.comEmail1} id="comEmail1" label="Correo electrónico">
          <InputText
            value={values.comEmail1}
            onChange={onChange}
            placeholder="Ej: correo@ejemplo.com"
          />
        </FormField>
      </div>
      <div className="py-4">
        <Button fullWidth label="Agregar integrante" variant="secondary" />
      </div>
      <div className="bg-slate-100 p-4 rounded">
        <h3 className="mb-2 font-bold text-customBlack">Integrantes de la comisión</h3>
        <ul className="flex flex-col gap-2">
          <li className="border-b pb-2">
            <p className="text-sm font-medium">Juan Pérez Soto</p>
            <p className="text-xs">RUT: 10291043-8 | correo@ejemplo.com</p>
          </li>
          <li className="border-b pb-2">
            <p className="text-sm font-medium">Juan Pérez Soto</p>
            <p className="text-xs">RUT: 10291043-8 | correo@ejemplo.com</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Paso03;
