const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const Person = require('./modules/persons')
require('dotenv').config()
const app = express()
app.use(express.static('dist'))
app.use(express.json())
app.use(cors())




mongoose.connect(process.env.MONGO_URI)
.then(res => {
  console.log('connected')
}).catch((err) => {
  console.log(err.message)
}) 





   

  app.get('/api/persons', async (req, res, next) => {
    
    try {
    const people = await Person.find()
    res.json(people)
    } catch(err) {
      res.status(500).end()
    }
  })

  app.get("/api/persons/:id",async (req, res) => {
    try{
    const id = req.params.id
    const foundUser = await Person.findById(id)
    if(foundUser) {
        res.status(200).json(foundUser)
    } else {
        res.status(404).json({error: "user not found"})
    }

  } catch(err) {
    res.status(500).end()
  }
  })

app.delete("/api/persons/:id", async (req, res) => {
    
  try{
  const id = req.params.id
  await Person.findByIdAndDelete(id).then(result => {
    res.json({msg:"deleted"})
  })
    
   
  } catch(err){
    res.status(500).end()
  }
})

app.post("/api/persons", async (req, res, next) => {
    
  try {
  
    const body = req.body
    const foundUser = await Person.findOne({
      $or: [{name: body.name}, {name: body.name.toLowerCase()}]
    })
    
    
    
    if(!body.number || !body.name) {
      return res.status(400).json({
        error: 'Please insert both name and number'
      })
    } else if(foundUser){
      return res.status(400).json({error: "user already exists"})
    } else {
     

      const newUser =  new Person({
        name: body.name,
        number: body.number,
      
      })
      await newUser.save().then(result => {
        res.json(newUser)
       
      }).catch(error => next(error))
    
    }
  } catch (err) {
    res.status(500).end()
  }
  
})


app.put("/api/persons/:id", async (req, res, next) => {
  
  try{
  const body = req.body
  const foundUser =  Person.findById(body.id)
  if(!foundUser) {
      return res.status(404).end()
  } else if(!body.name || !body.number){
      return res.status(400).json({error: "insert both name and number"})
  } else {
      await Person.findByIdAndUpdate(req.params.id, {
      name: body.name,
      number: body.number
     }, {new:true}).then(result => {
      
      
      res.status(200).json(result)
     })
    


  }

  } catch(err) {
    res.status(500).end()
  }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})