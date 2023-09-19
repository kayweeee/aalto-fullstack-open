const Filter = ({ searchTerm, setSearchTerm, handleSearch, searchResult }) => {
  return (
    <>
      <form>
        <div>
          <p>Search for</p>
          <input
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
          <button onClick={handleSearch} type="submit">
            Search
          </button>
        </div>
      </form>
      {searchResult}
    </>
  );
};

export default Filter;
