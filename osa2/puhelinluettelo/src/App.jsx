import { useState, useEffect } from 'react';
import axios from 'axios';

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
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() =>{
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data);
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
      
      axios
        .post('http://localhost:3001/persons', personObject)
        .then(response => {
          setPersons(persons.concat(response.data));
        });
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