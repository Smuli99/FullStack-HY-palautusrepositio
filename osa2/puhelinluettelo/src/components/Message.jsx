const Message = ({ message }) => {
    if (message === null) return null;

    const className = message.toLowerCase().includes('error')
        ? 'error'
        : 'success'

    return (
        <div className={className}>
            {message}
        </div>
    );
};

export default Message;