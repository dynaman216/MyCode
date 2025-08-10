const assert = require('node:assert')
const { test, after } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const { title } = require('node:process')
const Blog = require('../models/blog')

const api = supertest(app)

/*
test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})
*/

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, 33)
})

test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')

    const contents = response.body.map(e => e.title)
    assert.equal(contents.includes("War and Peace"), true)
})

test('blog item has id instead of _id', async () => {
    const response = await api.get('/api/blogs');
    response.body.forEach(blog => {
        assert.ok(blog.id, `'id' property is missing in blog: ${JSON.stringify(blog)}`);
        assert.strictEqual(blog._id, undefined, `'_id' should be undefined in blog: ${JSON.stringify(blog)}`);
    });
});

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



after(async () => {
    await mongoose.connection.close()
})