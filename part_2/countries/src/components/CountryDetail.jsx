import { useState, useEffect } from "react"
import Weather from "./Weather"
import axios from "axios"



const CountryDetail = ({ country }) => {
    const [detail, setDetail] = useState(null)
  
    useEffect(() => {
      axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${country.toLowerCase()}`)
        .then(response => {
          setDetail(response.data)
        })
        .catch(error => console.log(error))
    }, [])
  
    if (!detail){
      return null
    }
  
    const keys = Object.keys(detail.languages)
  
  
    return (
      <div>
        <h1>{detail.name.common}</h1>
        capital {detail.capital[0]}
        <br/>
        area {detail.area}
        <h3>languages</h3>
        <ul>
        {keys.map(e => <li key={e}>{detail.languages[e]}</li>)}
        </ul>
        <img src={detail.flags.png} alt={detail.flags.alt}/>
        <Weather capital={detail.capital[0]} capitalInfo={detail.capitalInfo}/>
      </div>
      
    )
  
  }

export default CountryDetail
  