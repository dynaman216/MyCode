import { useState, useEffect } from 'react'
import Notification from './components/Notification'
import Blog from './components/Blog'
import CreateBlog from './components/CreateBlog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [alertMessage, setAlertMessage] = useState({
    message: null,
    type: ''
  })

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const showAlert = (alertType, alertMessage) => {
    setAlertMessage({
      message: alertMessage,
      type: alertType
    })
    setTimeout(() => {
      setAlertMessage({
        message: null,
        type: ''
      })
    }, 5000)
  }

  const handleLogin = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      showAlert('error', 'Invalid Credentials')
      setTimeout(() => {
        showAlert('error', '')
      }, 5000)
    }
    console.log('logging in with', username, password)
  }

  const addLike = (blog) => {
    const changeBlog = { ...blog, likes: blog.likes + 1 }

    blogService
      .update(changeBlog.id, changeBlog)
      .then(returnedBlog => {
        setBlogs(blogs.map(b => (b.id !== returnedBlog.id ? b : returnedBlog)))
      })
      .catch(() => {
        showAlert('error', `Blog '${blog.title}' could not be updated`)
      })

    setTimeout(() => {
      showAlert('error', null)
    }, 5000)
  }

  const deleteBlog = (blog) => {
    if (confirm('Delete ' + blog.name + '?') === true) {
      const blogDeleteId = blog.id
      blogService
        .deleteBlog(blog.id)
        .then(() => {
          setBlogs(blogs.filter(b => b.id !== blogDeleteId))
        })
        .catch(error => {
          console.error('Failed to delete blog:', error)
          alert('Error deleting blog')
        })
    } else {
      alert('No Delete')
    }

  }

  const loginForm = () => (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          <label>
            username
            <input
              type="text"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            password
            <input
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </label>
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )

  const blogForm = () => (
    <div>
      <h2>Blogs</h2>
      {blogs
        .slice()
        .sort((a, b) => b.likes - a.likes)
        .map(blog => (
          <Blog key={blog.id} blog={blog} user={user} addLike={addLike} deleteBlog={deleteBlog} />
        ))}

    </div>
  )

  const handleLogout = async () => {
    try {
      window.localStorage.removeItem(
        'loggedBlogappUser'
      )
      //blogService.setToken(user.token)
      setUser(null)
      setUsername('')
      setPassword('')
    } catch { null }
    console.log('logging out')
  }

  return (
    <div>
      <Notification message={alertMessage.message} alertType={alertMessage.type} />
      {!user && loginForm()}
      {user && (
        <div>
          <p>{user.name} logged in</p> <button onClick={handleLogout}>Logout</button>
          <CreateBlog blogs={blogs}
            setBlogs={setBlogs}
            showAlert={showAlert} />
          {blogForm()}
        </div>
      )}
    </div>
  )
}

export default App