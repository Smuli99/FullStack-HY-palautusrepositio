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

## 2.11: puhelinluettelo step6

db.json
```
{
  "persons":[
    { 
      "name": "Arto Hellas", 
      "number": "040-123456",
      "id": "1"
    },
    { 
      "name": "Ada Lovelace", 
      "number": "39-44-5323523",
      "id": "2"
    },
    { 
      "name": "Dan Abramov", 
      "number": "12-43-234345",
      "id": "3"
    },
    { 
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122",
      "id": "4"
    }
  ]
}
```
package.json
```
"server": "json-server -p 3001 db.json"
```
App.jsx
```
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
  }, [])

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

## 2.12: puhelinluettelo step7

```
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
````

## 2.13: puhelinluettelo step8

./services/numbers.jsx
```
import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons';

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then(response => response.data);
};

const create = (newObject) => {
    const request = axios.post(baseUrl, newObject);
    return request.then(response => response.data);
};

export default { getAll, create };
```
App.jsx
```
import { useState, useEffect } from 'react';
import numberService from './services/numbers';

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

## 2.14: puhelinluettelo step9

```
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
```

## 2.15*: puhelinluettelo step10

/services/numbers.jsx
```
import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons';

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then(response => response.data);
};

const create = (newObject) => {
    const request = axios.post(baseUrl, newObject);
    return request.then(response => response.data);
};

const remove = (id) => {
    return axios.delete(`${baseUrl}/${id}`);
};

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject);
    return request.then(response => response.data);
};

export default { getAll, create, remove, update };
```
App.jsx
```
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
            ))
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
```

## 2.16: puhelinluettelo step11

index.css
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
/components/Message.jsx
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
App.jsx
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
  const [message, setMessage] = useState(null);

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
            ))
          });

        setMessage(`Updated ${updatedPerson.name}`);
        setTimeout(() => {
          setMessage(null);
        }, 2000);
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
        });

      setMessage(`Added ${newName}`);
      setTimeout(() => {
        setMessage(null);
      }, 2000);
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
          setMessage(`Error: Person '${person.name}' was already removed from server`);
          setPersons(persons.filter(p => p.id !== id));
          console.log(`Error removing person: ${person.name}`, error);
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        });

      setMessage(`Deleted ${person.name}`);
      setTimeout(() => {
        setMessage(null);
      }, 2000);
    }
  }

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

## 2.17*: puhelinluettelo step12

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
