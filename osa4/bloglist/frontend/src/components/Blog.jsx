import { useState } from 'react';

const Blog = ({ blog, handleAddLike }) => {
  const [detailsVisible, setDetailsVisible] = useState(false);

  const toggleVisibility = () => {
    setDetailsVisible(!detailsVisible);
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  
  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>
          {detailsVisible ? 'hide' : 'view'}
        </button>
      </div>
      {detailsVisible && (
        <div>
          <p>
            <a href={blog.url}>{blog.url}</a>
          </p>
          <div>
            likes {blog.likes}
            <button onClick={() => handleAddLike(blog.id)}>like</button>
          </div>
          <p>{blog.user.name}</p>
        </div>
      )}
    </div>
  );
};

export default Blog;