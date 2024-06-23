import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  useEffect(()=>{
    axios.get('http://localhost:3001/persons')
    .then(response => {
      setPersons(response.data)
    })
  }, [])
  

  const handleInput = (event) =>{
    const value = event.target.value 
    setNewName(value)
  }

  const handleNInput = (event) =>{
    const value = event.target.value 
    setNewNumber(value)
  }

  const handleSearchInput = (event) =>{
    const  val = event.target.value
    setSearch(val)
  }

  const filtered = persons.filter((person) => person.name.toLowerCase().includes(search.toLowerCase()))




  const handleSubmit = (event) => {
    event.preventDefault()
    const exists = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())
    if (exists)
    {
      alert(`${newName}, is already added to phonebook`)
    }
    else 
    {
      const val = {
        name: newName,
        number: newNumber,
      }
      setPersons(persons.concat(val))
  
      setNewName('')
      setNewNumber('')
    }

  }


  return(
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} onChange={handleSearchInput}/>
      <h2>add a new</h2>
      <PersonForm 
        handleSubmit={handleSubmit}
        newName={newName}
        newNumber={newNumber}
        handleInput={handleInput}
        handleNInput={handleNInput}
       />
      <h2>Numbers</h2>
      <Persons filtered={filtered} persons={persons}/>
    </div>
  )
}

export default App