import Person from './Person'

const Persons = ({persons, filter}) => {
    return <ul>
        {persons.map(person =>
          <Person key={person.name} person={person} filter = {filter} />
        )}
      </ul>
  }
  
  export default Persons