import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'
import { useRef } from 'react'

const AnecdoteForm = () => { 
  const dispatch = useDispatch()
  const newAnecdote = useRef()

  const handleCreateAnecdote = (event) => {
    event.preventDefault()
    const content = newAnecdote.current.value
    dispatch(createAnecdote(content))
    newAnecdote.current.value = ''
    dispatch(showNotification(`You created '${content}' `))
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