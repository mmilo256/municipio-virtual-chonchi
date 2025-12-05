import InputText from '../../../../components/ui/InputText';
import FormField from '../../../../components/form/FormField';
import { useEffect } from 'react';
import useAuthStore from '../../../../stores/useAuthStore';

const Paso03 = ({ values, onChange, setValues, errors }) => {
  const userRut = useAuthStore((state) => state.sessionData.run);
  const { comRut1, comRut2, comRut3 } = values;

  useEffect(() => {
    if (userRut === comRut1 || userRut === comRut2 || userRut === comRut3) {
      setValues((prev) => ({
        ...prev,
        comIsValid: true,
      }));
    } else {
      setValues((prev) => ({
        ...prev,
        comIsValid: false,
      }));
    }
  }, [userRut, comRut1, comRut2, comRut3, setValues]);

  return (
    <div className="flex flex-col gap-2">
      <div className="grid grid-cols-2 border gap-x-4 gap-y-2 bg-slate-100 p-4 rounded">
        <p className="col-span-2 font-medium text-slate-700">Integrante 1</p>
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
        <FormField error={errors.comRut1} id="comRut1" label="RUT">
          <InputText
            value={values.comRut1}
            maxLength={10}
            onChange={(event) => {
              onChange(event, 'rut');
            }}
            placeholder="Ej: 1234567-8"
          />
        </FormField>
        <FormField error={errors.comEmail1} id="comEmail1" label="Correo electrónico">
          <InputText
            value={values.comEmail1}
            onChange={onChange}
            placeholder="Ej: correo@ejemplo.cl"
          />
        </FormField>
      </div>

      <div className="grid grid-cols-2 border gap-x-4 gap-y-2 bg-slate-100 p-4 rounded">
        <p className="col-span-2 font-medium text-slate-700">Integrante 2</p>
        <FormField error={errors.comName2} id="comName2" label="Nombres">
          <InputText value={values.comName2} onChange={onChange} placeholder="Ej: Juan Alberto" />
        </FormField>
        <FormField error={errors.comLastName2} id="comLastName2" label="Apellidos">
          <InputText
            value={values.comLastName2}
            onChange={onChange}
            placeholder="Ej: López Pérez"
          />
        </FormField>
        <FormField error={errors.comRut2} id="comRut2" label="RUT">
          <InputText
            value={values.comRut2}
            maxLength={10}
            onChange={(event) => {
              onChange(event, 'rut');
            }}
            placeholder="Ej: 1234567-8"
          />
        </FormField>
        <FormField error={errors.comEmail2} id="comEmail2" label="Correo electrónico">
          <InputText
            value={values.comEmail2}
            onChange={onChange}
            placeholder="Ej: correo@ejemplo.cl"
          />
        </FormField>
      </div>

      <div className="grid grid-cols-2 border gap-x-4 gap-y-2 bg-slate-100 p-4 rounded">
        <p className="col-span-2 font-medium text-slate-700">Integrante 3</p>
        <FormField error={errors.comName3} id="comName3" label="Nombres">
          <InputText value={values.comName3} onChange={onChange} placeholder="Ej: Juan Alberto" />
        </FormField>
        <FormField error={errors.comLastName3} id="comLastName3" label="Apellidos">
          <InputText
            value={values.comLastName3}
            onChange={onChange}
            placeholder="Ej: López Pérez"
          />
        </FormField>
        <FormField error={errors.comRut3} id="comRut3" label="RUT">
          <InputText
            value={values.comRut3}
            maxLength={10}
            onChange={(event) => {
              onChange(event, 'rut');
            }}
            placeholder="Ej: 1234567-8"
          />
        </FormField>
        <FormField error={errors.comEmail3} id="comEmail3" label="Correo electrónico">
          <InputText
            value={values.comEmail3}
            onChange={onChange}
            placeholder="Ej: correo@ejemplo.cl"
          />
        </FormField>
      </div>
      <FormField error={errors.comIsValid}>
        <input type="text" hidden value={values.comIsValid} onChange={onChange} />
      </FormField>
    </div>
  );
};

export default Paso03;
