const Input = ({ type = 'text', label, value, onChange, name, className, placeholder }) => {
  let input;
  const inputStyles = 'block rounded p-1 text-black outline-none border-2 focus:border-blue-300';

  switch (type) {
    case 'textarea':
      input = (
        <textarea
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={(e) => {
            onChange(e.target.value);
          }}
          className={`${inputStyles} h-32 resize-none`}
        />
      );
      break;

    default:
      input = (
        <input
          name={name}
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
          }}
          className={inputStyles}
          type={type}
          placeholder={placeholder}
        />
      );
      break;
  }

  return (
    <label className={`flex flex-col mb-3 ${className}`}>
      <span className="mb-1">{label}</span>
      {input}
    </label>
  );
};

export default Input;
