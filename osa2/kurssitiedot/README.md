# Kurssitiedot

## 2.1: kurssitiedot step6

```
const Header = ({ text }) => <h1>{text}</h1>;

const Part = ({ name, exercises }) => <p>{name} {exercises}</p>;

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part => (
        <Part key={part.id}
          name={part.name}
          exercises={part.exercises} 
        />
      ))}
    </div>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header text={course.name} />
      <Content parts={course.parts} />
    </div>
  );
};

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  };

  return (
    <div>
      <Course course={course} />
    </div>
  );
};

export default App;
```

## 2.2: kurssitiedot step7

```
const Header = ({ text }) => <h1>{text}</h1>;

const Part = ({ name, exercises }) => <p>{name} {exercises}</p>;

const Total = ({ parts }) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0);
  return (
    <p>
      <strong>Total of {total} exercises</strong>
    </p>
  );
};

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part => (
        <Part key={part.id}
          name={part.name}
          exercises={part.exercises} 
        />
      ))}
      <Total parts={parts} />
    </div>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header text={course.name} />
      <Content parts={course.parts} />
    </div>
  );
};

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  };

  return (
    <div>
      <Course course={course} />
    </div>
  );
};

export default App;
```

## 2.3*: kurssitiedot step8 ja 2.4: kurssitiedot step9

```
const Header = ({ text }) => <h1>{text}</h1>;

const Part = ({ name, exercises }) => <p>{name} {exercises}</p>;

const Total = ({ parts }) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0);
  return (
    <p>
      <strong>Total of {total} exercises</strong>
    </p>
  );
};

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part => (
        <Part key={part.id}
          name={part.name}
          exercises={part.exercises} 
        />
      ))}
      <Total parts={parts} />
    </div>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header text={course.name} />
      <Content parts={course.parts} />
    </div>
  );
};

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ];

  return (
    <div>
      {courses.map(course => (
        <Course key={course.id}
          course={course}
        />
      ))}
    </div>
  );
};

export default App;
```

## 2.5: erillinen moduuli

App.jsx
```
import Course from './components/Course';

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ];

  return (
    <div>
      {courses.map(course => (
        <Course key={course.id}
          course={course}
        />
      ))}
    </div>
  );
};

export default App;
```
components/Course.jsx
```
const Header = ({ text }) => <h1>{text}</h1>;

const Part = ({ name, exercises }) => <p>{name} {exercises}</p>;

const Total = ({ parts }) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0);
  return (
    <p>
      <strong>Total of {total} exercises</strong>
    </p>
  );
};

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part => (
        <Part key={part.id}
          name={part.name}
          exercises={part.exercises} 
        />
      ))}
      <Total parts={parts} />
    </div>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header text={course.name} />
      <Content parts={course.parts} />
    </div>
  );
};

export default Course;
```
