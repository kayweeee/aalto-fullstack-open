const CountryProfile = ({ selectedCountry }) => {
  const n = selectedCountry;
  console.log(n.name.common);
  return (
    <div key={n.name.common}>
      <h2 key={n.name.common}>{n.name.common}</h2>
      <p>Capital: {n.capital}</p>
      <p>Area: {n.area}</p>
      <p>Languages:</p>
      <ul>
        {Object.values(n.languages).map((i) => (
          <li key={n.name.common + i}>{i}</li>
        ))}
      </ul>
      <img src={n.flags.svg} style={{ width: 200 }} />
    </div>
  );
};

export default CountryProfile;
