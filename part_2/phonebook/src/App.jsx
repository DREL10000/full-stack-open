import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import NotificationE from './components/NotificationE'
import axios from 'axios'
import noteServices from './services/note'
import note from './services/note'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [success, setSuccess] = useState(null)
  const [error, setError] = useState(null)

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
  const isGreen = true




  const handleSubmit = (event) => {
    event.preventDefault()
    const exists = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())
    if (exists) {
      if (window.confirm(`${newName}, is already added to phonebook, replace the old number with a new one?`))
        {
          const newObj = {...exists, number: newNumber}
          noteServices.update(exists.id, newObj)
          .then(response => {
            setSuccess(`replaced number for ${response.name}`)
            setTimeout(() => {
              setSuccess(null)
            }, 5000)
            setPersons(persons.map( p => p.id !== response.id ? p : response))
          })
          .catch(e => {
            setError(`Information of ${newObj.name} has already been removed from server`)
            setTimeout(() => {
              setError(null)
            }, 5000)
            setPersons(persons.filter(p => p.id !== newObj.id))
          })

          setNewName('')
          setNewNumber('')
        }
      
    }
    else {
      const val = {
        name: newName,
        number: newNumber,
      }

      noteServices.create(val).then(note => {
        setSuccess(`added ${note.name}`)
        setTimeout(() => {
          setSuccess(null)
        }, 5000)
        setPersons(persons.concat(note))
      })
        .catch(e => alert(e))

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
      <Notification message={success}/>
      <NotificationE message={error}/>
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