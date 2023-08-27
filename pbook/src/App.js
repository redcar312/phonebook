
import { useState, useEffect } from 'react'
import {getAll, create, deletePerson, updatePerson} from  './services'
import Form from './components/Form'
import Filter from './components/Filter'
import Persons from './components/Persons'
const App = () => {
 


  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterVal, setFilterVal] = useState('')
  
  
  const filterArr = persons.filter(person => person.name.toLowerCase().includes(filterVal.toLowerCase()))

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

 


  const personObject = {
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
      <Form newNumber={newNumber} setNewNumber={setNewNumber} handleSubmit={handleSubmit} handleNameChange={handleNameChange} ></Form>
      <h2>Numbers</h2>
       <Persons filterVal={filterVal} filterArr={filterArr} persons={persons} handleDeletion={handleDeletion} ></Persons>
    </div>
  )

}

export default App
