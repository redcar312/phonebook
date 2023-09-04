import { useState, useEffect } from 'react'
import {getAll, create, deletePerson, updatePerson} from  './services'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Form from './components/Form'
import Filter from './components/Filter'
import Persons from './components/Persons'

const App = () => {
 


  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterVal, setFilterVal] = useState('')
  
  
  

  useEffect(() => {
     getAll()
    .then(res => {
      
      setPersons(res.data)
      
    })
 
},[])


  const handleFilter = (e) => {
      setFilterVal(e.target.value)
      
      
        
      }
 
    
  
  
  
  
  const handleNameChange = (e) => {
    
    setNewName(e.target.value)
    
  } 


const handleSubmit = (e) => {
   e.preventDefault() 
  const foundUser = persons.find(person => newName.toLowerCase() === person.name.toLowerCase())
  let personObject 


  if(foundUser) { 
      const id = foundUser.id
      personObject = {...foundUser, number:newNumber}
      if(window.confirm(`user named ${newName} already exists. Would you like to update it.`)){
        updatePerson(personObject).then(res => {
          console.log(res.data)
          setPersons(persons.map(person => 
            person.id !== id ? person : res.data
            ))
            setNewName('')
            setNewNumber('')
        }).catch(err => {
          console.log(err)
        }) 




      }else {
        setNewName('')
        setNewNumber('')
        return
      }



  } else {
    personObject = {
      name: newName,
      number:newNumber
     }

  
    create(personObject)
   .then(res => 
          {setPersons(persons.concat(personObject))
          setNewName('')
          setNewNumber('')
})
  }
}
const handleDeletion = (id) => {
  
  console.log(id)
  deletePerson(id).then(res => {
  setPersons(persons.filter(person => person.id != id))
  })
}
 
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilter={handleFilter}></Filter>
      <h2>Add a new person</h2>
      <Form newNumber={newNumber} setNewNumber={setNewNumber} handleSubmit={handleSubmit} newName={newName} handleNameChange={handleNameChange} ></Form>
      <h2>Numbers</h2>
       <Persons filterVal={filterVal}  persons={persons} handleDeletion={handleDeletion} ></Persons>
    </div>
  )

}

export default App
