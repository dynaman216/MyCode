require('dotenv').config()
const express = require('express')
const Note = require('./models/note')
const app = express()

const cors = require('cors')

//const mongoose = require('mongoose')

// DO NOT SAVE YOUR PASSWORD TO GITHUB!!
//const password = process.argv[2]
//const url = `mongodb+srv://noteuser:${password}@cluster0.e9xunrs.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`
//const url = process.env.MONGODB_URI

//mongoose.set('strictQuery',false)

//mongoose.connect(url)
//  .then(result => {
//    console.log('connected to MongoDB')
//  })
//  .catch(error => {
//    console.log('error connecting to MongoDB:', error.message)
//  })//

//const PORT = process.env.PORT
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${PORT}`)
})


//const noteSchema = new mongoose.Schema({
//  content: String,
//  important: Boolean,
//})

//noteSchema.set('toJSON', {
//  transform: (document, returnedObject) => {
//    returnedObject.id = returnedObject._id.toString()
//    delete returnedObject._id
//    delete returnedObject.__v
//  }
//})

//module.exports = mongoose.model('Note', noteSchema)

//const Note = mongoose.model('Note', noteSchema)

app.use(cors())

/*
let notes = [
  {
    id: "1",
    content: "HTML is easy",
    important: true
  },
  {
    id: "2",
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: "3",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }
]
*/
const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(express.static('dist'))
app.use(express.json())
app.use(requestLogger)

//app.get('/', (request, response) => {
//    response.send('<h1>Hello World!</h1>')
//})

app.get('/api/notes', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes)
  })
})

app.get('/api/notes/:id', (request, response) => {
  Note.findById(request.params.id).then(note => {
    response.json(note)
  })
})

const generateId = () => {
  const maxId = notes.length > 0
    ? Math.max(...notes.map(n => Number(n.id)))
    : 0
  return String(maxId + 1)
}

app.post('/api/notes', (request, response) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({ error: 'content missing' })
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
  })

  note.save().then(savedNote => {
    response.json(savedNote)
  })
})

app.delete('/api/notes/:id', (request, response) => {
  const id = request.params.id
  notes = notes.filter(note => note.id !== id)

  response.status(204).end()
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
