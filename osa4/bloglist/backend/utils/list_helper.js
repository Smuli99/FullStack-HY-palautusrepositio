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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
