import { connect } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const SearchFilter = (props) => {
  const handleChange = (event) => {
    event.preventDefault()
    props.setFilter(event.target.value)
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
  
const mapDispatchToProps = { setFilter }
const ConnectedSearchFilter = connect(null, mapDispatchToProps)(SearchFilter)
export default ConnectedSearchFilter
