const Header = (props) => {
  console.log(props.course.name);
  return <h1>{props.course.name}</h1>;
};

const Content = (props) => {
  return (
    <>
      <Part content={props.course.parts[0]} />
      <Part content={props.course.parts[1]} />
      <Part content={props.course.parts[2]} />
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
  const total =
    props.course.parts[0].exercises +
    props.course.parts[1].exercises +
    props.course.parts[2].exercises;
  return <p>Number of exercises {total}</p>;
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  );
};

export default App;
