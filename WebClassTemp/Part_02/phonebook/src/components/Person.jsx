const Person = ({person, filter}) => {
  if (person.name.toLowerCase().indexOf(filter.toLowerCase()) > -1) {
    return <li>
      {person.name} {person.number} </li>
  }
}

export default Person