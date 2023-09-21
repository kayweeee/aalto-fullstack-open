import { useEffect, useState } from "react";
import CountryServices from "./services/countries";
// components
import SearchBar from "./components/SearchBar";
import CountryProfile from "./components/CountryProfile";
import SearchResults from "./components/SearchResults";

const App = () => {
  // state
  const [names, setNames] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);

  // get data
  useEffect(() => {
    CountryServices.getAll()
      .then((response) => {
        setNames(names.concat(response.map((n) => n.name.common)));
      })
      .catch((e) => console.log(e));
  }, []);

  //event handler
  const handleSearch = (event) => {
    event.preventDefault();
    setSelectedCountry(null);

    // SEARCH FOR COUNTRIES
    const countryName = search.toLowerCase();
    const countries = names.filter((n) =>
      n.toLowerCase().includes(countryName)
    );

    // CHECK FOR NUMBER OF RESULTS
    if (countries.length > 1 && countries.length <= 10) {
      setSearchResults(countries);
      setError("");
    }
    if (countries.length === 1) {
      handleClick(countries[0]);
    }
    if (countries.length === 0) {
      setSearchResults([]);
      setError("no results found");
    }
    if (countries.length > 10) {
      setSearchResults([]);
      setError("too many matches, specify another filter");
    }
  };

  const handleClick = (name) => {
    const name_lower = name.toLowerCase();
    CountryServices.getOne(name_lower).then((response) => {
      setSelectedCountry(response);
      setSearchResults([]);
    });
  };

  return (
    <div>
      <SearchBar
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
      />
      {error}
      <SearchResults searchResults={searchResults} handleClick={handleClick} />
      {selectedCountry ? (
        <CountryProfile selectedCountry={selectedCountry} />
      ) : null}
    </div>
  );
};

export default App;
