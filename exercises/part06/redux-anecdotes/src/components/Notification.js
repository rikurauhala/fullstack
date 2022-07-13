import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notifications)
  const style = {
    border: 'solid',
    borderWidth: 1,
    padding: 10
  }
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification
