import { useState } from 'react';
import Button from './Button';

const SearchBar = ({ setSearch, placeholder = 'Buscar...', className }) => {
  const [inputValue, setInputValue] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    setInputValue('');
    setSearch(inputValue);
  };

  return (
    <form onSubmit={onSubmit} className="flex items-start gap-2">
      <input
        placeholder={placeholder}
        className={`border border-slate-400 outline-none focus:border-blue-400 rounded p-2 w-[40rem] ${className}`}
        type="text"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
      />
      <Button type="submit" text="Buscar" variant="primary" />
    </form>
  );
};

export default SearchBar;
