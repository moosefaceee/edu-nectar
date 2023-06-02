import express from 'express'
import bodyParser from 'body-parser'
import { connect } from 'mongoose'
import { TestRouter } from './routes/index.js'
import { VectorStore } from './vectorStore/index.js'
import { getTopics, submitQuestion } from './routes/vectorStore.js'

async function main() {
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

  // initialise vectorStore
  const vectorStore = new VectorStore()
  await vectorStore.initialise()

  app.get('/api', async function (_, res) {
    try {
      const result = await vectorStore.askForTopics()
      res.json(result)
    } catch (error) {
      res.status(500).json({ errorMessage: 'Failed to fetch ', error })
    }
  })
  app.use('/test', TestRouter)

  // Start the server
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
  })
}

main().catch((err) => console.log(err))
