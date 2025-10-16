const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  if (blog) {
    response.json(blog);
  } else {
    response.status(404).end();
  }
});

blogsRouter.post('/', async (request, response) => {
  const { body } = request;

  const user = await User.findById(body.userId);

  if (!user) {
    return response.status(400).json({ error: 'userId missing or not valid' });
  }

  if (!body.title || !body.url) {
    return response.status(400).json({ error: 'title or url missing' });
  }
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog.id);
  await user.save();

  return response.status(201).json(savedBlog);
});

blogsRouter.put('/:id', async (request, response) => {
  const {
    title,
    author,
    url,
    likes,
  } = request.body;

  const blogToUpdate = await Blog.findById(request.params.id);

  if (!blogToUpdate) {
    return response.status(404).json({ error: 'blog not found' });
  }

  blogToUpdate.title = title;
  blogToUpdate.author = author;
  blogToUpdate.url = url;
  blogToUpdate.likes = likes;

  const updatedBlog = await blogToUpdate.save();
  return response.json(updatedBlog);
});

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id);
  response.status(204).end();
});

module.exports = blogsRouter;
