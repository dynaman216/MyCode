import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

//const generateId = () => Number((Math.random() * 1000000).toFixed(0))

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    updateAnecdote(state, action) {
      const updated = action.payload
      return state.map(anecdote =>
        anecdote.id !== updated.id ? anecdote : updated
      )
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const appendAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(createAnecdote(newAnecdote))
  }
}

export const voteAnecdote = (id) => {
  return async (dispatch, getState) => {
    const anecdote = getState().anecdotes.find(a => a.id === id)
    const updatedAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const returned = await anecdoteService.update(id, updatedAnecdote)
    dispatch(updateAnecdote(returned))
  }
}

export const { createAnecdote, vote, setAnecdotes, updateAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer
