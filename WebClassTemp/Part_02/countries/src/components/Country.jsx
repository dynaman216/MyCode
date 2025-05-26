import { useState, useEffect } from 'react'
import axios from 'axios'

const weatherData = {
  "coord": { "lon": 10.99, "lat": 44.34 },
  "weather": [{ "id": 803, "main": "Clouds", "description": "broken clouds", "icon": "04d" }],
  "base": "stations",
  "main": { "temp": 287.8, "feels_like": 287.12, "temp_min": 287.8, "temp_max": 287.8, "pressure": 1015, "humidity": 69, "sea_level": 1015, "grnd_level": 949 },
  "visibility": 10000,
  "wind": { "speed": 1.02, "deg": 118, "gust": 0.8 },
  "clouds": { "all": 81 },
  "dt": 1748264988,
  "sys": { "type": 1, "id": 6812, "country": "IT", "sunrise": 1748230739, "sunset": 1748285252 },
  "timezone": 7200,
  "id": 3163858,
  "name": "Zocca",
  "cod": 200
};

const Country = ({ country }) => {
  const [weatherData2, setWeatherData] = useState('')
  var wxImage = "https://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png"
  useEffect(() => {
    console.log('Fetching Weather')
    axios
      .get('https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=3567f6d0fb5f3a0a009779557bfa05cb')
      .then(response => {
        console.log('Weather Fetched')
        setWeatherData(response.data)
      })
  }, [])
  console.log('render', <weatherData2 className="coord lat"></weatherData2>, 'weather')

  return (
    <div>
      <h1> {country.name.common} </h1>
      <p></p>
      <p> Capital: {country.capital} </p>
      <p> Area:  {country.area}</p>
      <p></p>
      <h2>Language</h2>
      <ul>
        {Object.entries(country.languages).map(([key, value]) => (
          <li key={key}>{value} </li>
        ))}
      </ul>

      <img src={country.flags.png} />
      {weatherData2?.weather?.[0]?.icon && (
        <div>
          <h2> Weather in {country.capital} </h2>
          <p> Temperature {weatherData2.main.temp / 10} Celsius</p>
          <img src={`https://openweathermap.org/img/wn/${weatherData2.weather[0].icon}@2x.png`} alt="Weather Icon" />
          <p> Wind {weatherData2.wind.speed} m/s</p>
        </div>
      )}
    </div>
  )
}

export default Country


