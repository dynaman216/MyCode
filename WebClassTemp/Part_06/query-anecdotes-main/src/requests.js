const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = async () => {
  try {
    const response = await fetch(baseUrl);

    if (!response.ok) {
      throw new Error('Failed to fetch anecdotes');
    }

    return await response.json();
  } catch (err) {
    throw new Error(err.message || 'anecdote service not available due to problems in server');
  }
}

export const createAnecdote = async (newAnecdote) => {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newAnecdote),
  }

  const response = await fetch(baseUrl, options)

  if (!response.ok) {
    // parse error body if available
    const errorText = await response.text()
    throw new Error(errorText || 'Failed to create anecdote')
  }

  return await response.json()
}

export const updateAnecdote = async (updatedAnecdote) => {
  const options = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedAnecdote)
  }

  const response = await fetch(`${baseUrl}/${updatedAnecdote.id}`, options)

  if (!response.ok) {
    throw new Error('Failed to update anecdote')
  }

  return await response.json()
}