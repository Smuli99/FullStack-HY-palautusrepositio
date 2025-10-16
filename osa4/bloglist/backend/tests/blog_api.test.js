const assert = require('node:assert');
const {
  test,
  after,
  beforeEach,
  describe,
} = require('node:test');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const helper = require('./test_helper');
const Blog = require('../models/blog');
const User = require('../models/user');

const api = supertest(app);

describe('when there is initially some blogs saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(helper.initialBlogs);
  });

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs');

    assert.strictEqual(response.body.length, helper.initialBlogs.length);
  });

  test('blogs unique identifier is named id not _id', async () => {
    const response = await api.get('/api/blogs');
    const blog = response.body[0];

    assert.ok(blog.id);
    // eslint-disable-next-line no-underscore-dangle
    assert.strictEqual(blog._id, undefined);
  });

  describe('addition of a new blog', () => {
    test('succeeds with a valid data', async () => {
      const newBlog = {
        title: 'New Blog',
        author: 'Author Name',
        url: 'http://example.com/new-blog',
        likes: 5,
      };

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/);

      const blogsAtEnd = await helper.blogsInDb();
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1);

      const titles = blogsAtEnd.map((b) => b.title);
      assert(titles.includes('New Blog'));
    });

    test('blog without likes defaults to 0', async () => {
      const newBlog = {
        title: 'Blog Without Likes',
        author: 'Author Name',
        url: 'http://example.com/blog-without-likes',
      };

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/);

      const blogsAtEnd = await helper.blogsInDb();
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1);

      const addedBlog = blogsAtEnd.find((b) => b.title === 'Blog Without Likes');
      assert.strictEqual(addedBlog.likes, 0);
    });

    test('blog without title and url is not added', async () => {
      const newBlog = {
        author: 'Author Name',
        likes: 3,
      };

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400);

      const blogsAtEnd = await helper.blogsInDb();
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length);
    });
  });

  describe('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb();
      const blogToDelete = blogsAtStart[0];

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204);

      const blogsAtEnd = await helper.blogsInDb();
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1);

      const titles = blogsAtEnd.map((b) => b.title);
      assert(!titles.includes(blogToDelete.title));
    });
  });

  describe('edition of a blog', () => {
    test('succeeds in updating a blog', async () => {
      const blogsAtStart = await helper.blogsInDb();
      const blogToUpdate = blogsAtStart[0];

      const updatedData = { ...blogToUpdate, likes: blogToUpdate.likes + 1 };

      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(updatedData)
        .expect(200)
        .expect('Content-Type', /application\/json/);

      const blogsAtEnd = await helper.blogsInDb();
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length);

      const updatedBlog = blogsAtEnd.find((b) => b.id === blogToUpdate.id);
      assert.strictEqual(updatedBlog.likes, blogToUpdate.likes + 1);
    });
  });
});

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({});
    const user = new User(helper.initialUsers[0]);
    await user.save();
  });

  test('creation succeeds with a fresh username with statuscode 201', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'foobar',
      name: 'Foo Bar',
      password: 'salainen',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    assert(usernames.includes(newUser.username));
  });

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: usersAtStart[0].username,
      name: 'Foo Bar',
      password: 'secret',
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    assert(result.body.error.includes('expected `username` to be unique'));

    const usersAtEnd = await helper.usersInDb();
    assert.strictEqual(usersAtEnd.length, usersAtStart.length);
  });
});

after(async () => {
  await mongoose.connection.close();
});
