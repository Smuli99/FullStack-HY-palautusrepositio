const blogsRouter = require('express').Router();
const { userExtractor } = require('../utils/middleware');
const Blog = require('../models/blog');

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

blogsRouter.post('/', userExtractor, async (request, response) => {
  const { body, user } = request;

  if (!body.title || !body.url) {
    return response.status(400).json({ error: 'title or url missing' });
  }
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user.id,
  });

  const savedBlog = await blog.save();

  user.blogs = user.blogs.concat(savedBlog.id);
  await user.save();

  // saadaan koko user olio palautuksena
  await savedBlog.populate('user', { username: 1, name: 1 });

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

  // saadaan koko user olio palautuksena
  await updatedBlog.populate('user', { username: 1, name: 1 });

  return response.json(updatedBlog);
});

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const { user } = request;

  const blog = await Blog.findById(request.params.id);

  if (!blog) {
    return response.status(404).json({ error: 'blog not found' });
  }

  if (blog.user.toString() !== user.id.toString()) {
    return response.status(403).json({ error: 'forbidden: only the creator can delete this blog' });
  }

  await Blog.findByIdAndDelete(request.params.id);
  return response.status(204).end();
});

module.exports = blogsRouter;
