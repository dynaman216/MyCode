const Notification = ({ message, alertType }) => {
  if (message === null) {
    return null
  }

  if (alertType === "error") {
    return <div className="error">{message}</div>
  } else {
    return <div className="alert">{message}</div>
  }
}

export default Notification
