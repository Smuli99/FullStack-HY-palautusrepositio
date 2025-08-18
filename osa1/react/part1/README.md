# Reactin alkeet

## Tehtävä 1.1

Tässä tehtävässä aloitettavaa ohjelmaa kehitellään eteenpäin muutamassa seuraavassa tehtävässä. Tässä ja kurssin aikana muissakin vastaan tulevissa tehtäväsarjoissa ohjelman lopullisen version palauttaminen riittää. Voit toki halutessasi tehdä commitin jokaisen tehtävän jälkeisestä tilanteesta, mutta se ei ole välttämätöntä.

Luo Vitellä uusi sovellus. Muuta main.jsx muotoon

```
import ReactDOM from 'react-dom/client'

import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
```
ja tiedosto App.jsx muotoon
```
const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <h1>{course}</h1>
      <p>
        {part1} {exercises1}
      </p>
      <p>
        {part2} {exercises2}
      </p>
      <p>
        {part3} {exercises3}
      </p>
      <p>Number of exercises {exercises1 + exercises2 + exercises3}</p>
    </div>
  )
}

export default App
```
ja poista ylimääräiset tiedostot App.css ja index.css ja hakemisto assets.

Koko sovellus on nyt ikävästi yhdessä komponentissa. Refaktoroi sovelluksen koodi siten, että se koostuu kolmesta uudesta komponentista: Header, Content ja Total. Kaikki data pidetään edelleen komponentissa App, joka välittää tarpeelliset tiedot kullekin komponentille props:ien avulla. Header huolehtii kurssin nimen renderöimisestä, Content osista ja niiden tehtävämääristä ja Total tehtävien yhteismäärästä.

Tee uudet komponentit tiedostoon App.jsx.

Komponentin App runko tulee olemaan suunnilleen seuraavanlainen:
```
const App = () => {
  // const-määrittelyt

  return (
    <div>
      <Header course={course} />
      <Content ... />
      <Total ... />
    </div>
  )
}
```
## Vastaus 1.1:

main.jsx
```
import ReactDOM from 'react-dom/client';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
```
App.jsx
```
const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  );
};

const Content = (props) => {
  return (
    <p>{props.part} {props.exercise}</p>
  );
};

const Total = (props) => {
  return (
    <p>{props.content} {props.exercises}</p>
  );
};

const App = () => {
  const course = 'Half Stack application development';
  const part1 = 'Fundamentals of React';
  const exercises1 = 10;
  const part2 = 'Using props to pass data';
  const exercises2 = 7;
  const part3 = 'State of a component';
  const exercises3 = 14;
  const totalContent = 'Number of exercises: ';
  const totalExercises = exercises1 + exercises2 + exercises3;

  return (
    <div>
      <Header course={course} />
      <Content part={part1} exercise={exercises1} />
      <Content part={part2} exercise={exercises2} />
      <Content part={part3} exercise={exercises3} />
      <Total content={totalContent} exercises={totalExercises} />
    </div>
  );
};

export default App
```

## Tehtävä 1.2

Refaktoroi vielä komponentti Content siten, että se ei itse renderöi yhdenkään osan nimeä eikä sen tehtävälukumäärää vaan ainoastaan kolme Part-nimistä komponenttia, joista kukin siis renderöi yhden osan nimen ja tehtävämäärän.
```
const Content = ... {
  return (
    <div>
      <Part .../>
      <Part .../>
      <Part .../>
    </div>
  )
}
```

## Vastaus 1.2

App.jsx
```
const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  );
};

const Part = (props) => {
  return (
    <p>{props.part} {props.exercise}</p>
  );
};

const Content = (props) => {
  return (
    <div>
      <Part part={props.part1} exercise={props.exercise1} />
      <Part part={props.part2} exercise={props.exercise2} />
      <Part part={props.part3} exercise={props.exercise3} />
    </div>
  );
};

const Total = (props) => {
  return (
    <p>{props.content} {props.exercises}</p>
  );
};

const App = () => {
  const course = 'Half Stack application development';
  const part1 = 'Fundamentals of React';
  const exercises1 = 10;
  const part2 = 'Using props to pass data';
  const exercises2 = 7;
  const part3 = 'State of a component';
  const exercises3 = 14;
  const totalContent = 'Number of exercises: ';
  const totalExercises = exercises1 + exercises2 + exercises3;

  return (
    <div>
      <Header course={course} />
      <Content 
        part1={part1} exercise1={exercises1}
        part2={part2} exercise2={exercises2}
        part3={part3} exercise3={exercises3}
      />
      <Total content={totalContent} exercises={totalExercises} />
    </div>
  );
};
```
