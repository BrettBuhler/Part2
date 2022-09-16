import React, { useEffect } from "react"
import { useState } from "react"
import Phonebook from "./components/Phonebook"
import Display from "./components/Display"
import AddNew from "./components/AddNew"
import axios from "axios"


const App = () => {
  const [persons, setPerson] = useState([])

  useEffect(() => {
      axios
      .get("http://localhost:3001/persons")
      .then(res => {
        setPerson(res.data)
      })},[])

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
