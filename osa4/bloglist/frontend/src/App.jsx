import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    );
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({ username, password });
      
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      );

      blogService.setToken(user.token);
  
      setUser(user);
    } catch {
      setErrorMessage('wrong credentials');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser');
    setUser(null);
    blogService.setToken(null);
  };

  const handleNewBlog = async (title, author, url) => {
    const newBlog = { title, author, url };
    const createdBlog = await blogService.create(newBlog);
    setBlogs(blogs.concat(createdBlog));
  };

  return (
    <>
      {!user && (
        <Login 
          handleLogin={handleLogin}
          errorMessage={errorMessage}
        />
      )}
      {user && (
        <div>
          <div>
            <h2>blogs</h2>
            <p>{user.name} logged in</p>
            <button onClick={() => handleLogout()}>logout</button>
            {blogs.map(blog =>
              <Blog key={blog.id} blog={blog} />
            )}
          </div>
          <div>
            <h2>create new</h2>
            <BlogForm handleNewBlog={handleNewBlog} />
          </div>

        </div>
      )}
    </>
  )
};

export default App;