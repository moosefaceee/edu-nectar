import express from 'express'
import bodyParser from 'body-parser'
import { connect } from 'mongoose'
import { TestRouter } from './routes/index.js'

const { json } = bodyParser
const app = express()
const port = 3000
const mongoUri = process.env.MONGO_URI

// Parse JSON request body
app.use(json())
app.use((_, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  next()
})

// Connect to MongoDB
connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

app.use('/test', TestRouter)

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
