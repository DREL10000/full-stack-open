const Persons = ({filtered, persons, onDelete}) =>{
    return(
        <>
        {filtered.length === 0 ?
            persons.map(person => <p key={person.name}>{person.name} {person.number} <button onClick={() => onDelete(person)}>delete</button></p> )
            : filtered.map(person => <p key={person.name}>{person.name} {person.number} <button onClick={() => onDelete(person)}>delete</button></p>)}
        </>
    )
}

export default Persons