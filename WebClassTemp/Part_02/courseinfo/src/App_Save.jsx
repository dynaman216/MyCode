const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  const totalexercises = course.parts.reduce((accumulator, part) => {
    return accumulator + part.exercises;
  }, 0);
  

  return (
    <div>
      <h1>{course.name}</h1>
      <ul>
        {course.parts.map(part =>
          <li key={part.id}>
            {part.name} {part.exercises}
          </li>
        )}
      </ul>

        <h3>Total of {totalexercises} exercises.</h3>
      
    </div>
  )
}

export default App