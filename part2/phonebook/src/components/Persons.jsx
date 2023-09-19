const Persons = ({ persons }) => {
  return (
    <>
      {persons.map((i) => (
        <p key={i.name}>
          {i.name} {i.number}
        </p>
      ))}
    </>
  );
};

export default Persons;
