const Persons = ({ persons, handleDelete }) => {
  return (
    <>
      {persons.map((i) => (
        <div style={{ display: "flex" }} key={i.name}>
          <p>
            {i.name} {i.number}
          </p>
          <button key={i.id} onClick={() => handleDelete(i.id)}>
            delete
          </button>
        </div>
      ))}
    </>
  );
};

export default Persons;
