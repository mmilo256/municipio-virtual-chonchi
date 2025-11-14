import React from 'react';

const FormField = ({ children, label, id, helper = null, error }) => {
  const input = React.cloneElement(children, {
    id,
    className: error ? 'border-red-500 focus:border-red-500' : '',
  });

  return (
    <div className="flex flex-col">
      <label className="font-medium text-slate-500 mb-1" htmlFor={id}>
        {label}
      </label>
      {input}
      {!error && helper && <p className="text-xs text-slate-500">{helper}</p>}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default FormField;
