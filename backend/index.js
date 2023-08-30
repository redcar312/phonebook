const express = require('express')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())
app.use(express.static('dist'))
let persons = [
      { 
        "name": "Arto Hellas", 
        "number": "040-123456",
        "id": 1
      },
      { 
        "name": "Ada Lovelace", 
        "number": "39-44-5323523",
        "id": 2
      },
      { 
        "name": "Dan Abramov", 
        "number": "12-43-234345",
        "id": 3
      },
      { 
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122",
        "id": 4
      }
    ]
  

  const generateId = () => {
    const maxId = persons.length > 0 ?
    Math.max(...persons.map(person => person.id)):
    0
    return maxId + 1  
  }  
  app.get('/api/persons', (req, res) => {
    res.json(persons)
  })

  app.get("/api/persons/:id", (req, res) => {
    const id = req.params.id
    const foundUser = persons.find(person => person.id == id)
    if(foundUser) {
        res.status(200).json(foundUser)
    } else {
        res.status(404).end()
    }
  })

app.delete("/api/persons/:id", (req, res) => {
    const id = req.params.id
    
    persons = persons.filter(person => person.id != id)
    res.status(204).end()

})

app.post("/api/persons", (req, res) => {
    const body = req.body
    const foundUser = persons.find(person => person.name.toLowerCase() === body.name.toLowerCase())
    if(!body.number || !body.name) {
      return res.status(400).json({
        error: 'Please insert both name and number'
      })
    } else if(foundUser){
      return res.status(400).json({
        error:'a user whit that name already exists'
      })
    } else {
      const personObj = {
        name: body.name,
        number: body.number,
        id: generateId()
      }
      persons = [...persons, personObj]
      res.json(personObj)
    }
})
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})