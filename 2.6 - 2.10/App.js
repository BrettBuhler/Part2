import React from "react"
import { useState } from "react"
import Phonebook from "./components/Phonebook"
import Display from "./components/Display"
import AddNew from "./components/AddNew"


const App = () => {
  const [persons, setPerson] = useState([
    { name: 'Arto Hellas', number: '040-123456', key: 0 },
    { name: 'Ada Lovelace', number: '39-44-5323523', key: 1 },
    { name: 'Dan Abramov', number: '12-43-234345', key: 2 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', key: 3 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNameSubmit = (event) => {
    event.preventDefault()
    if (newName !== ''){
      if (persons.find(x => x.name === newName)){
        alert(`${newName} is already added to phonebook`)
        setNewName('')
        setNewNumber('')
      } else {
        let personNum = newNumber
        if (personNum.length === 0){
          personNum = "unknown"
        }
        setPerson(persons.concat({
          key: persons.length,
          name: newName,
          number: personNum
        }))
        setNewName('')
        setNewNumber('')
      }
    }
  }
  return (
    <div>
      <Phonebook newFilter={newFilter} handleFilterChange={handleFilterChange}/>
      <AddNew handleNameSubmit={handleNameSubmit} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <Display persons={persons} newFilter={newFilter}/>
    </div>
  )
}

export default App
