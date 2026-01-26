const SearchBar = ({ search, setSearch }) => {
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(search);
  };

  return (
    <form onSubmit={onSubmit} className="flex gap-2">
      <input
        placeholder="Buscar por nombre o RUT de la organización"
        className="border border-slate-400 outline-none focus:border-blue-400 rounded p-1 w-[40rem]"
        type="text"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
    </form>
  );
};

export default SearchBar;
