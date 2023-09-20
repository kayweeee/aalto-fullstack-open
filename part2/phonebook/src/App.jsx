import { useState, useEffect } from "react";
import personsService from "./services/persons";
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
    personsService.getData().then((response) => {
      setPersons(response);
      console.log(response);
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
      if (
        confirm(
          `${newName} already exists in the phonebook, replace the old number with a new one?`
        )
      ) {
        /// add in code to update number
        const person = persons.find(
          (n) => n.name.toLowerCase().trim() === newName.toLowerCase().trim()
        );
        const changedPerson = { ...person, number: newNumber };
        personsService
          .update(person.id, changedPerson)
          .then((response) =>
            setPersons(
              persons.map((n) => (n.id === response.id ? response : n))
            )
          );
      }
    } else {
      const newEntry = {
        name: newName,
        number: newNumber,
      };
      personsService.create(newEntry).then((response) => {
        setPersons(persons.concat(response));
      });
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

  const handleDelete = (id) => {
    const person = persons.find((n) => n.id === id);
    if (confirm(`Delete ${person.name}`)) {
      personsService.remove(id);
      setPersons(persons.filter((n) => n.id !== id));
    }
  };

  // ----------------------------------------------

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
      <Persons persons={persons} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
