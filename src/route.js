import express from 'express'
import user from './user/endpoint.js'

const app = express()

app.use('/api', user)

export default app
