import { useState } from 'react'
import blogService from '../services/blogs'

const CreateBlog = ({ blogs, setBlogs, showAlert }) => {
    const [showCreate, setShowCreate] = useState('hide')
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const addBlog = () => {
        const blogObject = {
            author: author,
            title: title,
            url: url
        }

        blogService.create(blogObject)
            .then(returnedBlog => {
                setBlogs(blogs.concat(returnedBlog));
                setTitle('')
                setAuthor('')
                setUrl('')
                setShowCreate('hide')
                showAlert("alert", "A new blog " + returnedBlog.title + " by " + returnedBlog.author + " added")
                setTimeout(() => {
                    showAlert('alert', null)
                }, 5000)
            })
            .catch(error => {
                //alert("An error occurred while creating the blog: " + error.message);
                showAlert('error', "An error occurred while creating the blog: " + error.message)
                setTimeout(() => {
                    showAlert('error', null)
                }, 5000)
            });
    }

    const cancelBlog = () => {
        setShowCreate('hide')
    }

    if (showCreate === "show") {
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
                <div>
                    <button onClick={addBlog}>Create</button>
                </div>
                <div>
                    <button onClick={cancelBlog}>Cancel</button>
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <button onClick={() => setShowCreate('show')}>Create New Blog </button>
            </div>)
    }
}

export default CreateBlog