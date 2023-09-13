const Header = (props) => {
  return <h1>{props.course}</h1>;
};

const Content = (props) => {
  return (
    <>
      <p>
        {props.content[0].part} {props.content[0].exercise}
      </p>
      <p>
        {props.content[1].part} {props.content[1].exercise}
      </p>
      <p>
        {props.content[2].part} {props.content[2].exercise}
      </p>
    </>
  );
};

const Total = (props) => {
  return <p>Number of exercises {props.total}</p>;
};

const App = () => {
  const course = "Half Stack application development";
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;
  const content = [
    { part: part1, exercise: exercises1 },
    { part: part2, exercise: exercises2 },
    { part: part3, exercise: exercises3 },
  ];
  const total = exercises1 + exercises2 + exercises3;

  return (
    <div>
      <Header course={course} />
      <Content content={content} />
      <Total total={total} />
    </div>
  );
};

export default App;
