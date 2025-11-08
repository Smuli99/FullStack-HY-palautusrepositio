const ErrorMessage = ({ message }) => {
  if (message === null) return;

  return (
    <div>
      <p style={{
        color: 'red',
        background: 'lightgrey', 
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10 
      }}>
        {message}
      </p>
    </div>
  );
};

export default ErrorMessage;