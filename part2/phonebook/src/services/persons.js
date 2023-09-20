import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

const getData = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (newEntry) => {
  const request = axios.post(baseUrl, newEntry);
  return request.then((response) => response.data);
};

const remove = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
};

const update = (id, changedPerson) => {
  const request = axios.put(`${baseUrl}/${id}`, changedPerson);
  return request.then((response) => response.data);
};

export default { getData, create, remove, update };
