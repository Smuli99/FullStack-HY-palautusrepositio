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