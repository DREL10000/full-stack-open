import { useState, useEffect } from "react"
import axios from "axios"




const Weather = ({capital, capitalInfo}) =>{
    const [wdata, setwdata] = useState(null)
    const api_key = import.meta.env.VITE_SOME_KEY 
  
    useEffect(() =>{
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${capitalInfo.latlng[0]}&lon=${capitalInfo.latlng[1]}&appid=${api_key}`)
    .then(response => setwdata(response.data))
    .catch(error => console.log(error))
    }, [])
    
    if(!wdata){
      return null
    }
  
    return (
      <div>
        <h1>Weather in {capital}</h1>
        <p>temperature {Math.round(wdata.main.temp - 273.15)} Celcius</p>
        <img src={` https://openweathermap.org/img/wn/${wdata.weather[0].icon}@2x.png`} alt="weather icon" />
        <p>wind {wdata.wind.speed} m/s</p>
  
      </div>
    )
  
  }

export default Weather