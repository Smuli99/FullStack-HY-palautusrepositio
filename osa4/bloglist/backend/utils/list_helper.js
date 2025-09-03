// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => 1;

const totalLikes = (blogs) => (
  blogs.length === 0
    ? 0
    : blogs.reduce((sum, blog) => sum + blog.likes, 0)
);

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return 0;

  return blogs
    .reduce((maxBlog, current) => (
      current.likes > maxBlog.likes ? current : maxBlog
    ));
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return 0;

  const count = blogs
    .reduce((accumulator, blog) => {
      accumulator[blog.author] = (accumulator[blog.author] || 0) + 1;
      return accumulator;
    }, {});

  const [author, blogCount] = Object.entries(count)
    .reduce((max, current) => (current[1] > max[1] ? current : max));

  return { author, blogs: blogCount };
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) return 0;

  const count = blogs
    .reduce((acc, blog) => {
      acc[blog.author] = (acc[blog.author] || 0) + blog.likes;
      return acc;
    }, {});

  const [author, likes] = Object.entries(count)
    .reduce((max, current) => (current[1] > max[1] ? current : max));

  return { author, likes };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
