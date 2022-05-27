import Country from './Country'

const CountryList = ({ countries }) => {
  if (countries.length === 1) {
    return <Country country={countries[0]} />
  }

  if (countries.length > 10) {
    return (
      <p>Too many matches, specify another filter</p>
    )
  }

  return (
    <div>
      {countries.map((country) =>
        <div key={country.name.common}>
          {country.name.common}
        </div>
      )}
    </div>
  )
}

export default CountryList
