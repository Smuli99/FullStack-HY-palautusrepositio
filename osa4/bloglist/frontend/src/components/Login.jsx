import ErrorMessage from "./ErrorMessage"

const Login = ({ username, password, setUsername, setPassword, handleLogin, errorMessage }) => {
  return (
    <div className="loginScreen">
      <h2>log in to application</h2>
      <ErrorMessage message={errorMessage} />
      
      <form onSubmit={handleLogin}>
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
}

export default Login;