const ErrorMessage = ({ message }) => {
  if (message === null) return;

  return (
    <div>
      <p style={{ color: 'red', background: 'lightgrey', fontSize: 20 }}>
        {message}
      </p>
    </div>
  );
};

export default ErrorMessage;