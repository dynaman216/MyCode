import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducerOld'
import { useRef } from 'react'

const AnecdoteForm = () => { 
  const dispatch = useDispatch()
  const newAnecdote = useRef()

  const handleCreateAnecdote = (event) => {
    event.preventDefault()
    const content = newAnecdote.current.value
    dispatch(createAnecdote(content))
    newAnecdote.current.value = ''
  }

  return (
    <div>
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

export default AnecdoteForm