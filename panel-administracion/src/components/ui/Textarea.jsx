const Textarea = ({ label, value, onChange, name, className, placeholder, tall }) => {
  const inputStyles =
    'block rounded p-1 text-black outline-none border-2 focus:border-blue-300 h-28';

  return (
    <label className={`flex flex-col mb-3 ${className}`}>
      <span className="mb-1">{label}</span>
      <textarea
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        id={name}
        placeholder={placeholder}
        className={`${inputStyles} ${tall && 'min-h-80'}`}
      ></textarea>
    </label>
  );
};

export default Textarea;
