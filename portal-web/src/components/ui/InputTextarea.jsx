const InputTextarea = ({ value, onChange, id, className, placeholder }) => {
  return (
    <textarea
      value={value}
      onChange={onChange}
      id={id}
      name={id}
      placeholder={placeholder}
      className={`text-sm border-2 h-20 resize-none border-slate-100 py-1 px-2 rounded outline-none focus:border-blue-500 ${className}`}
    />
  );
};

export default InputTextarea;
