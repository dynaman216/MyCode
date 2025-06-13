import Person from './Person'

const Persons = ({ persons, filter, deletePersonNamed }) => {
  return <ul>
    {persons.map(person =>
      <Person
        key={person.name}
        person={person}
        filter={filter}
        deletePerson={() => deletePersonNamed(person.name)}
      />
    )}
  </ul>
}

export default Persons