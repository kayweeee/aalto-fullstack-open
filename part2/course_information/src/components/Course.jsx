const Header = (props) => {
  return <h2>{props.course.name}</h2>;
};

const Content = (props) => {
  return (
    <>
      {props.course.parts.map((i) => (
        <Part key={i.id} content={i} />
      ))}
    </>
  );
};

const Part = (props) => {
  return (
    <p>
      {props.content.name} {props.content.exercises}
    </p>
  );
};

const Total = (props) => {
  const ex_array = props.course.parts.map((i) => i.exercises);
  const total = ex_array.reduce(
    (accumulator, currentValue) => accumulator + currentValue
  );
  return (
    <p>
      <strong>total of {total} exercises</strong>
    </p>
  );
};

const Course = ({ course }) => {
  return (
    <>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </>
  );
};

export default Course;
