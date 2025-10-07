const _ = require('lodash');

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + (blog.likes || 0), 0)
}

const favoriteBlog = (blogs) => {
  if (!Array.isArray(blogs) || blogs.length === 0) return null;

  return blogs.reduce((mostLiked, blog) => {
    return (blog.likes || 0) > (mostLiked.likes || 0) ? blog : mostLiked;
  });
}

const mostBlogs = (blogs) => {
  if (!Array.isArray(blogs) || blogs.length === 0) return null;

  // Count blogs per author
  const authorCounts = _.countBy(blogs, 'author');

  // Find the author with the highest count
  const maxAuthor = _.maxBy(_.keys(authorCounts), author => authorCounts[author]);

  return {
    author: maxAuthor,
    blogs: authorCounts[maxAuthor]
  };
}

const mostLikes = (blogs) => {
  if (!Array.isArray(blogs) || blogs.length === 0) return null;

  // Group blogs by author
  const grouped = _.groupBy(blogs, 'author');

  // Sum likes per author
  const authorLikes = _.map(grouped, (posts, author) => ({
    author,
    likes: _.sumBy(posts, 'likes')
  }));

  // Find the author with the most likes
  return _.maxBy(authorLikes, 'likes');
}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
