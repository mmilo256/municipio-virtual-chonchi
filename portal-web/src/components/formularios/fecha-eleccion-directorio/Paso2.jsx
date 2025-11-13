import { useState } from 'react';
import Input from '../../ui/Input';
import { validationRules } from '../validations.js';

const Paso2 = ({ register, errors }) => {
  const [comisionCount, setComisionCount] = useState(1);

  const onAddComisionCount = () => {
    if (comisionCount < 3) {
      setComisionCount(comisionCount + 1);
    }
  };

  const onRemoveComisionCount = () => {
    if (comisionCount > 1) {
      setComisionCount(comisionCount - 1);
    }
  };

  return (
    <>
      <div className="flex gap-2 mb-4">
        <button
          type="button"
          onClick={onAddComisionCount}
          className="border-2 border-slate-400 p-2 rounded mt-4 text-slate-600 hover:bg-blue-50"
        >
          + Agregar Integrante
        </button>
        <button
          type="button"
          onClick={onRemoveComisionCount}
          className="border-2 border-slate-400 p-2 rounded mt-4 text-slate-600 hover:bg-blue-50"
        >
          - Quitar Integrante
        </button>
      </div>
      <div className="grid grid-cols-2 gap-x-4 mb-4 bg-slate-100 border p-4 rounded">
        <p className="col-span-2 font-medium text-slate-400">Integrante 1</p>
        <Input
          name="comisionName1"
          label="Nombres"
          error={errors['comisionName1']}
          placeholder="Ej: Juan"
          register={register}
          validations={{
            required: validationRules.required,
          }}
        />

        <Input
          name="comisionLastName1"
          label="Apellidos"
          error={errors['comisionLastName1']}
          placeholder="Ej: López Pérez"
          register={register}
          validations={{
            required: validationRules.required,
          }}
        />

        <Input
          name="comisionRut1"
          type="rut"
          label="RUT"
          error={errors['comisionRut1']}
          placeholder="Ej: 8294852-7"
          register={register}
          validations={{
            required: validationRules.required,
          }}
        />

        <Input
          name="comisionEmail1"
          type="email"
          label="Correo electrónico"
          error={errors['comisionEmail1']}
          placeholder="Ej: ejemplo@gmail.com"
          register={register}
          validations={{
            required: validationRules.required,
          }}
        />
      </div>

      {comisionCount >= 2 && (
        <div className="grid mb-4 grid-cols-2 gap-x-4 bg-slate-100 border p-4 rounded">
          <p className="col-span-2 font-medium text-slate-400">Integrante 2</p>
          <Input
            name="comisionName2"
            label="Nombres"
            error={errors['comisionName2']}
            placeholder="Ej: Juan"
            register={register}
            validations={{
              required: validationRules.required,
            }}
          />

          <Input
            name="comisionLastName2"
            label="Apellidos"
            error={errors['comisionLastName2']}
            placeholder="Ej: López Pérez"
            register={register}
            validations={{
              required: validationRules.required,
            }}
          />

          <Input
            name="comisionRut2"
            type="rut"
            label="RUT"
            error={errors['comisionRut2']}
            placeholder="Ej: 8294852-7"
            register={register}
            validations={{
              required: validationRules.required,
            }}
          />

          <Input
            name="comisionEmail2"
            type="email"
            label="Correo electrónico"
            error={errors['comisionEmail2']}
            placeholder="Ej: ejemplo@gmail.com"
            register={register}
            validations={{
              required: validationRules.required,
            }}
          />
        </div>
      )}

      {comisionCount >= 3 && (
        <div className="grid grid-cols-2 mb-4 gap-x-4 bg-slate-100 border p-4 rounded">
          <p className="col-span-2 font-medium text-slate-400">Integrante 3</p>
          <Input
            name="comisionName3"
            label="Nombres"
            error={errors['comisionName3']}
            placeholder="Ej: Juan"
            register={register}
            validations={{
              required: validationRules.required,
            }}
          />

          <Input
            name="comisionLastName3"
            label="Apellidos"
            error={errors['comisionLastName3']}
            placeholder="Ej: López Pérez"
            register={register}
            validations={{
              required: validationRules.required,
            }}
          />

          <Input
            name="comisionRut3"
            type="rut"
            label="RUT"
            error={errors['comisionRut3']}
            placeholder="Ej: 8294852-7"
            register={register}
            validations={{
              required: validationRules.required,
            }}
          />

          <Input
            name="comisionEmail3"
            type="email"
            label="Correo electrónico"
            error={errors['comisionEmail3']}
            placeholder="Ej: ejemplo@gmail.com"
            register={register}
            validations={{
              required: validationRules.required,
            }}
          />
        </div>
      )}
    </>
  );
};

export default Paso2;
