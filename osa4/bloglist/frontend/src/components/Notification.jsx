const Notification = ({ notification }) => {
  if (!notification) return null;

  const style = {
    color: notification.type === 'error' ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  };

  return (
    <p style={style}>
      {notification.message}
    </p>
  );
};

export default Notification;