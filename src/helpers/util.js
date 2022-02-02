import { validationResult } from 'express-validator'
import dot from 'dotenv'

dot.config()

export const handleResponse = (res, statusCode, message, data, token) => res.status(statusCode).json({
  message,
  data,
  token
})

export const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

  return res.status(422).json({
    errors: extractedErrors
  })
}

export const filterNullProp = (obj) => {
  if (!obj || !typeof obj === 'object') return {}
  Object.keys(obj).forEach((key) => {
    if (obj[key] === null || obj[key] === undefined) {
      delete obj[key]
    }
  })
  return obj
}

export const capitalizeFirstChar = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}