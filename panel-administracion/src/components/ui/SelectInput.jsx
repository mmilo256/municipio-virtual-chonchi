const SelectInput = ({ label, value, onChange, name, className, options = [] }) => {
  const inputStyles = 'block rounded p-1 text-black outline-none border-2 focus:border-blue-300';

  return (
    <label className={`flex flex-col mb-3 ${className}`}>
      <span className="mb-1">{label}</span>
      <select
        name={name}
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        className={inputStyles}
      >
        {options.map((op) => (
          <option key={op} value={op}>
            {op}
          </option>
        ))}
      </select>
    </label>
  );
};

export default SelectInput;
