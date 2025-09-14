const assert = require('node:assert')
const { test, after } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const { title } = require('node:process')
const Blog = require('../models/user')

const api = supertest(app)

/*
test('users are returned as json', async () => {
    await api
        .get('/api/users')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})
*/



test('all users are returned', async () => {
    const response = await api.get('/api/users')

    assert.strictEqual(response.body.length, 2)
})

test('a specific user is within the returned users', async () => {
    const response = await api.get('/api/users')

    const userName = response.body.map(e => e.username)
    assert.equal(userName.includes("PaulB"), true)
})

test('User Name is missing', async () => {
    const userMissing = {
        "name": "Paul Blankenship",
        "password": "byte"
    };

    try {
        const response = await api
            .post('/api/users')
            .send(userMissing)
            .set('Content-Type', 'application/json');

        assert.strictEqual(response.status, 400, 'Expected 404 when user name is missing');
    } catch (err) {
        console.error('❌ Error during test:', err);
        throw err;
    }
});

test('User Name has 3 characters or more', async () => {
    const userTooShort = {
        "username": "pa",
        "name": "Paul Blankenship",
        "password": "byte"
    };

    try {
        const response = await api
            .post('/api/users')
            .send(userTooShort)
            .set('Content-Type', 'application/json');

        assert.strictEqual(response.status, 400, 'Expected 404 when user name is too short');
    } catch (err) {
        console.error('❌ Error during test:', err);
        throw err;
    }
});

test('Password is missing', async () => {
    const passwordMissing = {
        "username": "paulD",
        "name": "Paul Blankenship"
    };

    try {
        const response = await api
            .post('/api/users')
            .send(passwordMissing)
            .set('Content-Type', 'application/json');

        assert.strictEqual(response.status, 500, 'Expected 404 when password is missing');
    } catch (err) {
        console.error('❌ Error during test:', err);
        throw err;
    }
});

test('Password has 3 characters or more', async () => {
    const passwordTooShort = {
        "username": "paulD",
        "name": "Paul Blankenship",
        "password": "by"
    };

    try {
        const response = await api
            .post('/api/users')
            .send(passwordTooShort)
            .set('Content-Type', 'application/json');

        assert.strictEqual(response.status, 400, 'Expected 400 when password is too short');
    } catch (err) {
        console.error('❌ Error during test:', err);
        throw err;
    }
});

after(async () => {
    await mongoose.connection.close()
})