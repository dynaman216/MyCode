import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    console.log('clicked Good')
    setGood(good + 1)
  }

  const handleNeutral = () => {
    console.log('clicked Neutral')
    setNeutral(neutral + 1)
  }

  const handleBad = () => {
    console.log('clicked Bad')
    setBad(bad + 1)
  }

  const Button = (props) => (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )

  const StatisticLine = ({ statName, statValue }) => {
    return (
      <tr>
        <td>
          {statName}
        </td>
        <td>
          {statValue}
        </td>
      </tr>
    )
  }

  const Statistics = ({ good, neutral, bad }) => {
    if (good + neutral + bad == 0) {
      return (
        <div>
          <p>no feedback given </p>
        </div>
      )

    }
    {
      return (
        <>
          <table>
            <StatisticLine statName="good" statValue={good} />
            <StatisticLine statName="neutral" statValue={neutral} />
            <StatisticLine statName="bad" statValue={bad} />
            <StatisticLine statName="all" statValue={good + neutral + bad} />
            <StatisticLine statName="average" statValue={(good - bad) / (good + neutral + bad)} />
            <StatisticLine statName="positive" statValue={(good) / (good + neutral + bad) * 100.0000 + "%"} />
          </table>
        </>
      )
    }
  }


  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={() => handleGood()} text="Good" />
      <Button onClick={() => handleNeutral()} text="Neutral" />
      <Button onClick={() => handleBad()} text="Bad" />

      <h1>
        statistics
      </h1>

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
