import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [notification, setNotification] = useState(null);
  const [user, setUser] = useState(null);

  const blogFromRef = useRef();

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

  const handleNewBlog = async (blogObject) => {
    blogFromRef.current.toggleVisibility();

    const newBlog = await blogService.create(blogObject);
    setBlogs(blogs.concat(newBlog));
    setNotification({ message: `a new blog ${newBlog.title} by ${newBlog.author} added`, type: 'success' });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  return (
    <>
      {!user && (
        <div>
          <LoginForm handleLogin={handleLogin} notification={notification}/>
        </div>
      )}
      {user && (
        <div>
          <div>
            <h2>blogs</h2>
            <Notification notification={notification} />

            <div>
              <span>{user.name} logged in</span>
              <button onClick={() => handleLogout()}>logout</button>
            </div>
            
            {blogs.map(blog =>
              <Blog key={blog.id} blog={blog} />
            )}
          </div>
          <div>
            <Togglable showButtonLabel="create new blog" ref={blogFromRef}>
              <BlogForm handleNewBlog={handleNewBlog} />
            </Togglable>
          </div>

        </div>
      )}
    </>
  );
};

export default App;