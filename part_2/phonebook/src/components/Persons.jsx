const Persons = ({filtered, persons}) =>{
    return(
        <>
        {filtered.length === 0 ?
            persons.map(person => <p key={person.name}>{person.name} {person.number}</p> )
            : filtered.map(person => <p key={person.name}>{person.name} {person.number}</p>)}
        </>
    )
}

export default Persons