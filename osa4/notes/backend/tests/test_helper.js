const bcrypt = require('bcrypt');
const Note = require('../models/note');
const User = require('../models/user');

const initialNotes = [
  {
    content: 'HTML is easy',
    important: false,
  },
  {
    content: 'Browser can execute only Javascript',
    important: true,
  }
];

const initialUsers = async () => {
  const passwordHash1 = await bcrypt.hash('sekret', 10);
  const passwordHash2 = await bcrypt.hash('salainen', 10);

  return [
    {
      username: 'hytosama',
      name: 'Samu Hytönen',
      passwordHash: passwordHash1,
    },
    {
      username: 'root',
      name: 'Superuser',
      passwordHash: passwordHash2,
    },
  ];
};

const seedDatabase = async () => {
  await User.deleteMany({});
  await Note.deleteMany({});

  const users = await initialUsers();
  const createdUsers = await User.insertMany(users);
  const user = createdUsers[0];

  const notesWithUser = initialNotes.map(note => ({
    ...note,
    user: user._id,
  }));

  await Note.insertMany(notesWithUser);
};

const nonExistingId = async () => {
  const note = new Note({ content: 'willremovethissoon' });
  await note.save();
  await note.deleteOne();

  return note._id.toString();
};

const notesInDb = async () => {
  const notes = await Note.find({});
  return notes.map(note => note.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map(u => u.toJSON());
};

module.exports = {
  initialNotes,
  initialUsers,
  nonExistingId,
  notesInDb,
  usersInDb,
  seedDatabase,
};