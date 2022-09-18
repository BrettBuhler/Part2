import React, { useEffect } from "react"
import { useState } from "react"
import Phonebook from "./components/Phonebook"
import Display from "./components/Display"
import AddNew from "./components/AddNew"
import personsService from './services/phonebook'


const App = () => {
  const [persons, setPerson] = useState([])

  useEffect(() => {
    personsService.getAll()
      .then(res => {
        setPerson(res)
      })
    },[])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const deletePerson = (event) => {
    event.preventDefault()
    if(window.confirm(`Do you want to delete ${event.target.name}?`)){
      personsService.deleteId(event.target.value).then(res => {
        personsService.getAll().then(res => {setPerson(res)})
      })
      
    }
  }
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
        if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)){
          persons.find(x => {
            if (x.name === newName){
              console.log(x.name, 'is equal')
              let personNum = newNumber
              if (personNum.length === 0){
                personNum = "unknown"
              }
              personsService.update(x.id, { name: newName, number: personNum})
                .then(res => {
                  personsService.getAll().then(res => {
                    setPerson(res)
                    setNewName('')
                    setNewNumber('')
                  })
                })
            }
          })
        }
        setNewName('')
        setNewNumber('')
      } else {
        let personNum = newNumber
        if (personNum.length === 0){
          personNum = "unknown"
        }
        const newPerson = {
          name: newName,
          number: personNum
        }
        personsService.create(newPerson).then(
          personsService.getAll().then(res => {
            setNewName('')
            setNewNumber('')
          })
        )
      }
    }
    personsService.getAll().then(res => {
      setPerson(res)
    })
  }
  return (
    <div>
      <Phonebook newFilter={newFilter} handleFilterChange={handleFilterChange}/>
      <AddNew handleNameSubmit={handleNameSubmit} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <Display persons={persons} newFilter={newFilter} deletePerson={deletePerson} key={1}/>
    </div>
  )
}

export default App
