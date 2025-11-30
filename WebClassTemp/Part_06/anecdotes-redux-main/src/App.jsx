import { useEffect, useReducer } from 'react'
import { useDispatch } from 'react-redux'
import { initializeAnecdotes } from './reducers/anecdoteReducer'

import Notification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm'
import AnectdoteList from './components/AnecdoteList'
import Filter from './components/Filter'

const notificationReducer = (state, action, message) => {
  switch (action.type) {
    case 'ALERT':
      return state = message
    default:
      return state
  }
}

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeAnecdotes())
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
