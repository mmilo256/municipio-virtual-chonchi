const InputSelect = ({ value, onChange, id, className, placeholder, options }) => {
  return (
    <select
      value={value}
      onChange={onChange}
      id={id}
      name={id}
      type="select"
      placeholder={placeholder}
      className={`text-sm border-2 border-slate-100 p-1 rounded outline-none focus:border-blue-500 ${className}`}
    >
      <option value="" disabled>
        Seleccionar
      </option>
      {options.map((op, index) => (
        <option key={index} value={op.value}>
          {op.label}
        </option>
      ))}
    </select>
  );
};

export default InputSelect;
