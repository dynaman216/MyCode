import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setAnecdotes } from './reducers/anecdoteReducer'
import anecdoteService from './services/anecdotes'

import Notification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm'
import AnectdoteList from './components/AnecdoteList'
import Filter from './components/Filter'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    anecdoteService.getAll().then(notes => dispatch(setAnecdotes(notes)))
  }, [dispatch])
  
  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnectdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App
