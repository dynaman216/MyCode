const http = require('http')

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser')

const app = express()

const cors = require('cors')

app.use(cors())

app.use(express.json())

// Use Morgan with 'tiny' format
app.use(morgan('tiny'));

// Middleware to parse JSON request bodies
app.use(bodyParser.json())

let persons = [
    {
        "id": "1",
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": "2",
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": "3",
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": "4",
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

// Create a custom Morgan token to log request body
morgan.token('body', (request) => JSON.stringify(request.body));

// Use Morgan with the custom token
app.use(morgan(':method :url :status :response-time ms - :res[content-length] :body'));

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(note => note.id === id)
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

const generateId = () => {
    return Math.floor(Math.random() * 1000000000)
}

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name) {
        return response.status(400).json({
            error: 'name missing'
        })
    }
    else if (!body.number) {
        return response.status(400).json({
            error: 'number missing'
        })
    }
    else if (persons.some(person => person.name === body.name)) {
        return response.status(400).json({
            error: 'name already exists'
        })
    }

    const person = {
        id: generateId(),
        name: body.name,
        number: body.number,
    }

    persons = persons.concat(person)
    response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = parseInt(request.params.id)
    persons = persons.filter(person => parseInt(person.id) !== id)

    response.status(204).end()
})

app.get('/api/info', (request, response) => {
    response.send(`<h1>phonebook has information for ${persons.length} people</h1> 
                   <p> ${Date()} </p>`)
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
