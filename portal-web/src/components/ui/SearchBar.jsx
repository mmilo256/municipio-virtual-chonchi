import React from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchBar = ({ placeholder, setValue }) => {
  const onSearch = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const busqueda = formData.get('busqueda');
    setValue(busqueda);
    e.currentTarget.reset();
  };

  return (
    <form onSubmit={onSearch} className="w-full" action="">
      <label htmlFor="">
        <span className="block text-slate-600 font-bold text-sm mb-1">Buscar trámite</span>
        <div className="flex gap-2">
          <div className="w-full relative">
            <input
              name="busqueda"
              className="bg-white w-full p-2 border rounded outline-blue-400"
              type="text"
              placeholder={placeholder}
            />
            <FaSearch
              onClick={onSearch}
              className="hover:cursor-pointer absolute right-3 top-3 text-slate-500"
            />
          </div>
        </div>
      </label>
    </form>
  );
};

export default SearchBar;
