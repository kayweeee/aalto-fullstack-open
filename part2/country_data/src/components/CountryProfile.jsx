import { useState, useEffect } from "react";
import CountryService from "../services/countries";

const CountryProfile = ({ selectedCountry }) => {
  const [weatherInfo, setWeatherInfo] = useState(null);
  const n = selectedCountry;
  useEffect(() => {
    CountryService.getWeather(n.capital).then((response) =>
      setWeatherInfo(response)
    );
  }, [selectedCountry]);

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

      {/* WEATHER */}
      {weatherInfo ? (
        <div>
          <h2>Weather in {n.capital}</h2>
          <img
            src={`https://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@2x.png`}
          />
          <p>Temperature: {weatherInfo.main.temp} Celcius</p>
          <p>Wind: {weatherInfo.wind.speed} m/s</p>
        </div>
      ) : null}
    </div>
  );
};

export default CountryProfile;
