import express from 'express'
import bodyParser from 'body-parser'
import { connect } from 'mongoose'
import { TestRouter } from './routes/index.js'
import { VectorStore } from './vectorStore/index.js'
import { QuizModel, SummaryModel, TopicsModel } from './models/index.js'

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

  app.get('/api/generate', async function (_, res) {
    try {
      const topicsResult = await vectorStore.askForTopics()

      const { topics } = topicsResult[0]
      console.log(topics)
      if (topics.length) {
        for await (const topic of topics) {
          console.log(`Current topic: ${topic.topic}`)
          console.log('Asking for questions...')
          await vectorStore.askForQuestions(topic)
          console.log('Asking for summary...')
          await vectorStore.askForSummary(topic)
        }
        console.log('Done ✅')
        res.status(200)
      }
    } catch (error) {
      res.status(500).json({ errorMessage: 'Failed to generate', error })
    }
  })

  app.get('/api/quiz/:id', async function (req, res) {
    try {
      const result = await QuizModel.find({ topic: req.params.id })
      console.log(result)
      res.json(result)
    } catch (error) {
      console.log(error)
      res.status(500).json({ errorMessage: 'Failed to fetch ', error })
    }
  })
  app.get('/api/summary/:id', async function (req, res) {
    try {
      const result = await SummaryModel.find({ topic: req.params.id })
      res.json(result)
    } catch (error) {
      console.log(error)
      res.status(500).json({ errorMessage: 'Failed to fetch ', error })
    }
  })

  app.get('/api/topics', async function (_, res) {
    try {
      const result = await TopicsModel.find({})
      res.json(result)
    } catch (error) {
      console.log(error)
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
