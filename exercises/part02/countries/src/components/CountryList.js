import Country from './Country'

const CountryList = ({ countries, handleSelectedCountry }) => {
  if (countries.length === 1) {
    return <Country country={countries[0]} />
  }

  if (countries.length > 10) {
    return (
      <p>
        Too many matches, specify another filter
      </p>
    )
  }

  return (
    <div>
      {countries.map(country =>
       <div key={country.name.common}>
          {country.name.common}
          <button onClick={event => handleSelectedCountry(event, country.name.common)}>
            Show
          </button>
        </div>
      )}
    </div>
  )
}

export default CountryList
