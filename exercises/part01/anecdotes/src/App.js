import { useState } from 'react'

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
  'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
]

const Anecdote = ({ text, votes }) => (
  <div>
    <p>{text}</p>
    <p><i>This anecdote has {votes} votes.</i></p>
  </div>
)

const Button = ({ text, handleClick }) => (
  <button onClick={handleClick}>{text}</button>
)

const App = () => {
  const length = anecdotes.length
  const getRandom = () => Math.floor(Math.random() * length)

  const [selected, setSelected] = useState(getRandom)
  const [votes, setVotes] = useState(new Array(length).fill(0))
  const [mostVoted, setMostVoted] = useState(0)

  const vote = () => {
    const copy = [...votes]
    copy[selected] += 1
    if (copy[selected] >= copy[mostVoted]) {
      setMostVoted(selected)
    }
    setVotes(copy)
  }

  const setRandom = () => {
    setSelected(getRandom)
  }

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <Anecdote text={anecdotes[selected]} votes={votes[selected]} />

      <Button text='Vote !' handleClick={vote} />
      <Button text='Next »' handleClick={setRandom} />

      <h2>Anecdote with most votes</h2>
      <Anecdote text={anecdotes[mostVoted]} votes={votes[mostVoted]} />
    </div>
  )
}

export default App
