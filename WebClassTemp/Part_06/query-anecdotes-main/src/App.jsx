import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { useReducer,useEffect } from 'react'
import { getAnecdotes, updateAnecdote } from './requests'

import NotificationMessage from './components/NotificationMessage'
import AnecdoteForm from './components/AnecdoteForm'
import { useContext } from 'react'
import NotificationContext from './NotificationContext'


const App = () => {
  const queryClient = useQueryClient()
  const {showNotification } = useContext(NotificationContext)

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updatedAnecdote) => {
      queryClient.setQueryData(['anecdotes'], (oldAnecdotes) => {
        if (!oldAnecdotes) return [updatedAnecdote];

        return oldAnecdotes.map((anecdote) =>
          anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote
        );      
      });
    },
  });

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
    showNotification(` anecdote '${anecdote.content}' voted`)
    //notificationDispatch({ type: 'ALERT', message: 'VOTED!'})
    console.log('vote')    
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    refetchOnWindowFocus: false
  });

  const anecdotes = result.data || [];

  if (result.isLoading) {
    return <div>Loading anecdotes...</div>;
  }

  if (result.isError) {
    return <div style={{ color: 'red' }}>
      Error: {result.error.message}
    </div>;
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <NotificationMessage />
      <AnecdoteForm anecdotes = {anecdotes} />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
