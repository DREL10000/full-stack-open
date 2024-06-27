const Notification = ({ message }) =>{
    const notifyStyle = {
        backgroundColor: 'lightgrey',
        border: 'green',
        borderWidth: 2,
        color: 'green',
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


export default Notification 