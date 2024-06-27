const NotificationE = ({ message }) =>{

    const notifyStyle = {
        backgroundColor: 'lightgrey',
        border: 'red',
        borderWidth: 2,
        color: 'red',
        padding: 10,
        marginBottom: 3,
    }

    if (message === null){
        return null
    }

    return (
        <div style={notifyStyle}>
            {message}
        </div>
    )
}

export default NotificationE