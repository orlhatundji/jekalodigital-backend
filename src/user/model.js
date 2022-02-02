import pkg from 'mongoose'

const { Schema, model } = pkg

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  username: {
      type: String,
      required: true,
      unique: true
  },
  dob: {
      type: String,
      required: true
  },
})

const UserModel = model('User', userSchema)

export default UserModel
