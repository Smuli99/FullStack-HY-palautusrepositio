import { useState } from "react"
import Notification from "./Notification"

const LoginForm = ({ handleLogin, notification }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const login = (event) => {
    event.preventDefault();
    handleLogin(username, password);
    setUsername('');
    setPassword('');
  };

  return (
    <div>
      <h2>log in to application</h2>
      <Notification notification={notification} />
      
      <form onSubmit={login}>
        <div>
          <label>
            username
            <input
              type="text"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            password
            <input
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </label>
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default LoginForm;