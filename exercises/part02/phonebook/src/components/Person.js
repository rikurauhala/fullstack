const Person = ({ person, deletePerson }) => {
  return (
    <tr>
      <td>
        {person.name}
      </td>
      <td>
        {person.number}
      </td>
      <td>
        <button onClick={event => deletePerson(event, person)}>
          [x] Delete
        </button>
      </td>
    </tr>
  )
}

export default Person
