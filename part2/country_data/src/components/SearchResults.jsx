const SearchResults = ({ searchResults, handleClick }) => {
  return (
    <>
      {searchResults.map((n) => (
        <div
          key={n}
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <p>{n}</p>
          <button style={{ height: 20 }} onClick={() => handleClick(n)}>
            show
          </button>
        </div>
      ))}
    </>
  );
};

export default SearchResults;
