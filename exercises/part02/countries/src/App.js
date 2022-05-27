import { useEffect, useState } from 'react'
import axios from 'axios'

import CountryList from './components/CountryList'

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const searchResults = searchTerm.length > 0
    ? countries.filter(country => 
        country.name.common
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          )
        )
    : []

  return (
    <div>
      Find countries <input onChange={handleSearchChange} placeholder='Type here' />
      <CountryList countries={searchResults} />
    </div>
  )
}

export default App
