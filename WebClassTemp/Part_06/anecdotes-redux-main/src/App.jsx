import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote, createAnecdote } from './reducers/anecdoteReducer'
import { useRef } from 'react'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()
  const newAnecdote = useRef()

  const handleVote = (id) => {
    dispatch(voteAnecdote(id))
    console.log('vote', id)
  }

  const handleCreateAnecdote = (event) => {
    event.preventDefault()
    const content = newAnecdote.current.value
    dispatch(createAnecdote(content))
    newAnecdote.current.value = ''
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes
        .slice()
        .sort((a, b) => b.votes - a.votes)
        .map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}

      <h2>create new</h2>
      <form onSubmit={handleCreateAnecdote}>
        <div>
          <input name="anecdote" ref={newAnecdote} />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default App
