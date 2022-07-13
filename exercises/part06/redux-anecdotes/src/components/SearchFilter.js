import { useDispatch } from 'react-redux'

const SearchFilter = () => {
  const dispatch = useDispatch()

  const handleChange = (event) => {
    event.preventDefault()
    const query = event.target.value
    dispatch({
      type: 'filter/setFilter',
      payload: query
    })
  }

  return (
    <div>
      Filter
      <input
        onChange={handleChange}
        placeholder="Filter"
      />
    </div>
  )
}
  
export default SearchFilter
