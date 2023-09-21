import axios from "axios";
const countriesURL = "https://studies.cs.helsinki.fi/restcountries/api";

const getAll = () => {
  const request = axios.get(`${countriesURL}/all`);
  return request.then((response) => response.data);
};

const getOne = (name_lower) => {
  const request = axios.get(`${countriesURL}/name/${name_lower}`);
  return request.then((response) => response.data);
};

const getWeather = (capital) => {
  const request = axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${
      import.meta.env.VITE_WEATHER_API
    }&units=metric`
  );
  return request.then((response) => response.data);
};

export default { getAll, getOne, getWeather };
