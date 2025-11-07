import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const AnectdoteList = () => {
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    const filterText = filter?.toLowerCase() ?? ''
    return (anecdotes ?? []).filter(anecdote =>
      anecdote.content?.toLowerCase().includes(filterText)
    )
  })

  const dispatch = useDispatch()

  const handleVote = (id, content) => {
    dispatch(voteAnecdote(id))
    console.log('vote', id)
    dispatch(showNotification(`You voted for '${content}' `))
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
              <button onClick={() => handleVote(anecdote.id, anecdote.content)}>vote</button>
            </div>
          </div>
        ))}
    </div>
  )
}

export default AnectdoteList