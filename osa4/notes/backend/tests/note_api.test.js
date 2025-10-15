const assert = require('node:assert');
const { test, after, beforeEach, describe } = require('node:test');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const helper = require('./test_helper');
const User = require('../models/user');

const api = supertest(app);

describe('login and token handling', () => {
  beforeEach(async () => {
    await User.deleteMany({});
    const users = await helper.initialUsers();
    await User.insertMany(users);
  });

  test('login succeeds with correct credentials', async () => {
    const loginDetails = {
      username: 'hytosama',
      password: 'sekret',
    };

    const response = await api
      .post('/api/login')
      .send(loginDetails)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    assert(response.body.token, 'Response should include a token');
    assert.strictEqual(response.body.username, loginDetails.username);
  });

  test('login fails with statuscode 401 if invalid credentials', async () => {
    const loginDetails = {
      username: 'hytosama',
      password: 'wrong',
    };

    const response = await api
      .post('/api/login')
      .send(loginDetails)
      .expect(401)
      .expect('Content-Type', /application\/json/);

    assert.strictEqual(response.body.error, 'invalid username or password');
    assert(!response.body.token, 'Response should not include a token');
  });
});

describe('when there is initially some notes saved', () => {
  beforeEach(async () => {
    await helper.seedDatabase();
  });

  test('notes are returned as json', async () => {
    await api
      .get('/api/notes')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('all notes are returned', async () => {
    const response = await api.get('/api/notes');

    assert.strictEqual(response.body.length, helper.initialNotes.length);
  });

  test('a specific note is within the returned notes', async () => {
    const response = await api.get('/api/notes');

    const contents = response.body.map(e => e.content);
    assert(contents.includes('HTML is easy'));
  });

  describe('viewing a specific note', () => {
    test('succeeds with a valid id', async () => {
      const notesAtStart = await helper.notesInDb();
      const noteToView = notesAtStart[0];

      const resultNote = await api
        .get(`/api/notes/${noteToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/);

      assert.strictEqual(resultNote.body.content, noteToView.content);
      assert.strictEqual(resultNote.body.important, noteToView.important);
      assert.strictEqual(resultNote.body.id, noteToView.id);
    });

    test('fails with status code 404 if note does not exist', async () => {
      const validNonexistingId = await helper.nonExistingId();

      await api
        .get(`/api/notes/${validNonexistingId}`)
        .expect(404);
    });

    test('fails with status code 400 if id is invalid', async () => {
      const invalidId = '5a3d5da59070081a82a3445';

      await api
        .get(`/api/notes/${invalidId}`)
        .expect(400);
    });
  });

  describe('addition of a new note', () => {
    test('succeeds with valid data', async () => {
      const users = await helper.usersInDb();
      const user = users[0];

      const token = await helper.loginAndGetToken(api, user.username, 'sekret');

      const newNote = {
        content: 'async/await simplifies making async calls',
        important: true,
        userId: user.id,
      };

      await api
        .post('/api/notes')
        .set('Authorization', `Bearer ${token}`)
        .send(newNote)
        .expect(201)
        .expect('Content-Type', /application\/json/);

      const notesAtEnd = await helper.notesInDb();
      assert.strictEqual(notesAtEnd.length, helper.initialNotes.length + 1);

      const contents = notesAtEnd.map(n => n.content);
      assert(contents.includes('async/await simplifies making async calls'));
    });

    test('fails with status code 400 if data invalid', async () => {
      const users = await helper.usersInDb();
      const user = users[0];

      const token = await helper.loginAndGetToken(api, user.username, 'sekret');

      const newNote = {
        important: true,
      };

      await api
        .post('/api/notes')
        .set('Authorization', `Bearer ${token}`)
        .send(newNote)
        .expect(400);

      const notesAtEnd = await helper.notesInDb();

      assert.strictEqual(notesAtEnd.length, helper.initialNotes.length);
    });
  });

  describe('deletion of a note', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const notesAtStart = await helper.notesInDb();
      const noteToDelete = notesAtStart[0];

      await api
        .delete(`/api/notes/${noteToDelete.id}`)
        .expect(204);

      const notesAtEnd = await helper.notesInDb();

      const contents = notesAtEnd.map(n => n.content);
      assert(!contents.includes(noteToDelete.content));

      assert.strictEqual(notesAtEnd.length, helper.initialNotes.length - 1);
    });
  });
});

describe('when there is initially two users in db', () => {
  beforeEach(async () => {
    await User.deleteMany({});
    const users = await helper.initialUsers();
    await User.insertMany(users);
  });

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'foobar',
      name: 'barfoo',
      password: 'foodbar',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1);

    const usernames = usersAtEnd.map(u => u.username);
    assert(usernames.includes(newUser.username));
  });

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDb();

    assert(result.body.error.includes('expected `username` to be unique'));
    assert.strictEqual(usersAtEnd.length, usersAtStart.length);
  });
});

after(async () => {
  await mongoose.connection.close();
});