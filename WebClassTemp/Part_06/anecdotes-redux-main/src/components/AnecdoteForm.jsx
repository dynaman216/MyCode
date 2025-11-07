import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import anecdoteService from '../services/anecdotes'
import { showNotification } from '../reducers/notificationReducer'
import { useRef } from 'react'

const AnecdoteForm = () => { 
  const dispatch = useDispatch()
  const newAnecdoteValue = useRef()

  const handleCreateAnecdote = async (event) => {
    event.preventDefault()
    const content = newAnecdoteValue.current.value
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(createAnecdote(newAnecdote))
    newAnecdoteValue.current.value = ''
    dispatch(showNotification(`You created '${content}' `))
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleCreateAnecdote}>
        <div>
          <input name="anecdote" ref={newAnecdoteValue} />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm