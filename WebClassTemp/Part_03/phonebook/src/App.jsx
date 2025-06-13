import { useState, useEffect } from 'react'
import axios from 'axios'
import axiosService from './services/phoneService'
import Person from './components/Person'
import Persons from './components/Persons'
import Form from './components/Form'
import phoneService from './services/phoneService'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [alertMessage, setAlertMessage] = useState({
    message: null,
    type: ""
  })

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/api/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  const [newName, setNewName] = useState('')
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const [newNumber, setNewNumber] = useState('')
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const [newFilter, setNewFilter] = useState('')
  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  const addNumber = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber
    }
    if (persons.some(person => person.name === personObject.name)) {
      if (window.confirm(`${newName} is already added in the phonebook.  Replace with new number?`)) {
        const oldNumber = persons.find((n) => n.name === personObject.name)

        phoneService
          .update(oldNumber.id, personObject)
          .then((returnedPerson) => {
            setPersons(persons.map((person) => (person.id !== oldNumber.id ? person : returnedPerson)))
            showAlert('alert', `${newName}'s number has been updated.`)
          })
      };
    } else {
      phoneService.create(personObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson))
        showAlert('alert', `${newName} added to phonebook.`)
        setNewName('')
        setNewNumber('')
      })
    }
  }

  const deletePersonNamed = (name) => {
    if (window.confirm(`Delete ${name}?`)) {
      const person = persons.find((n) => n.name === name)
      const deletedName = { ...person, important: !person.important }
      const deletedId = person.id

      phoneService.deleteid(deletedId)
        .then((returnOK) => {
          const oldName = persons.filter(person => person.id === deletedId)
          const newPersons = persons.filter(person => person.id !== deletedId)
          setPersons(newPersons)
          showAlert('alert', `${oldName[0].name} deleted from phonebook`)
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          const oldName = persons.filter(person => person.id === deletedId)
          const newPersons = persons.filter(person => person.id !== deletedId)
          setPersons(newPersons)
          showAlert('error', `${oldName[0].name} has already been deleted from phonebook`)
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const showAlert = (alertType, alertMessage) => {
    setAlertMessage({
      message: alertMessage,
      type: alertType
    })
    setTimeout(() => {
      setAlertMessage({
        message: null,
        type: ""
      })
    }, 5000);
  }

  return (
    <div>
      <div>
        filter: <input value={newFilter}
          onChange={handleFilterChange}
        />
      </div>

      <h2>Phonebook</h2>

      <Notification message={alertMessage.message} alertType={alertMessage.type} />

{/*
      <button onClick={() => showAlert('alert', 'Alert!')}>Show Message</button>

      <button onClick={() => showAlert('error', 'Error Message')}> Show Alert </button>
*/}
      <Form addNumber={addNumber} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />

      <h2>Numbers</h2>

      <Persons persons={persons} filter={newFilter} deletePersonNamed={deletePersonNamed} />

    </div>
  )
}

export default App