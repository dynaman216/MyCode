
import { useContext } from "react"
import NotificationContext from "../NotificationContext"

const NotificationMessage = () => {
  const { notification } = useContext(NotificationContext)
  
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  
  if (!notification) return null

  return (
    <div style={style}>
     <h1> {notification} </h1> 
    </div>
  )
}

export default NotificationMessage
