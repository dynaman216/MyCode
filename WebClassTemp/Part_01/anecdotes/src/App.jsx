import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState([])
  const [voteCount, setVoteCount] = useState(0)

  const updateItem = (indexToUpdate, updatedItem) => {
    setItems(votes.map((item, index) => index === indexToUpdate ? updatedItem : item));
  };


  const Button = (props) => (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )

  const nextAnecdote = () => {
    console.log('clicked Next')
    let arraysize = anecdotes.length;
    let newselected = Math.floor(Math.random() * arraysize);
    console.log('random = ' + newselected + '  max = ' + arraysize);
    setSelected(newselected);
  }

  const voteAnecdote = () => {
    console.log('clicked Votes')
    let newvote = votes[selected] + 1;
    if (isNaN(newvote)) {
      newvote = 1;
    }

    let newvotes = votes;
    newvotes[selected] = newvote;
    console.log('newvotes = ' + newvote);
    setVotes(newvotes);

    let newVoteCount = voteCount +1;
    setVoteCount(newVoteCount);
  }

  const currentVotes= () => {
    let voteCount = votes[selected];
    if (isNaN(voteCount)) {
      voteCount = 0;
    }
    return voteCount;
  }

  return (
    <div>
      {anecdotes[selected]}
      <p> has {currentVotes()} votes.</p>
      <p>
        <Button onClick={() => voteAnecdote()} text="Vote" />
        <Button onClick={() => nextAnecdote()} text="Next Anecdote" />
      </p>
    </div>
  )
}

export default App