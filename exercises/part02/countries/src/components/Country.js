import Weather from './Weather'

const Country = ({ country }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p><b>Capital city:</b> {country.capital}</p>
      <p><b>Population:</b> {country.population}</p>
      <p><b>Area:</b> {country.area} m²</p>
      <b>Languages:</b>
      <ul>
        {Object.values(country.languages).map(language =>
          <li key={language}>
            {language}
          </li>
        )}
      </ul>
      <p><b>Flag:</b></p>
      <img src={country.flags.png} alt={country.name.common} />
      <h2>Weather in {country.capital}</h2>
      <Weather capital={country.capital} />
    </div>
  )
}
  
export default Country
