import express from 'express'
import validateBody from './validator.js'
import { validate } from '../helpers/util.js'
import UserServices from './services.js'

const router = express.Router()

router.post(
  '/user',
  validateBody.create,
  validate,
  UserServices.create
)

router.get(
  '/users',
  UserServices.getAllUsers
)

router.delete(
  '/user',
  validateBody.delete,
  validate,
  UserServices.deleteUser
)

export default router