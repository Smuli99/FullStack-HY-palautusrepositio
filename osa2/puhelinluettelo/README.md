# Puhelinluettelo

## 2.6: puhelinluettelo step1

main.jsx
```
import reactDOM from 'react-dom/client';
import App from './App.jsx';

reactDOM.createRoot(document.getElementById('root')).render(<App />);
```

App.jsx
```
import { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([
    {
      name: 'Arto Hellas'
    }
  ]);
  const [newName, setNewName] = useState('');

  const addName = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName
    };

    setPersons(persons.concat(newPerson));
    setNewName('');
  }

  const handleNewName = (event) => setNewName(event.target.value);

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNewName} required="required" />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        <ul>
          {persons.map((person) => (
            <li key={person.name}>
              {person.name}
            </li>
          ))}
        </ul>
    </div>
  );
};

export default App;
```

## 2.7: puhelinluettelo step2

```
import { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([
    {
      name: 'Arto Hellas'
    }
  ]);
  const [newName, setNewName] = useState('');

  const addName = (event) => {
    event.preventDefault();
    const exists = persons.some(person => 
      person.name.toLowerCase() === newName.toLowerCase()
    );

    if (exists) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const personObject = {
        name: newName
      };
      
      setPersons(persons.concat(personObject));
    }
    
    setNewName('');
  }

  const handleNewName = (event) => setNewName(event.target.value);

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNewName} required="required" />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        <ul>
          {persons.map((person) => (
            <li key={person.name}>
              {person.name}
            </li>
          ))}
        </ul>
    </div>
  );
};

export default App;
```

## 2.8: puhelinluettelo step3

```
import { useState } from 'react';

const Header = ({ text }) => <h1>{text}</h1>;

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

const Persons = ({ persons }) => {
  return (
    <ul>
      {persons.map(person =>
        <li key={person.name}>
          {person.name} {person.number || '-no number-'}
        </li>
      )}
    </ul>
  );
};

const App = () => {
  const [persons, setPersons] = useState([
    {
      name: 'Arto Hellas',
      number: '040-123456'
    }
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const addName = (event) => {
    event.preventDefault();
    const exists = persons.some(person => 
      person.name.toLowerCase() === newName.toLowerCase()
    );

    if (exists) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const personObject = {
        name: newName,
        number: newNumber.trim() === '' ? '' : newNumber
      };

      setPersons(persons.concat(personObject));
    }

    setNewName('');
    setNewNumber('');
  }

  return (
    <div>
      <Header text="Phonebook" />
      <NewPersonForm 
        addName={addName}
        newName={newName}
        handleNewName={(e) => setNewName(e.target.value)}
        newNumber={newNumber}
        handleNewNumber={(e) => setNewNumber(e.target.value)}
      />
      <Header text="Numbers" />
      <Persons persons={persons} />
    </div>
  );
};

export default App;
```

## 2.9*: puhelinluettelo step4 ja 2.10: puhelinluettelo step5

```
import { useState } from 'react';

const Header = ({ text }) => <h1>{text}</h1>;

const Persons = ({ persons, filter }) => {
  const filteredPersons = persons.filter(person => 
    person.name.toLowerCase().includes(filter.trim().toLowerCase())
  );
  
  return (
    <ul>
      {filteredPersons.map(person =>
        <li key={person.name}>
          {person.name} {person.number || '-no number-'}
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
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6425922' }
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  const addName = (event) => {
    event.preventDefault();
    const exists = persons.some(person => 
      person.name.toLowerCase() === newName.toLowerCase()
    );

    if (exists) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const personObject = {
        name: newName,
        number: newNumber.trim() === '' ? '' : newNumber
      };

      setPersons(persons.concat(personObject));
    }

    setNewName('');
    setNewNumber('');
  }

  return (
    <div>
      <Header text="Phonebook" />
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
      <Persons persons={persons} filter={filter} />
    </div>
  );
};

export default App;
```
