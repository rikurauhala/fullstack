import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  const style = {
    border: 'dotted',
    borderWidth: 1,
    color: 'green',
    padding: 10
  }
  if (!notification) {return null}
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification
