import { useState, useEffect } from 'react'
import blogService from '../services/blogs'

const CreateBlog = ({ blogs, setBlogs }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const addBlog = () => {
        const blogObject = {
            author: author,
            title: title,
            url: url
        }

        blogService.CreateBlog(blogObject).then(returnedBlog => {
            setblogs(blogs.concat(returnedBlog))
        })
    }

    return (
        <div>
            <h2>Create New Blog</h2>
            <div>
                <label>
                    Title:
                    <input
                        type="text"
                        value={title}
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </label>
            </div>

            <div>
                <label>
                    Author:
                    <input
                        type="text"
                        value={author}
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </label>
            </div>

            <div>
                <label>
                    URL:
                    <input
                        type="text"
                        value={url}
                        onChange={({ target }) => setUrl(target.value)}
                    />
                </label>
            </div>
            <button onClick={addBlog}>Create</button>
        </div>
    )
}

export default CreateBlog