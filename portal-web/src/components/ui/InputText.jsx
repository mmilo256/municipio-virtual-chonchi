const InputText = ({ value, onChange, id, type = 'text', className }) => {
  return (
    <input
      value={value}
      onChange={onChange}
      id={id}
      name={id}
      type={type}
      className={`border-2 py-1 px-2 rounded outline-none focus:border-blue-500 ${className}`}
    />
  );
};

export default InputText;
