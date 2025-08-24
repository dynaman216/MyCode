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

    assert.strictEqual(response.body.length, 4)
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
/*

test('missing like returns 0 instead of empty', async () => {
const response = await api.get('/api/blogs');
response.body.forEach(blog => {
    //console.log('Transforming blog:', blog.title + " " + blog.likes);
    assert.ok(blog.likes, 'Blog likes is missing instead of 0.');
    assert.strictEqual(typeof blog.likes, 'number', 'Blog likes should be a number');
});
});

test('Title Required', async () => {
const blogWithoutTitle = {
    author: 'Paul',
    url: 'http://example.com',
    likes: 5
};

try {
    const response = await api
        .post('/api/blogs')
        .send(blogWithoutTitle)
        .set('Content-Type', 'application/json');

    assert.strictEqual(response.status, 400, 'Expected 400 when title is missing');
} catch (err) {
    console.error('❌ Error during test:', err);
    throw err;
}
});

test('URL Required', async () => {
const blogWithoutTitle = {
    title: 'Twist Twist Twist',
    author: 'Fred Flintstone',
    likes: 1
};

try {
    const response = await api
        .post('/api/blogs')
        .send(blogWithoutTitle)
        .set('Content-Type', 'application/json');

    assert.strictEqual(response.status, 400, 'Expected 400 when title is missing');
} catch (err) {
    console.error('❌ Error during test:', err);
    throw err;
}
});

test('Check Likes', async () => {
const updateLikes = { likes: 7 };

try {
    const response = await api
        .put('/api/blogs/688527293caee9e748c4f2cc')
        .send(updateLikes)
        .set('Content-Type', 'application/json');

    assert.strictEqual(response.status, 200, 'Expected status 200');
    assert.strictEqual(response.body.likes, 7, 'Expected 7 likes');
} catch (err) {
    console.error('❌ Error during test:', err);
    throw err;
}
});

test('Delete Test', async () => {
const blogToDelete = {
title: 'Delete Me',
author: 'Paul',
url: 'http://example.com',
likes: 5
};

try {
const response = await api
  .post('/api/blogs')
  .send(blogToDelete)
  .set('Content-Type', 'application/json');

const blogId = response.body.id;
console.log('Created blog ID:', blogId);

const deleteResponse = await api.delete('/api/blogs/' + blogId);
console.log('Delete status:', deleteResponse.status);

const responseCount = await api.get('/api/blogs');
console.log('Remaining blogs:', responseCount.body.length);

assert.strictEqual(deleteResponse.status, 204);
assert.strictEqual(responseCount.body.find(b => b.id === blogId), undefined);
} catch (err) {
console.error('❌ Error during test:', err);
throw err;
}
});

*/

after(async () => {
    await mongoose.connection.close()
})