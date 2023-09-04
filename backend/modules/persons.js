const mongoose = require('mongoose')
require('dotenv').config()


mongoose.connect(process.env.MONGO_URI)
.then(res => {
  console.log('connected')
}).catch((err) => {
  console.log(err.message)
}) 


const personSchema = new mongoose.Schema ({
    name: String,
    number:String,
   
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
}
)




module.exports = mongoose.model('Person', personSchema)
