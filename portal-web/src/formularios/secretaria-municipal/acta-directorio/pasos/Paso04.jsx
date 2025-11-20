import InputText from '../../../../components/ui/InputText';
import FormField from '../../../../components/form/FormField';
import InputSelect from '../../../../components/ui/InputSelect';
import InputTextarea from '../../../../components/ui/InputTextarea';

const Paso04 = ({ values, onChange, errors }) => {
  const options = [
    { value: 1, label: 'Si' },
    { value: 0, label: 'No' },
  ];

  return (
    <div className="flex flex-col gap-2">
      <div className="grid grid-cols-2 gap-2">
        <FormField error={errors.permissionName} id="permissionName" label="Nombre de la actividad">
          <InputText
            value={values.permissionName}
            onChange={onChange}
            placeholder="Ej: Evento musical"
          />
        </FormField>
        <FormField error={errors.permissionPlace} id="permissionPlace" label="Lugar de realización">
          <InputText
            value={values.permissionPlace}
            onChange={onChange}
            placeholder="Ej: Sede junta de vecinos"
          />
        </FormField>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <FormField
          error={errors.permissionStartDate}
          id="permissionStartDate"
          label="Fecha de inicio"
        >
          <InputText value={values.permissionStartDate} onChange={onChange} type="date" />
        </FormField>
        <FormField
          error={errors.permissionStartTime}
          id="permissionStartTime"
          label="Hora de inicio"
        >
          <InputText value={values.permissionStartTime} onChange={onChange} type="time" />
        </FormField>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <FormField error={errors.permissionEndDate} id="permissionEndDate" label="Fecha de término">
          <InputText value={values.permissionEndDate} onChange={onChange} type="date" />
        </FormField>
        <FormField error={errors.permissionEndTime} id="permissionEndTime" label="Hora de término">
          <InputText value={values.permissionEndTime} onChange={onChange} type="time" />
        </FormField>
      </div>
      <div className="grid grid-cols-2 gap-2 items-end">
        <FormField
          error={errors.permissionAlcohol}
          id="permissionAlcohol"
          label="Consumo y/o venta de bebidas alcohólicas"
        >
          <InputSelect
            value={values.permissionAlcohol}
            onChange={onChange}
            options={options}
            placeholder="Ej: Juan Pérez"
          />
        </FormField>
        <FormField
          error={errors.permissionFood}
          id="permissionFood"
          label="Consumo y/o venta de alimentos"
        >
          <InputSelect
            value={values.permissionFood}
            onChange={onChange}
            options={options}
            placeholder="Ej: Juan Pérez"
          />
        </FormField>
      </div>
      <FormField
        error={errors.permissionDescription}
        id="permissionDescription"
        label="Descripción de la actividad"
      >
        <InputTextarea
          value={values.permissionDescription}
          onChange={onChange}
          placeholder="La actividad consiste en..."
        />
      </FormField>
      <FormField
        error={errors.permissionPurpose}
        id="permissionPurpose"
        label="Destino de los fondos"
      >
        <InputTextarea
          value={values.permissionPurpose}
          onChange={onChange}
          placeholder="Los fondos recaudados serán destinados a..."
        />
      </FormField>
    </div>
  );
};

export default Paso04;
