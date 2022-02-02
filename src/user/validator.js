import { check, param } from 'express-validator'
import UserModel from './model.js'

const validateBody = {
  create: [
    check('first_name')
      .not()
      .isEmpty()
      .withMessage('first_name must not be empty')
      .trim()
      .isLength({ max: 256 })
      .withMessage('first_name must not be longer than 256'),
    check('last_name')
      .not()
      .isEmpty()
      .withMessage('last_name must not be empty')
      .trim()
      .isLength({ max: 256 })
      .withMessage('last_name must not be longer than 256'),
    check('username')
      .trim()
      .not()
      .isEmpty()
      .withMessage('username must not be empty')
      .isLength({ max: 50 })
      .withMessage('username must not be longer than 50 characters')
      .custom(async (username) => {
        const existingUser = await UserModel.findOne({
          username
        })
        if (existingUser) {
          throw new Error('User already in exist')
        }
      }),
    check('date_of_birth')
      .not()
      .isEmpty()
      .withMessage('date_of_birth must not be empty')
      .trim()
      .matches(/^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/)
      .withMessage('date_of_birth must be in DD-MM-YYYY format'),
  ],
  delete: [
    check('username')
      .trim()
      .not()
      .isEmpty()
      .withMessage('username must not be empty')
      .custom(async (username) => {
        const existingUser = await UserModel.findOne({
          username
        })
        if (!existingUser) {
          throw new Error('The user you are trying to delete does not exist')
        }
      })
  ]
}

export default validateBody
