const InputText = ({
  value,
  onChange,
  id,
  type = 'text',
  className,
  placeholder,
  disabled = false,
}) => {
  return (
    <input
      value={value}
      onChange={onChange}
      id={id}
      name={id}
      disabled={disabled}
      type={type}
      placeholder={placeholder}
      className={`text-sm border-2 disabled:text-slate-600 border-slate-100 py-1 px-2 rounded outline-none focus:border-blue-500 ${className}`}
    />
  );
};

export default InputText;
