import { createSlice } from '@reduxjs/toolkit'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]


const anecdoteSlice = createSlice({
  name: 'anecdotes',
  anecdotesAtStart,
  reducers: {   
    createAnnecdote(state, action) {
      const content = action.payload
      state.push({
        content
      })
    },
    vote(state, action) {
      const id = action.payload.id
      const annecdoteToChange = state.find(n => n.id === id)
      const changedAnnecdote = {
        ...annecdoteToChange,
        votes: annecdoteToChange.anecdote.votes +1
      }
      return state.map(annecdote => (annecdote.id !== id ? annecdote : changedAnnecdote))
    }
  }
})

export const { createAnnecdote, vote } = anecdoteSlice.actions
export default anecdoteSlice.reducer
