import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [notification, setNotification] = useState(null);
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
      setNotification({  message: 'wrong username or password', type: 'error' });
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser');
    setUser(null);
    blogService.setToken(null);

    setNotification({ message: 'logged out successfully', type: 'success' });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const handleNewBlog = async (title, author, url) => {
    const newBlog = { title, author, url };
    const createdBlog = await blogService.create(newBlog);
    setBlogs(blogs.concat(createdBlog));
    setNotification({ message: `a new blog ${title} by ${author} added`, type: 'success' });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  return (
    <>
      {!user && (
        <div>
          <h2>log in to application</h2>
          <Notification notification={notification} />
          <Login handleLogin={handleLogin}/>
        </div>
      )}
      {user && (
        <div>
          <div>
            <h2>blogs</h2>
            <Notification message={notification} />
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