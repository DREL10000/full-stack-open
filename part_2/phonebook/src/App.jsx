import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'
import noteServices from './services/note'
import note from './services/note'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    noteServices.getAll().then(notes => setPersons(notes))
      .catch(error => alert(error))
  }, [])


  const handleInput = (event) => {
    const value = event.target.value
    setNewName(value)
  }

  const handleNInput = (event) => {
    const value = event.target.value
    setNewNumber(value)
  }

  const handleSearchInput = (event) => {
    const val = event.target.value
    setSearch(val)
  }

  const filtered = persons.filter((person) => person.name.toLowerCase().includes(search.toLowerCase()))




  const handleSubmit = (event) => {
    event.preventDefault()
    const exists = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())
    if (exists) {
      if (window.confirm(`${newName}, is already added to phonebook, replace the old number with a new one?`))
        {
          const newObj = {...exists, number: newNumber}
          noteServices.update(exists.id, newObj)
          .then(response => setPersons(persons.map( p => p.id !== response.id ? p : response )))
          .catch(error => alert(error))

          setNewName('')
          setNewNumber('')
        }
      
    }
    else {
      const val = {
        name: newName,
        number: newNumber,
      }

      noteServices.create(val).then(note => setPersons(persons.concat(note)))
        .catch(error => alert(error))

      setNewName('')
      setNewNumber('')
    }

  }

  const handleDelete = (person) => {
    //check to see if it exists
    if (window.confirm(`Delete ${person.name} ?`)) {
      noteServices.remove(person.id)
        .then(ps => setPersons(persons.filter(p => p.id !== ps.id)))
        .catch(error => alert(error))
    }

  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} onChange={handleSearchInput} />
      <h2>add a new</h2>
      <PersonForm
        handleSubmit={handleSubmit}
        newName={newName}
        newNumber={newNumber}
        handleInput={handleInput}
        handleNInput={handleNInput}
      />
      <h2>Numbers</h2>
      <Persons filtered={filtered} persons={persons} onDelete={handleDelete} />
    </div>
  )
}

export default App