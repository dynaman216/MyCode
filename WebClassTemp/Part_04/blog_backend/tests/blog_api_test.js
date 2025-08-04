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

    assert.strictEqual(response.body.length, 27)
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

/*
test('New Blog is created', async () => {
    // 📊 Initial count
    const initialResponse = await api.get('/api/blogs');
    const initialCount = initialResponse.body.length;

    // 📝 New blog to post
    const newBlog = {
        title: 'Barney\'s Blog',
        author: 'Barney Rubble',
        url: 'https://BedrockNews.com',
        likes: 3,
    };

    // 🚀 POST request
    const postResponse = await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Content-Type', 'application/json');

    assert.strictEqual(postResponse.status, 201, 'Expected status 201 for successful creation');

    // 📊 Final count
    const finalResponse = await api.get('/api/blogs');
    const finalCount = finalResponse.body.length;

    assert.strictEqual(finalCount, initialCount + 1, 'Blog count did not increase by one');

    // 🔍 Verify content
    const response = finalResponse.body.find(blog => blog.title === newBlog.title);
    assert.ok(response, 'New blog post not found in response');
    assert.strictEqual(response.author, newBlog.author);
    assert.strictEqual(response.url, newBlog.url);
    assert.strictEqual(response.likes, newBlog.likes);
});
*/
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

after(async () => {
    await mongoose.connection.close()
})