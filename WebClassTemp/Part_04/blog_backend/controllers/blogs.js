const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
//const {userExtractor} = require('../utils/middleware.js')
const Blog = require('../models/blog.js')
const User = require('../models/user.js')
const {userExtractor} = require('../utils/middleware.js')

blogsRouter.get('/', async (request, response) => {
  try {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })

    response.json(blogs);
  } catch (error) {
    response.status(500).json({ error: 'Failed to fetch blogs' });
  }
});

blogsRouter.get('/:id', async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id);
    if (blog) {
      response.json(blog);
    } else {
      response.status(404).end();
    }
  } catch (error) {
    next(error);
  }
});

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

//blogsRouter.post('/', async (request, response, next) => {
blogsRouter.post('/', userExtractor, async (request, response, next) => {
  try {
    const blog = new Blog(request.body);

    const user = request.user

   // const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET) 
    //const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!user.id) {
      return response.status(401).json({ error: 'token invalid' })
    }
    //const user = await User.findById(decodedToken.id)
    
    const newBlog = new Blog({
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes,
      user: user._id
    })

    const savedBlog = await newBlog.save();
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.json(savedBlog);
  } catch (error) {
    next(error);
  }
});

/*
blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    const blog = await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } catch (error) {
    next(error);
  }
})
*/

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' });
    }

    const blog = await Blog.findById(request.params.id);
    if (!blog) {
      return response.status(404).json({ error: 'blog not found' });
    }

    if (blog.user.toString() !== decodedToken.id) {
      return response.status(403).json({ error: 'unauthorized: not the blog owner' });
    }

    await Blog.findByIdAndDelete(request.params.id);
    response.status(204).end();
  } catch (error) {
    next(error);
  }
});


blogsRouter.put('/:id', async (request, response, next) => {
  try {
    const { likes } = request.body;
    const blog = await Blog.findById(request.params.id);

    if (!blog) {
      return response.status(404).end();
    }

    blog.likes = likes;
    const updatedBlog = await blog.save();
    response.json(updatedBlog);
  } catch (error) {
    next(error);
  }
});

module.exports = blogsRouter