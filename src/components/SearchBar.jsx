function SearchBar({ search, setSearch }) {
  return (
    <section className="search-box">
      <label htmlFor="search">Buscar personaje</label>

      <input
        id="search"
        type="text"
        placeholder="Ejemplo: Rick, Morty, Summer..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
    </section>
  );
}

export default SearchBar;