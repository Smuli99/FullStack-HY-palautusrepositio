const bcrypt = require('bcrypt');
const Blog = require('../models/blog');
const User = require('../models/user');

const initialBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
];

const initialUsers = async () => {
  const passwordHash = await bcrypt.hash('salainen', 10);
  const passwordHash2 = await bcrypt.hash('salainen', 10);

  return [
    {
      username: 'root',
      name: 'Superuser',
      passwordHash,
    },
    {
      username: 'FooBar',
      name: 'Foo Bar',
      passwordHash: passwordHash2,
    },
  ];
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

const setDatabase = async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  const users = await initialUsers();
  const createdUsers = await User.insertMany(users);

  const user = createdUsers[0];

  const blogsWithUser = initialBlogs.map((blog) => ({
    ...blog,
    user: user.id,
  }));

  await Blog.insertMany(blogsWithUser);
};

const loginAndGetToken = async (api, username, password) => {
  const response = await api
    .post('/api/login')
    .send({ username, password })
    .expect(200)
    .expect('Content-Type', /application\/json/);

  return response.body.token;
};

module.exports = {
  initialBlogs,
  initialUsers,
  blogsInDb,
  usersInDb,
  setDatabase,
  loginAndGetToken,
};
