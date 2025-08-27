# Puhelinluettelon Backend

Puhelinluettelo backend vastaukset. Lisätty vain joka tehtävää varten muutetut tiedostot.

## 3.1 puhelinluettelon backend step1

### index.js

```
const express = require('express');
const app = express();

let persons = [
    {
        id: "1",
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: "2",
        name: "Ada Lovelace",
        number: "39-44-5323523"
    },
    {
        id: "3",
        name: "Dan Abramov",
        number: "12-43-234345"
    },
    {
        id: "4",
        name: "Mary Poppendieck",
        number: "39-23-6423122"
    }
];

app.get('/api/persons', (request, response) => {
    response.json(persons);
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
```

## 3.2: puhelinluettelon backend step2

### index.js

```
const express = require('express');
const app = express();

let persons = [
    {
        id: "1",
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: "2",
        name: "Ada Lovelace",
        number: "39-44-5323523"
    },
    {
        id: "3",
        name: "Dan Abramov",
        number: "12-43-234345"
    },
    {
        id: "4",
        name: "Mary Poppendieck",
        number: "39-23-6423122"
    }
];

app.get('/api/persons', (request, response) => {
    response.json(persons);
});

app.get('/info', (request, response) => {
    const totalPersons = persons.length;
    const date = new Date();
    response.send(`
        <p>Phonebook has info for ${totalPersons} people</p>
        <p>${date}</p>
    `);
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
```

## 3.3: puhelinluettelon backend step3

### index.js

```
const express = require('express');
const app = express();

let persons = [
    {
        id: "1",
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: "2",
        name: "Ada Lovelace",
        number: "39-44-5323523"
    },
    {
        id: "3",
        name: "Dan Abramov",
        number: "12-43-234345"
    },
    {
        id: "4",
        name: "Mary Poppendieck",
        number: "39-23-6423122"
    }
];

app.get('/api/persons', (request, response) => {
    response.json(persons);
});

app.get('/info', (request, response) => {
    const totalPersons = persons.length;
    const date = new Date();
    response.send(`
        <p>Phonebook has info for ${totalPersons} people</p>
        <p>${date}</p>
    `);
});

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id;
    const person = persons.find(p => p.id === id);

    if (person) response.json(person);
    else response.status(404).end();
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
```

## 3.4: puhelinluettelon backend step4

### index.js

```
const express = require('express');
const app = express();

let persons = [
    {
        id: "1",
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: "2",
        name: "Ada Lovelace",
        number: "39-44-5323523"
    },
    {
        id: "3",
        name: "Dan Abramov",
        number: "12-43-234345"
    },
    {
        id: "4",
        name: "Mary Poppendieck",
        number: "39-23-6423122"
    }
];

app.get('/api/persons', (request, response) => {
    response.json(persons);
});

app.get('/info', (request, response) => {
    const totalPersons = persons.length;
    const date = new Date();
    response.send(`
        <p>Phonebook has info for ${totalPersons} people</p>
        <p>${date}</p>
    `);
});

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id;
    const person = persons.find(p => p.id === id);

    if (person) response.json(person);
    else response.status(404).end();
});

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id;
    console.log(request.params);
    persons = persons.filter(p => p.id !== id);

    response.status(204).end();
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
```

## 3.5: puhelinluettelon backend step5

### index.js

```
const express = require('express');
const app = express();

app.use(express.json());

let persons = [
    {
        id: "1",
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: "2",
        name: "Ada Lovelace",
        number: "39-44-5323523"
    },
    {
        id: "3",
        name: "Dan Abramov",
        number: "12-43-234345"
    },
    {
        id: "4",
        name: "Mary Poppendieck",
        number: "39-23-6423122"
    }
];

app.get('/api/persons', (request, response) => {
    response.json(persons);
});

app.get('/info', (request, response) => {
    const totalPersons = persons.length;
    const date = new Date();
    response.send(`
        <p>Phonebook has info for ${totalPersons} people</p>
        <p>${date}</p>
    `);
});

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id;
    const person = persons.find(p => p.id === id);

    if (person) response.json(person);
    else response.status(404).end();
});

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id;
    console.log(request.params);
    persons = persons.filter(p => p.id !== id);

    response.status(204).end();
});

const generateId = () => String(Math.floor(Math.random() * 1000));

app.post('/api/persons', (request, response) => {
    const body = request.body;

    if (!body.name) {
        return response.status(400).json({
            error: 'name missing'
        });
    }

    const person = {
        id: generateId(),
        name: body.name,
        number: body.number || '--no number--'
    };

    persons = persons.concat(person);

    console.log(person);
    response.json(person);
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
```

## 3.6: puhelinluettelon backend step6

### index.js

```
const express = require('express');
const app = express();

app.use(express.json());

let persons = [
    {
        id: "1",
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: "2",
        name: "Ada Lovelace",
        number: "39-44-5323523"
    },
    {
        id: "3",
        name: "Dan Abramov",
        number: "12-43-234345"
    },
    {
        id: "4",
        name: "Mary Poppendieck",
        number: "39-23-6423122"
    }
];

app.get('/api/persons', (request, response) => {
    response.json(persons);
});

app.get('/info', (request, response) => {
    const totalPersons = persons.length;
    const date = new Date();
    response.send(`
        <p>Phonebook has info for ${totalPersons} people</p>
        <p>${date}</p>
    `);
});

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id;
    const person = persons.find(p => p.id === id);

    if (person) response.json(person);
    else response.status(404).end();
});

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id;
    console.log(request.params);
    persons = persons.filter(p => p.id !== id);

    response.status(204).end();
});

const generateId = () => String(Math.floor(Math.random() * 1000));

const dublicateName = (name) => {
    return persons.some(p => 
        p.name.toLowerCase() === name.trim().toLowerCase()
    );  
};

app.post('/api/persons', (request, response) => {
    const body = request.body;

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'name or number missing'
        });
    }

    const name = body.name.trim();

    if (dublicateName(name)) {
        return response.status(409).json({
            error: 'name must be unique'
        });
    }

    const person = {
        id: generateId(),
        name: name,
        number: body.number
    };

    persons = persons.concat(person);

    console.log(person);
    response.json(person);
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
```

## 3.7: puhelinluettelon backend step7

### index.js

```
const express = require('express');
const morgan = require('morgan');
const app = express();

let persons = [
    {
        id: "1",
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: "2",
        name: "Ada Lovelace",
        number: "39-44-5323523"
    },
    {
        id: "3",
        name: "Dan Abramov",
        number: "12-43-234345"
    },
    {
        id: "4",
        name: "Mary Poppendieck",
        number: "39-23-6423122"
    }
];

app.use(express.json());
app.use(morgan('tiny'));

app.get('/api/persons', (request, response) => {
    response.json(persons);
});

app.get('/info', (request, response) => {
    const totalPersons = persons.length;
    const date = new Date();
    response.send(`
        <p>Phonebook has info for ${totalPersons} people</p>
        <p>${date}</p>
    `);
});

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id;
    const person = persons.find(p => p.id === id);

    if (person) response.json(person);
    else response.status(404).end();
});

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id;
    console.log(request.params);
    persons = persons.filter(p => p.id !== id);

    response.status(204).end();
});

const generateId = () => String(Math.floor(Math.random() * 1000));

const dublicateName = (name) => {
    return persons.some(p => 
        p.name.toLowerCase() === name.trim().toLowerCase()
    );  
};

app.post('/api/persons', (request, response) => {
    const body = request.body;

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'name or number missing'
        });
    }

    const name = body.name.trim();

    if (dublicateName(name)) {
        return response.status(409).json({
            error: 'name must be unique'
        });
    }

    const person = {
        id: generateId(),
        name: name,
        number: body.number
    };

    persons = persons.concat(person);

    console.log('Added', person);
    response.json(person);
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
```

## 3.8*: puhelinluettelon backend step8

### index.js

```
const express = require('express');
const morgan = require('morgan');
const app = express();

let persons = [
    {
        id: "1",
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: "2",
        name: "Ada Lovelace",
        number: "39-44-5323523"
    },
    {
        id: "3",
        name: "Dan Abramov",
        number: "12-43-234345"
    },
    {
        id: "4",
        name: "Mary Poppendieck",
        number: "39-23-6423122"
    }
];

app.use(express.json());

morgan.token('body', (request) => {
    return request.method === 'POST'
        ? JSON.stringify(request.body)
        : '';
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

app.get('/api/persons', (request, response) => {
    response.json(persons);
});

app.get('/info', (request, response) => {
    const totalPersons = persons.length;
    const date = new Date();
    response.send(`
        <p>Phonebook has info for ${totalPersons} people</p>
        <p>${date}</p>
    `);
});

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id;
    const person = persons.find(p => p.id === id);

    if (person) response.json(person);
    else response.status(404).end();
});

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id;
    console.log(request.params);
    persons = persons.filter(p => p.id !== id);

    response.status(204).end();
});

const generateId = () => String(Math.floor(Math.random() * 1000));

const dublicateName = (name) => {
    return persons.some(p => 
        p.name.toLowerCase() === name.trim().toLowerCase()
    );  
};

app.post('/api/persons', (request, response) => {
    const body = request.body;

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'name or number missing'
        });
    }

    const name = body.name.trim();

    if (dublicateName(name)) {
        return response.status(409).json({
            error: 'name must be unique'
        });
    }

    const person = {
        id: generateId(),
        name: name,
        number: body.number
    };

    persons = persons.concat(person);

    console.log('Added', person);
    response.json(person);
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
```

## 3.9 puhelinluettelon backend step9

### puhelinluettelo/services/numbers.jsx

```
import axios from 'axios';

const baseUrl = '/api/persons';

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
```

### index.js

Lisätty:
```
app.use(express.static('dist'));
```

## 3.10 puhelinluettelon backend step10 ja 3.11 puhelinluettelo full stack

Osoite: ```https://puhelinluettelo-g5gy.onrender.com/```

## 3.12: tietokanta komentoriviltä

### mongo.js

```
const mongoose = require('mongoose');

if (process.argv.length < 3) {
    console.log('give password as argument');
    process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://hytosama:${password}@cluster0.20yhkfq.mongodb.net/phoneBookApp?
retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set('strictQuery', false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
});

const Person = mongoose.model('Person', personSchema);

if (process.argv.length === 3) {
    console.log('Phonebook:');
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(`${person.name} ${person?.number}`);
        })
        mongoose.connection.close();
    });
} else {
    const person = new Person({
        name: process.argv[3].trim(),
        number: process.argv[4] ? process.argv[4].trim() : '--no number--'
    });
    
    person.save().then(result => {
        console.log(`Added ${person.name} number: ${person.number} to phonebook!`);
        mongoose.connection.close();
    });
}
```

## 3.13: puhelinluettelo ja tietokanta, step1 ja ## 3.14: puhelinluettelo ja tietokanta, step2

### index.js

```
require('dotenv').config();
const Person = require('./models/person');
const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(express.json());
app.use(express.static('dist'));

morgan.token('body', (request) => {
    return request.method === 'POST'
        ? JSON.stringify(request.body)
        : '';
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

app.get('/api/persons', (request, response) => {
    Person.find({})
        .then(persons => {
            response.json(persons);
        });
});

app.get('/info', (request, response) => {
    Person.countDocuments({})
        .then(count => {
            const date = new Date();
            response.send(`
                <p>Phonebook has info for ${count} people</p>
                <p>${date}</p>
            `);
        });
});

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id;
   
    Person.findById(id)
        .then(person => {
            if (person) response.json(person);
            else response.status(404).end();
        })
        .catch(error => {
            console.log('error finding person:', error);
        });
});

// TODO:
app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id;
    console.log(request.params);
    persons = persons.filter(p => p.id !== id);

    response.status(204).end();
});

// TODO:
const dublicateName = (name) => {
    return persons.some(p => 
        p.name.toLowerCase() === name.trim().toLowerCase()
    );  
};

app.post('/api/persons', (request, response) => {
    const body = request.body;

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'name or number missing'
        });
    }

    const name = body.name.trim();

    // TODO:
    /*
    if (dublicateName(name)) {
        return response.status(409).json({
            error: 'name must be unique'
        });
    }
    */

    const person = new Person({
        name: name,
        number: body.number,
    });

    person.save().then(savedNote => {
        response.json(savedNote);
        console.log('Added', person);
    });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
```

### /models/person.js

```
const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const url = process.env.MONGODB_URI;

console.log('connection to', url);
mongoose.connect(url)
    .then(response => {
        console.log('connected to MongoDB!');
    })
    .catch(error => {
        console.log('error connection to MongoDB failed:', error);
    });

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
});

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

module.exports = mongoose.model('Person', personSchema);
```

## 3.15: puhelinluettelo ja tietokanta, step3

### index.js

```
require('dotenv').config();
const Person = require('./models/person');
const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(express.json());
app.use(express.static('dist'));

morgan.token('body', (request) => {
    return request.method === 'POST'
        ? JSON.stringify(request.body)
        : '';
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

app.get('/api/persons', (request, response) => {
    Person.find({})
        .then(persons => {
            response.json(persons);
        });
});

app.get('/info', (request, response) => {
    Person.countDocuments({})
        .then(count => {
            const date = new Date();
            response.send(`
                <p>Phonebook has info for ${count} people</p>
                <p>${date}</p>
            `);
        });
});

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id;

    Person.findById(id)
        .then(person => {
            if (person) response.json(person);
            else response.status(404).end();
        })
        .catch(error => {
            console.log('error finding person:', error);
        });
});

// TODO:
app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id;

    Person.findByIdAndDelete(id)
        .then(result => {
            console.log('Deleted', id);
            response.status(204).end();
        })
        .catch(error => {
            console.log(error);
        });
});

// TODO:
const dublicateName = (name) => {
    return persons.some(p => 
        p.name.toLowerCase() === name.trim().toLowerCase()
    );  
};

app.post('/api/persons', (request, response) => {
    const body = request.body;

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'name or number missing'
        });
    }

    const name = body.name.trim();

    // TODO:
    /*
    if (dublicateName(name)) {
        return response.status(409).json({
            error: 'name must be unique'
        });
    }
    */

    const person = new Person({
        name: name,
        number: body.number,
    });

    person.save().then(savedNote => {
        response.json(savedNote);
        console.log('Added', person);
    });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
```

## 3.16: puhelinluettelo ja tietokanta, step4

### index.js

```
require('dotenv').config();
const Person = require('./models/person');
const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(express.json());
app.use(express.static('dist'));

morgan.token('body', (request) => {
    return request.method === 'POST'
        ? JSON.stringify(request.body)
        : '';
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

app.get('/api/persons', (request, response, next) => {
    Person.find({})
        .then(persons => {
            response.json(persons);
        })
        .catch(error => next(error));
});

app.get('/info', (request, response, next) => {
    Person.countDocuments({})
        .then(count => {
            const date = new Date();
            response.send(`
                <p>Phonebook has info for ${count} people</p>
                <p>${date}</p>
            `);
        })
        .catch(error => next(error));
});

app.get('/api/persons/:id', (request, response, next) => {
    const id = request.params.id;

    Person.findById(id)
        .then(person => {
            if (person) response.json(person);
            else response.status(404).end();
        })
        .catch(error => next(error));
});

app.delete('/api/persons/:id', (request, response, next) => {
    const id = request.params.id;

    Person.findByIdAndDelete(id)
        .then(result => {
            console.log('Deleted', id);
            response.status(204).end();
        })
        .catch(error => next(error));
});

// TODO:
const dublicateName = (name) => {
    return persons.some(p => 
        p.name.toLowerCase() === name.trim().toLowerCase()
    );  
};

app.post('/api/persons', (request, response, next) => {
    const body = request.body;

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'name or number missing'
        });
    }

    const name = body.name.trim();

    // TODO:
    /*
    if (dublicateName(name)) {
        return response.status(409).json({
            error: 'name must be unique'
        });
    }
    */

    const person = new Person({
        name: name,
        number: body.number,
    });

    person.save().then(savedNote => {
        response.json(savedNote);
        console.log('Added', person);
    })
    .catch(error => next(error));
});

const errorHandler = (error, request, response, next) => {
    console.error(error);

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' });
    }

    next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
```

## 3.17*: puhelinluettelo ja tietokanta, step5 ja 3.18*: puhelinluettelo ja tietokanta, step6

### index.js

```
require('dotenv').config();
const Person = require('./models/person');
const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(express.json());
app.use(express.static('dist'));

morgan.token('body', (request) => {
    return request.method === 'POST'
        ? JSON.stringify(request.body)
        : '';
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

app.get('/api/persons', (request, response, next) => {
    Person.find({})
        .then(persons => {
            response.json(persons);
        })
        .catch(error => next(error));
});

app.get('/info', (request, response, next) => {
    Person.countDocuments({})
        .then(count => {
            const date = new Date();
            response.send(`
                <p>Phonebook has info for ${count} people</p>
                <p>${date}</p>
            `);
        })
        .catch(error => next(error));
});

app.get('/api/persons/:id', (request, response, next) => {
    const id = request.params.id;

    Person.findById(id)
        .then(person => {
            if (person) response.json(person);
            else response.status(404).end();
        })
        .catch(error => next(error));
});

app.delete('/api/persons/:id', (request, response, next) => {
    const id = request.params.id;

    Person.findByIdAndDelete(id)
        .then(result => {
            console.log('Deleted', id);
            response.status(204).end();
        })
        .catch(error => next(error));
});

app.post('/api/persons', (request, response, next) => {
    const body = request.body;

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'name or number missing'
        });
    }

    const name = body.name.trim();

    const person = new Person({
        name: name,
        number: body.number,
    });

    person.save().then(savedNote => {
        response.json(savedNote);
        console.log('Added', person);
    })
    .catch(error => next(error));
});

app.put('/api/persons/:id', (request, response, next) => {
    const { name, number } = request.body;
    
    Person.findById(request.params.id)
        .then(person => {
            if (!person) response.status(404).end();

            person.number = number.trim();

            return person.save()
                .then(updatedPerson => {
                    console.log('Updated', updatedPerson);
                    response.json(updatedPerson);
                });
        })
        .catch(error => next(error));
});

const errorHandler = (error, request, response, next) => {
    console.error(error);

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' });
    }

    next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
```

## 3.19: puhelinluettelo ja tietokanta, step7

### /puhelinluettelo/App.jsx

Lisätty: 
```
  numberService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson));
          showMessage(`Added ${newName}`);
        })
        .catch(error => {
          showMessage(`Error: ${error.response.data.error}`);
          console.log(error.message);
        });
    }

    setNewName('');
    setNewNumber('');
  }
```

### /backend/index.js

Lisätty:
```
const errorHandler = (error, request, response, next) => {
    console.error(error);

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' });
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message });
    }

    next(error);
};
```

### /backend/models/person.js

Lisätty:
```
const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        required: true
    },
    number: {
        type: String,
        minlength: 5,
        required: true
    },
});
```

## 3.20*: puhelinluettelo ja tietokanta, step8 ja 3.21 tietokantaa käyttävä versio Internetiin

### /puhelinluettelo/App.jsx

Lisätty:
```
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
            showMessage(`Error: ${error.response.data.error}`, 5000);
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
        })
        .catch(error => {
          showMessage(`Error: ${error.response.data.error}`, 5000);
          console.log(error.message);
        });
    }

    setNewName('');
    setNewNumber('');
  }
```

### /puhelinluettelo/components/Message.jsx

```
const Message = ({ message }) => {
    if (message === null) return null;

    const className = message.toLowerCase().includes('error')
        ? 'error'
        : 'success'

    return (
        <div className={className}>
            {message}
        </div>
    );
};
```

### backend/models/person.js

Lisätty:
```
const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        required: true
    },
    number: {
        type: String,
        minlength: 8,
        required: true,
        validate: {
            validator: (v) => {
                return /^\d{2,3}-\d{5,}$/.test(v);
            }, 
            message: props => `${props.value} is not a valid phone number! Format: XX-XXXXX.. or XXX-XXXXX...`   
        }
    },
});
```

## 3.22: lint-konfiguraatio

### /backend/eslint.config.mjs

```
import globals from 'globals'
import js from '@eslint/js'
import stylisticJs from '@stylistic/eslint-plugin-js'

export default [
  js.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: { ...globals.node },
      ecmaVersion: 'latest',
    },
    plugins: {
      '@stylistic/js': stylisticJs,
    },
    rules: {
      '@stylistic/js/indent': ['error', 4],
      '@stylistic/js/linebreak-style': ['error', 'unix'],
      '@stylistic/js/quotes': ['error', 'single'],
      '@stylistic/js/semi': ['error', 'always'],
      eqeqeq: 'error',
      'no-trailing-spaces': 'error',
      'object-curly-spacing': ['error', 'always'],
      'arrow-spacing': ['error', { before: true, after: true }],
      'no-console': 'off',
    },
  },
  {
    ignores: ['dist/**'],
  },
]
```

### /backend/package.json

```
{
  "name": "puhelinluettelobackend",
  "version": "1.0.0",
  "description": "Backend for phonebook",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "node --watch index.js",
    "test": "echo \"Error: no test specified\" && exit 1",
    "lint": "eslint .",
    "build:ui": "rm -rf dist && cd ../../osa2/puhelinluettelo && npm run build && cp -r dist ../../osa3/puhelinluettelo-backend",
    "deploy:full": "npm run build:ui && git add . && git commit -m uibuild && git push"
  },
  "author": "Samu Hytönen",
  "license": "MIT",
  "dependencies": {
    "dotenv": "^17.2.1",
    "express": "^5.1.0",
    "mongoose": "^8.18.0",
    "morgan": "^1.10.1"
  },
  "devDependencies": {
    "@eslint/js": "^9.34.0",
    "@stylistic/eslint-plugin-js": "^4.4.1",
    "eslint": "^9.34.0",
    "globals": "^16.3.0"
  }
}
```
