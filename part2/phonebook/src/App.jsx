import { useState, useEffect } from "react";
import axios from "axios";
//components
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  // state
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState("");

  // fetch initial data
  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);

  // event handler functions
  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      persons.some(
        (person) =>
          person.name.toLowerCase().trim() === newName.toLowerCase().trim()
      )
    ) {
      alert(`${newName} already exists in the phonebook`);
    } else {
      const newEntry = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      };
      setPersons(persons.concat(newEntry));
    }
    setNewName("");
    setNewNumber("");
  };

  const handleSearch = (event) => {
    event.preventDefault();
    const result = persons.find(
      (i) => i.name.toLowerCase().trim() === searchTerm.toLowerCase().trim()
    );
    if (result === undefined) {
      setSearchResult("this person does not exist in the phonebook");
    } else {
      setSearchResult(`${result.name} ${result.number}`);
    }
    setSearchTerm("");
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleSearch={handleSearch}
        searchResult={searchResult}
      />
      <h2>Add a new number</h2>
      <PersonForm
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        handleSubmit={handleSubmit}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} />
    </div>
  );
};

export default App;
