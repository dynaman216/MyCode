import { useState, useEffect } from 'react'
import axios from 'axios'
import countryService from './services/countryService'
import './App.css'

const App = () => {
  const [countries, setCountries] = useState([])
  const [countryFilter, setCountryFilter] = useState('')

  const filterCountries = (event) => {
    console.log(event.target.value)
    setCountryFilter(event.target.value)
  }

  useEffect(() => {
    console.log('Fetching Countries')
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        console.log('Countries Fetched')
        setCountries(response.data)
      })
  }, [])
  console.log('render', countries.length, 'countries')

  return (
    <div>
      find countries <input value={countryFilter}
        onChange={filterCountries} />
    </div>
  )
}

export default App
