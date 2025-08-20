import { useState, useEffect } from 'react';
import numberService from './services/numbers';

const Header = ({ text }) => <h1>{text}</h1>;

const Persons = ({ persons, filter, deleteName }) => {
  const filteredPersons = persons.filter(person => 
    person.name.toLowerCase().includes(filter.trim().toLowerCase())
  );
  
  return (
    <ul>
      {filteredPersons.map(person =>
        <li key={person.name}>
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

  useEffect(() =>{
    numberService
      .getAll()
      .then(inititalPersons => {
        setPersons(inititalPersons);
      })
  }, []);

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
      
      numberService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson));
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
        })
        .catch(error => {
          alert(`Person '${person.name}' was already removed from server`);
          setPersons(persons.filter(p => p.id !== id));
          console.error(`Error removing person: ${person.name}`, error);
        });
    }
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
      <Persons persons={persons} filter={filter} deleteName={deleteName} />
    </div>
  );
};

export default App;