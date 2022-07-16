import { connect } from 'react-redux'

const Notification = (props) => {
  const style = {
    border: 'dotted',
    borderWidth: 1,
    color: 'green',
    padding: 10
  }
  if (!props.notification) {return null}
  return (
    <div style={style}>
      {props.notification}
    </div>
  )
}

const mapStateToProps = (state) => {
  return  {
    notification: state.notification
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)
export default ConnectedNotification
