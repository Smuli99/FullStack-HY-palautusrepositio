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
});