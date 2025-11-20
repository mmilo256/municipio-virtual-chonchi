import React from 'react';

const FormField = ({ children, label, id, helper = null, error, opcional = false }) => {
  const input = React.cloneElement(children, {
    id,
    className: error ? 'border-red-500 focus:border-red-500' : '',
  });

  return (
    <div className="text-sm flex flex-col">
      <label className="font-medium text-slate-500 mb-1" htmlFor={id}>
        <span>{label}</span>
        {opcional && <span className="ml-1.5 font-normal text-slate-400 ">(opcional)</span>}
      </label>
      {input}
      <div className="mt-1">
        {!error && helper && <p className="text-xs text-slate-500">{helper}</p>}
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default FormField;
