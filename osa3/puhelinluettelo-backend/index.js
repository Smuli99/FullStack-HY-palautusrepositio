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

// TODO:
app.delete('/api/persons/:id', (request, response, next) => {
    const id = request.params.id;

    Person.findByIdAndDelete(id)
        .then(() => {
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
    const number = request.body.number;

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
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message });
    }

    next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});