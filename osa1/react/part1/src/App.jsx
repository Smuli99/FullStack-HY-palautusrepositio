import { useState } from 'react';

/*
const Header = (props) => {
  return (
    <h1>{props.course.name}</h1>
  );
};

const Part = (props) => {
  return (
    <p>{props.part.name} {props.part.exercises}</p>
  );
};

const Content = (props) => {
  return (
    <div>
      <Part part={props.part[0]} />
      <Part part={props.part[1]} />
      <Part part={props.part[2]} />
    </div>
  );
};

const Total = (props) => {
  const name = 'Number of exercises';
  const total = props.part.reduce((sum, part) => sum + part.exercises, 0);

  return (
    <p>{name} {total}</p>
  );
};


const Display = ({ counter }) => {
  return (
    <p>{counter}</p>
  );
};

const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>{text}</button>
  );
};

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  };

  const [counter, setCounter] = useState(0);

  const increase = () => setCounter(counter + 1);
  const reset = () => setCounter(0);

  return (
    <div>
      <Header course={course} />
      <Content part={course.parts} />
      <Total part={course.parts} />
      <Display counter={counter} />
      <Button onClick={increase} text="Increase by one" />
      <Button onClick={reset} text="Reset" />
    </div>
  );
};
*/

const History = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <div>
        the app is used by pressing buttons
      </div>
    );
  }
  return (
    <div>
      button press history: {props.allClicks.join(' ')}
    </div>
  );
};

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const App = () => {
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);
  const [allClicks, setAllClicks] = useState([]);

  const handleLeftClick = () => {
    setAllClicks(allClicks.concat('L'));
    setLeft(left + 1);
  };

  const handleRightClick = () => {
    setAllClicks(allClicks.concat('R'));
    setRight(right + 1);
  };

  return (
    <div>
      <div>
        {left}
        <Button onClick={handleLeftClick} text='left' />
        <Button onClick={handleRightClick} text='right' />
        {right}
        <History allClicks={allClicks} />
      </div>
    </div>
  );
};

export default App