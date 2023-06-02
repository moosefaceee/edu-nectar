import { Router } from 'express'
import { TestModel } from '../models/index.js'

const router = new Router()
// Define routes
router.get('/', async (req, res) => {
  // Fetch all
  try {
    const result = await TestModel.find({})
    res.json(result)
  } catch (error) {
    res.status(500).json({ errorMessage: 'Failed to fetch ', error })
  }
})

router.post('/', async (req, res) => {
  // Create
  try {
    console.log({ body: req.body })
    await TestModel.create({ text: req.body.text })
    res.status(200).json({ success: 'Successfully created test' })
  } catch (error) {
    res.status(500).json({ errorMessage: 'Failed to create test', error })
  }
})

router.put('/:id', async (req, res) => {
  // Update

  try {
    const updatedTestModel = await TestModel.findByIdAndUpdate(
      req.params.id,
      {
        text: req.body.text,
      },
      { new: true }
    )
    res.json(updatedTestModel)
  } catch (error) {
    console.log(error)
    res.status(500).json({ errorMessage: 'Failed to update the test', error })
  }
})

router.delete('/:id', async (req, res) => {
  // Delete
  try {
    await TestModel.findByIdAndRemove(req.params.id)
    res.sendStatus(204)
  } catch (error) {
    console.log(error)
    res.status(500).json({ errorMessage: 'Failed to delete the test', error })
  }
})

export default router
