/* eslint-disable camelcase */
import { handleResponse, capitalizeFirstChar } from '../helpers/util.js'
import UserModel from './model.js'

class UserServices {
  static async create(req, res) {
    const {
      first_name, last_name, username, date_of_birth
    } = req.body

    const user = {
      firstName: capitalizeFirstChar(first_name.toLowerCase()),
      lastName: capitalizeFirstChar(last_name.toLowerCase()),
      username: username.toLowerCase(),
      dob: date_of_birth
    }

    await UserModel.create(user, async (err, data) => {
      if (err) {
        console.error('Error', err.message)
        return handleResponse(res, 400, 'Unable to create user')
      }
      const userDetail = data.toObject()
      userDetail.name_prefix = (userDetail.firstName[0] + userDetail.lastName[0]).toUpperCase()
      delete userDetail._id
      delete userDetail.__v

      return handleResponse(res, 201, 'User created successful', userDetail)
    })
  }

  static async getAllUsers(req, res) {
    const users = await UserModel.find({}, {__v: 0, _id: 0}, async (err) => {
      if (err) {
        return handleResponse(res, 500, 'Unable to fetch Users', [])
      }
    }).clone()
    return handleResponse(res, 200, 'Users fetched successful', users)
  }

  static async deleteUser(req, res) {
    const { username } = req.body
    await UserModel.deleteOne({ username }).clone()
    return handleResponse(res, 200, 'User deleted successfully')
  }
}

export default UserServices
