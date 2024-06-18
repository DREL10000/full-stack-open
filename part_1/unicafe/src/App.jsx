import { useState } from "react";

const Button = ({onClick, text}) => {
  return(
    <button onClick={onClick}>{text}</button>
  )
}

const StatisticLine = ({text, value}) =>{
  return(
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )

}

const Statistics = ({good, neutral, bad, total}) =>{
    if (total > 0)
    {
      return (
        <>
          <h1>statistics</h1>
          <table>
            <tbody>
            <StatisticLine text="good" value={good}/>
            <StatisticLine text="neutral" value={neutral}/>
            <StatisticLine text="bad" value={bad}/>
            <StatisticLine text="all" value={total}/>
            <StatisticLine text="average" value={((good * 1) + (neutral * 0) + (bad * -1)) / total}/>
            <StatisticLine text="positive" value={`${(good / total) * 100} %`}/>
            </tbody>
          </table>
        </>
      )
    }
    return (
      <>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </>
    )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
      setGood(good + 1)
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
  }

  const handleBad = () => {
    setBad(bad + 1)
}

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGood} text="good"/>
      <Button onClick={handleNeutral} text="neutral"/>
      <Button onClick={handleBad} text="bad"/>
      
      <Statistics good={good} neutral={neutral} bad={bad} total={good + neutral + bad}/>

    </div>
  )
}

export default App