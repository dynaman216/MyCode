import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { useContext } from 'react'
import { createAnecdote } from '../requests'
import NotificationContext from '../NotificationContext'

const AnecdoteForm = (annecdotes) => {
  const queryClient = useQueryClient()
  const { showNotification } = useContext(NotificationContext)

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
    }
  })

  const onCreate = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    try {
      await newAnecdoteMutation.mutateAsync({ content, votes: 0 })
      showNotification(`anecdote '${content}' created`)
      console.log('new anecdote')
    } catch (error) {
      showNotification(`too short anecdote, must have length 5 or more`)
      console.error('Failed to create anecdote', error)
    }
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
