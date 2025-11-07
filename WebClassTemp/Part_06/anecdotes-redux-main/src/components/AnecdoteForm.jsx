import { useDispatch } from 'react-redux'
import { appendAnecdote } from '../reducers/anecdoteReducer'

import { showNotification } from '../reducers/notificationReducer'
import { useRef } from 'react'

const AnecdoteForm = () => { 
  const dispatch = useDispatch()
  const newAnecdoteValue = useRef()

  const handleCreateAnecdote = async (event) => {
    event.preventDefault()
    const content = newAnecdoteValue.current.value    
    dispatch(appendAnecdote(content))   
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