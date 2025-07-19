const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('connecting to', url)
mongoose.connect(url)
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch(error => {
        console.log('error connecting to MongoDB:', error.message)
    })

const phoneNumberValidator = {
  validator: function (value) {
    // Regular expression explanation:
    // ^        -> Start of string
    // \d{2,3}  -> Exactly 2 or 3 digits
    // -        -> Literal hyphen
    // \d+      -> One or more digits
    // $        -> End of string
    // .length === 8 ensures total string length
    return /^\d{2,3}-\d+$/.test(value) && value.length > 7;
  },
  message: props => `${props.value} is not a valid phone number. It must be at least 8 characters and in the format like "12-345678" or "123-4567890".`
};


const personSchema = new mongoose.Schema({
    id: String,
    name: {
        type: String,
        minLength: 3,
        required: true
    },
    number:{
    type: String,
    validate: phoneNumberValidator,
    required: true
  }

})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)