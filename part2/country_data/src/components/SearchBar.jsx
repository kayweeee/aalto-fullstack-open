const SearchBar = ({ search, setSearch, handleSearch }) => {
  return (
    <>
      <form>
        <p>find countries</p>
        <input value={search} onChange={(e) => setSearch(e.target.value)} />
        <button type="submit" onClick={handleSearch}>
          Search
        </button>
      </form>
    </>
  );
};

export default SearchBar;
