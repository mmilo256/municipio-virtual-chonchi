import React from 'react';

const Dropdown = ({ value, onChange, options, className }) => {
  return (
    <div className={className}>
      <label htmlFor="">
        <span className="block text-slate-600 font-bold text-sm mb-1 text-nowrap">
          Filtrar por dirección municipal
        </span>
        <select
          value={value}
          onChange={onChange}
          className="bg-white w-full p-2.5 border rounded outline-blue-400"
        >
          <option value="">Todas las direcciones</option>
          {options?.map((op) => (
            <option key={op.id} value={op.id}>
              {op?.nombre}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default Dropdown;
