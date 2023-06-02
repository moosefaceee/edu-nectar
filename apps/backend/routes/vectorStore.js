/**
 * WIP:to be moved ASAP
 */

import { Router } from 'express'

export function getTopics(askForTopics) {
  const router = new Router()
  // Define routes
  router.get('/', async (_, res) => {
    // Fetch all
    askForTopics()
    try {
      res.json(result)
    } catch (error) {
      res.status(500).json({ errorMessage: 'Failed to fetch ', error })
    }
  })

  return router
}

export function submitQuestion(askQuestion) {
  const router = new Router()
  router.post('/', async (req, res) => {
    // Create
    try {
      const result = await askQuestion(req.body.question)
      res.status(200).json({ result })
    } catch (error) {
      res.status(500).json({ errorMessage: 'Failed to create test', error })
    }
  })

  return router
}
