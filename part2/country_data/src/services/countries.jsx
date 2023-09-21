import axios from "axios";
const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api";

const getAll = () => {
  const request = axios.get(`${baseUrl}/all`);
  return request.then((response) => response.data);
};

const getOne = (name_lower) => {
  const request = axios.get(`${baseUrl}/name/${name_lower}`);
  return request.then((response) => response.data);
};

export default { getAll, getOne };
