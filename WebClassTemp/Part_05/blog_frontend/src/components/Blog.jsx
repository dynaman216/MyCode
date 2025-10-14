import { useState } from "react"

const Blog = ({ blog, user, addLike, deleteBlog }) => {
  const [showDetails, setShowDetails] = useState('show')

  const ToggleShowDetails = () => {
    if (showDetails == 'show') {
      setShowDetails('hide')
    } else {
      setShowDetails('show')
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      {blog.title}
      {blog.author}
      <button onClick={ToggleShowDetails}>{showDetails}</button>
      {showDetails === 'hide' && (
        <div>
          <p>{blog.url}</p>
          <p>Likes {blog.likes}
            <button onClick={() => addLike(blog)}>Like</button>
          </p>
          <p>{blog.user?.name ?? 'Unknown Author'}</p>
          {user.username && blog.user?.username === user.username && (
            <button onClick={() => deleteBlog(blog)}>Remove</button>
          )}
        </div>
      )}

    </div>
  )
}
export default Blog