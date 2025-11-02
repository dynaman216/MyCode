import AnecdoteForm from './components/AnecdoteForm'
import AnectdoteList from './components/AnecdoteList'
import Filter from './components/Filter'

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      <AnectdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App
