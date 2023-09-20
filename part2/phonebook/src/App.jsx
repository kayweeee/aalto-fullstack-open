import { useState, useEffect } from "react";
import personsService from "./services/persons";
//components
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import SuccessNoti from "./components/SuccessNoti";

const App = () => {
  // state
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState("");
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  // fetch initial data
  useEffect(() => {
    personsService
      .getData()
      .then((response) => {
        setPersons(response);
      })
      .catch((e) => console.log(e));
  }, []);

  // event handler functions
  const handleSubmit = (event) => {
    event.preventDefault();
    // UPDATE
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
        const person = persons.find(
          (n) => n.name.toLowerCase().trim() === newName.toLowerCase().trim()
        );
        const changedPerson = { ...person, number: newNumber };
        personsService
          .update(person.id, changedPerson)
          .then((response) => {
            setPersons(
              persons.map((n) => (n.id === response.id ? response : n))
            );
            setSuccess(`${response.name}'s number has been changed`);
            setTimeout(() => {
              setSuccess(null);
            }, 3000);
          })
          // IF UPDATE FAILS
          .catch((e) => {
            setError(`${person.name} has already been deleted`);
            setPersons(persons.filter((n) => n.name !== newName));
            setTimeout(() => {
              setError(null);
            }, 3000);
          });
      }
    } else {
      const newEntry = {
        name: newName,
        number: newNumber,
      };
      personsService
        .create(newEntry)
        .then((response) => {
          setPersons(persons.concat(response));
          setSuccess(`${response.name}'s number has been added`);
          setTimeout(() => {
            setSuccess(null);
          }, 3000);
        })
        .catch((e) => console.log(e));
    }

    // RESET FORM VALUES
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
      personsService.remove(id).catch((e) => console.log(e));
      setPersons(persons.filter((n) => n.id !== id));
      setError(`${person.name} has been deleted`);
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  };

  // ----------------------------------------------

  return (
    <div>
      <h1>Phonebook</h1>
      <SuccessNoti success={success} error={error} />
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
