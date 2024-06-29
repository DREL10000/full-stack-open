import { useState, useEffect } from "react"
import CountryDetail from "./components/CountryDetail"
import axios from "axios"

const App = () => {
  const [countries, setCountries] = useState([])
  const [input, setInput] = useState('')


  const handleInput = (event) => {
    setInput(event.target.value)
  }

  const toShow = countries.filter(country => country.toLowerCase().includes(input.toLowerCase()))


  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data.map(country => country.name.common))
      })
      .catch(error => {
        alert(error)
      })
  }, [])

  return (
    <div>
      find countries <input value={input} onChange={handleInput} />
      <br />
      {toShow.length === 1 ? (
        toShow.map(country => <CountryDetail key={country} country={country} />)
      ) : toShow.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : (
        toShow.map(country => <li key={country}>{country} <button onClick={()=> setInput(country)}>show</button></li>)
      )}
     
    </div>
  )
}

export default App
