const PersonForm = ({handleSubmit, newName, newNumber, handleInput, handleNInput}) => {
    return (
    <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleInput} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNInput} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
    </form>
    )
}

export default PersonForm