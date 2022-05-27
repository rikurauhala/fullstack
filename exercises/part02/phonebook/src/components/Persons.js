import Person from './Person'

const Persons = (props) => {
  const { searchTerm, handleSearchChange, searchResults } = props
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>
              Search
            </td>
            <td>
              <input value={searchTerm} onChange={handleSearchChange} />
            </td>
          </tr>
        </tbody>
      </table>
      <table>
        <thead>
          <tr>
            <th>
              Name
            </th>
            <th>
              Number
            </th>
          </tr>
        </thead>
        <tbody>
          {searchResults.map(person => 
            <Person key={person.name} name={person.name} number={person.number} />
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Persons
