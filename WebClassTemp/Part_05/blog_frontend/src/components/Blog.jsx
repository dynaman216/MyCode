import { useState } from "react"

const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState('show')

  const ToggleShowDetails = () => {
    if (showDetails == 'show') {
      setShowDetails('hide')
    } else {
      setShowDetails('show')
    }
  }

  const addLike = () => {

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
            <button onClick={addLike}>Like</button>
          </p>
          {blog.user.name}
        </div>
      )}

    </div>
  )
}
export default Blog