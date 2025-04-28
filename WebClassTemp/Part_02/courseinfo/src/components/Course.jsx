const TotalExercises = ({ parts }) => parts.reduce((accumulator, parts) => {
    return accumulator + parts.exercises;
}, 0);


const Course = ({ name, id, parts }) => (
    <>
        <h3>{name}</h3>
        <ul>
            {parts?.map(part =>
                <li key={part.id}>
                    {part.name} {part.exercises}
                </li>
            )}
        </ul>


        <h3>Total of {TotalExercises(parts={parts})} exercises.</h3>
    </>
)

export default Course;