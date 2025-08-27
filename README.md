# FullStack-HY-palautusrepositorio
Tämä repositorio on tarkoitettu FullStackOpen kurssin tehtävien palautukseen.

## Osa 1

Osan 1 tehtävä palautus kokonaisuudessaan:

<details>
<summary>Kurssitiedot</summary>

### main.jsx
```
import ReactDOM from 'react-dom/client';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
```
### App.jsx
```
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

  return (
    <div>
      <Header course={course} />
      <Content part={course.parts} />
      <Total part={course.parts} />
    </div>
  );
};

export default App;
```
</details>
<details>
<summary>Unicafe</summary>

### main.jsx
```
import ReactDOM from 'react-dom/client';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
```
### App.jsx
```
import { useState } from 'react';

const Header = ({ text }) => <h1>{text}</h1>;

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const StatisticsLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text} {value}</td>
    </tr>  
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  
  if (total === 0) {
    return <p>No feedback given</p>;
  }

  const average = total === 0 ? 0 : (good - bad) / total; // return 0 if total is 0 else calculate average
  const positive = total === 0 ? 0 : (good / total) * 100; // return 0 if total is 0 else calculate positive percentage
  
  return (
    <table>
      <tbody>
        <StatisticsLine text="Good" value={good} />
        <StatisticsLine text="Neutral" value={neutral} />
        <StatisticsLine text="Bad" value={bad} />
        <StatisticsLine text="All" value={total} />
        <StatisticsLine text="Average" value={average} />
        <StatisticsLine text="Positive" value={`${positive} %`} />
      </tbody>
    </table>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGood = () => setGood(good + 1);
  const handleNeutral = () => setNeutral(neutral + 1);
  const handleBad = () => setBad(bad + 1);

  return (
    <div>
      <Header text="Give Feedback" />
      <Button onClick={handleGood} text="Good" />
      <Button onClick={handleNeutral} text="Neutral" />
      <Button onClick={handleBad} text="Bad" />
      <Header text="Statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
};

export default App;
```
</details>
<details>
<summary>Anekdootit</summary>

### main.jsx
```
import ReactDOM from 'react-dom/client'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
```
### App.jsx
```
import { useState } from 'react'

const Header = ({ text }) => <h1>{text}</h1>;

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const Content = ({ anecdote, votes }) => {
  return (
    <div>
      <p>{anecdote}</p>
      <p>has {votes} votes</p>
    </div>
  );
};

const MostVotes = ({ anecdotes, votes }) => {
  const maxVotes = Math.max(...votes);
  if (maxVotes === 0) {
    return <p>No votes yet</p>;
  }

  return (
    <div>
      <p>{anecdotes[votes.indexOf(maxVotes)]}</p>
      <p>has {maxVotes} votes</p>
    </div>
  );
};

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));

  const anecdotesHandler = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomIndex);
  };

  const votesHandler = () => {
    const newVotes = [...votes];
    newVotes[selected] += 1;
    setVotes(newVotes);
  };

  return (
    <div>
      <Header text="Anecdote of the day" />
      <Content anecdote={anecdotes[selected]} votes={votes[selected]} />
      <Button onClick={votesHandler} text="Vote" />
      <Button onClick={anecdotesHandler} text="Next Anecdote" />
      <Header text="Anecdote with most votes" />
      <MostVotes anecdotes={anecdotes} votes={votes} />
    </div>
  );
};

export default App
```
</details>

## Osa 2

Osan 2 tehtävä palautus kokonaisuudessaan:

<details>
<summary>Kurssitiedot</summary>

### main.jsx

```
import ReactDOM from 'react-dom/client';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
```

### App.jsx

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

### ./components/Course.jsx

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
  
</details>
<details>
<summary>Puhelinluettelo</summary>

### main.jsx
```
import reactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

reactDOM.createRoot(document.getElementById('root')).render(<App />);
```

### App.jsx

```
import { useState, useEffect } from 'react';
import numberService from './services/numbers';
import Message from './components/Message';

const Header = ({ text }) => <h1>{text}</h1>;

const Persons = ({ persons, filter, deleteName }) => {
  const filteredPersons = persons.filter(person => 
    person.name.toLowerCase().includes(filter.trim().toLowerCase())
  );

  return (
    <ul>
      {filteredPersons.map(person =>
        <li key={person.id}>
          {person.name} {person.number || '-no number-'}
          <button onClick={() => deleteName(person.id)}>delete</button>
        </li>
      )}
    </ul>
  );
};

const Filter = ({ filter, handleFilter }) => {
  return (
    <div>
      filter shown with <input value={filter} onChange={handleFilter} />
    </div>
  );
};

const NewPersonForm = ({ addName, newName, handleNewName, newNumber, handleNewNumber }) => {
  return (
    <form onSubmit={addName}>
      <div>
        name: <input value={newName} onChange={handleNewName} required="required" />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNewNumber} />
      </div>
        <button type="submit">add</button>
    </form>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [message, setMessage] = useState(null);

  useEffect(() =>{
    numberService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons);
      })
  }, []);

  const addName = (event) => {
    event.preventDefault();
    const exists = persons.some(person => 
      person.name.trim().toLowerCase() === newName.trim().toLowerCase()
    );

    if (exists) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with new one?`)) {
        const personToUpdate = persons.find(person =>
          person.name.trim().toLowerCase() === newName.trim().toLowerCase()
        );
        const updatedPerson = { ...personToUpdate, number: newNumber.trim() };

        numberService
          .update(personToUpdate.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person =>
              person.id !== personToUpdate.id ? person : returnedPerson
            ));
            showMessage(`Updated ${updatedPerson.name}`);
          })
          .catch(error => {
            showMessage(`Error: Information of ${personToUpdate.name} has already been removed from server`, 5000);
            setPersons(persons.filter(person =>
              person.id !== personToUpdate.id
            ));
            console.log(error);
          });
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber.trim()
      };

      numberService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson));
          showMessage(`Added ${newName}`);
        });
    }

    setNewName('');
    setNewNumber('');
  }

  const deleteName = (id) => {
    const person = persons.find(p => p.id === id);

    if (window.confirm(`Delete ${person.name} ?`)) {
      numberService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person =>
            person.id !== id
          ));
          showMessage(`Deleted ${person.name}`);
        })
        .catch(error => {
          showMessage(`Error: Person '${person.name}' was already removed from server`, 5000);
          setPersons(persons.filter(p => p.id !== id));
          console.log(`Error removing person: ${person.name}`, error);
        });
    }
  }

  const showMessage = (text, duration = 2000) => {
    setMessage(text);
    setTimeout(() => {
      setMessage(null);
    }, duration);
  };

  return (
    <div>
      <Header text="Phonebook" />
      <Message message={message} />
      <Filter filter={filter} handleFilter={(e) => setFilter(e.target.value)} />
      <Header text="Add a new" />
      <NewPersonForm 
        addName={addName}
        newName={newName}
        handleNewName={(e) => setNewName(e.target.value)}
        newNumber={newNumber}
        handleNewNumber={(e) => setNewNumber(e.target.value)}
      />
      <Header text="Numbers" />
      <Persons persons={persons} filter={filter} deleteName={deleteName} />
    </div>
  );
};

export default App;
```

### /components/Message.jsx

```
const Message = ({ message }) => {
    if (message === null) return null;

    const className = message.toLowerCase().includes('error')
        ? 'error'
        : 'message';

    return (
        <div className={className}>
            {message}
        </div>
    );
};

export default Message;
```

### index.css

```
.message {
    color: green;
    font-size: 20px;
    background: lightgrey;
    border: solid 5px green;
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 10px;
}

.error {
    color: red;
    font-size: 20px;
    background: lightgrey;
    border: solid 5px red;
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 10px;
}
```
</details>
<details>
<summary>Maiden tiedot</summary>

### main.jsx

```
import ReactDOM from 'react-dom/client';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
```

### App.jsx

```
import { useState, useEffect } from 'react';
import axios from 'axios';

const Info = ({ name, capital, area }) => {
  return (
    <div>
      <h1>{name}</h1>
      <div>Capital: {capital}</div>
      <div>Area: {area}</div>
    </div>
  );
};

const Languages = ({ languages }) => {
  return (
    <div>
      <h2>Languages</h2>
      <ul>
        {Object.values(languages).map(lang =>
          <li key={lang}>{lang}</li>
        )}
      </ul>
    </div>
  );
};

const Flag = ({ alt, png }) => {
  return (
    <div>
      <img src={png} alt={alt} style={{border: '2px solid black'}}/>
    </div>
  );
};

const Weather = ({ capital }) => {
  const [weather, setWeather] = useState(null);
  
  useEffect(() => {
    if (!capital) return;
    
    const api_key = import.meta.env.VITE_SOME_KEY;
    const url = 
    `https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${api_key}`;
    
    axios
      .get(url)
      .then(response => {
        setWeather(response.data);
      })
      .catch(error => {
        console.log('Error:', error);
      });
  }, [capital]);

  if (!weather) return <p>Loading weather information...</p>;

  return (
    <div>
      <h2>Weather in {capital}</h2>
      <p>Tempature: {weather.main.temp} Celcius</p>
      <img 
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt={weather.weather[0].description}
      />
      <p>Wind: {weather.wind.speed} m/s</p>
    </div>
  );
};

const CountryList = ({ countries, selectedCountry }) => {
  return (
    <div>
      {countries.map(country =>
        <div key={country.cca3}>
          {country.name.common}
          <button onClick={() => selectedCountry(country)}>Show</button>
        </div>
      )}
    </div>
  );
};

const Country = ({ country }) => {
  return (
    <div>
      <Info 
        name={country.name.common} 
        capital={country.capital[0]}
        area={country.area}
      />
      <Languages languages={country.languages} />
      <Flag alt={country.flags.alt} png={country.flags.png} />
      <Weather capital={country.capital[0]} />
    </div>
  );
};

const App = () => {
  const [value, setValue] = useState('');
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    if (value.trim() === '') {
      setCountries([]);
      setSelectedCountry(null);
      return;
    }
    
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        const filteredCountries = response.data.filter(country => 
          country.name.common.toLowerCase().includes(value.toLowerCase())
        );
        setCountries(filteredCountries);
        if (filteredCountries.length === 1) setSelectedCountry(null);
      });
  }, [value]);

  const selectedCountryHandler = (countryObject) => {
    setSelectedCountry(countryObject);
  };

  const handleChange = (event) => setValue(event.target.value);

  return (
    <div>
      Find countries: <input value={value} onChange={handleChange} />

      {countries.length > 10 && (
        <p>Too many matches, specify another filter</p>
      )}

      {countries.length > 1 && countries.length <= 10 && (
        <CountryList countries={countries} selectedCountry={selectedCountryHandler} />
      )}

      {countries.length === 1 && !selectedCountry && (
        <Country country={countries[0]} />
      )}

      {selectedCountry && (
        <Country country={selectedCountry} />
      )}
    </div>
  );
};

export default App;
```
</details>

## Osa3

Linkki tehtävän 3.10 osoitteelle: https://puhelinluettelo-g5gy.onrender.com/
