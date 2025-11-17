import InputText from '../../../../components/ui/InputText';
import FormField from '../../../../components/form/FormField';
import InputSelect from '../../../../components/ui/InputSelect';
import InputTextarea from '../../../../components/ui/InputTextarea';

const Paso04 = ({ values, onChange }) => {
  const options = [
    { value: 1, label: 'Si' },
    { value: 0, label: 'No' },
  ];

  return (
    <div className="flex flex-col gap-2">
      <div className="grid grid-cols-2 gap-2">
        <FormField id="permissionName" label="Nombre de la actividad">
          <InputText
            value={values.permissionName}
            onChange={onChange}
            placeholder="Ej: Juan Pérez"
          />
        </FormField>
        <FormField id="permissionPlace" label="Lugar de realización">
          <InputText
            value={values.permissionPlace}
            onChange={onChange}
            placeholder="Ej: Juan Pérez"
          />
        </FormField>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <FormField id="permissionStartDate" label="Fecha de inicio">
          <InputText value={values.permissionStartDate} onChange={onChange} type="date" />
        </FormField>
        <FormField id="permissionStartTime" label="Hora de inicio">
          <InputText value={values.permissionStartTime} onChange={onChange} type="time" />
        </FormField>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <FormField id="permissionEndDate" label="Fecha de término">
          <InputText value={values.permissionEndDate} onChange={onChange} type="date" />
        </FormField>
        <FormField id="permissionEndTime" label="Hora de término">
          <InputText value={values.permissionEndTime} onChange={onChange} type="time" />
        </FormField>
      </div>
      <div className="grid grid-cols-2 gap-2 items-end">
        <FormField id="permissionAlcohol" label="Consumo y/o venta de bebidas alcohólicas">
          <InputSelect
            value={values.permissionAlcohol}
            onChange={onChange}
            options={options}
            placeholder="Ej: Juan Pérez"
          />
        </FormField>
        <FormField id="permissionFood" label="Consumo y/o venta de alimentos">
          <InputSelect
            value={values.permissionFood}
            onChange={onChange}
            options={options}
            placeholder="Ej: Juan Pérez"
          />
        </FormField>
      </div>
      <FormField id="permissionDescription" label="Descripción de la actividad">
        <InputTextarea
          value={values.permissionDescription}
          onChange={onChange}
          placeholder="Ej: Juan Pérez"
        />
      </FormField>
      <FormField id="permissionPurpose" label="Destino de los fondos">
        <InputTextarea
          value={values.permissionPurpose}
          onChange={onChange}
          placeholder="Ej: Juan Pérez"
        />
      </FormField>
    </div>
  );
};

export default Paso04;
