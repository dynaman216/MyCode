const Person = ({ person, filter, deletePerson }) => {
  if (person.name.toLowerCase().indexOf(filter.toLowerCase()) > -1) {
    return <li>
      {person.name} {person.number}
      <button onClick={deletePerson}> delete </button>
    </li>
  }
}

export default Person