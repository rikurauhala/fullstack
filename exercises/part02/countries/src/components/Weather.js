import { useEffect, useState } from 'react'
import axios from 'axios'

const Weather = ({ capital }) => {
  const apiKey = process.env.REACT_APP_API_KEY
  const [weather, setWeather] = useState([])

  useEffect(() => {
    axios
      .get(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${capital}&aqi=no`)
      .then(response => {
        setWeather(response.data)
      })
  })

  if (weather.current === undefined) {
    return <p>No weather data available</p>
  }

  return (
    <div>
      <img
        src={weather.current.condition.icon}
        alt={weather.current.condition.text}
      />
      <p>
        <b>Temperature: </b>
        {weather.current.temp_c} °C
      </p>
      <p>
        <b>Wind speed: </b>
        {weather.current.wind_kph} km/h
      </p>
    </div>
  )
}

export default Weather
