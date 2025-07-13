require('dotenv').config()
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser')
const Person = require('./models/person')
const app = express()

/*
const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}
*/
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}

const cors = require('cors')

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
//app.use(requestLogger)

// Use Morgan with 'tiny' format
//app.use(morgan('tiny'));

// Middleware to parse JSON request bodies
app.use(bodyParser.json())

// Create a custom Morgan token to log request body
morgan.token('body', (request) => JSON.stringify(request.body));

// Use Morgan with the custom token
app.use(morgan(':method :url :status :response-time ms - :res[content-length] :body'));

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})


//app.get('/api/persons', (request, response) => {
//    response.json(persons)
//})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch((error) => next(error))
})


/* 
app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(note => note.id === id)
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})
*/

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

    if (!body.number) {
        return response.status(400).json({
            error: 'number missing'
        })
    }

    Person.exists({ name: body.name }).then(nameExists => {
        if (nameExists) {
            return response.status(400).json({
                error: 'name already exists'
            })
        }

        // Proceed with the rest of your logic here if name doesn't exist
        const person = new Person({
            id: generateId(),
            name: body.name,
            number: body.number,
        })

        person.save().then(savedPerson => {
            response.json(savedPerson)
        })
    })
})

/*
app.delete('/api/persons/:id', (request, response) => {
    const id = parseInt(request.params.id)
    persons = persons.filter(person => parseInt(person.id) !== id)

    response.status(204).end()
})
*/

app.put('/api/persons/:id', (request, response, next) => {
  const { name,number } = request.body

  Person.findById(request.params.id)
    .then((person) => {
      if (!person) {
        return response.status(404).end()
      }

      person.number = number
      
      return person.save().then((updatedPerson) => {
        response.json(updatedPerson)
      })
    })
    .catch((error) => next(error))
})


app.delete('/api/persons/:id', (request, response, next) => {
    //const id = parseInt(request.params.id)
    const id = request.params.id
    Person.findByIdAndDelete(id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

app.get('/api/info', async (request, response) => {
  try {
    const count = await Person.countDocuments({});
    response.send(
      `<h1>Phonebook has information for ${count} people</h1>
       <p>${new Date()}</p>`
    );
  } catch (error) {
    response.status(500).send({ error: 'Unable to fetch count' });
  }
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
