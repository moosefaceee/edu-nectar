import { Router } from 'express'
import { TestModel } from '../models/index.js'

const router = new Router()
// Define routes

router.get('/api/topics', async (req, res) => {
  try {
    res.json(
      ' [{"topics":[{"topic":"Warehouse Management"},{"topic":"ABC Analysis"},{"topic":"Optimal Warehouse Arrangement"},{"topic":"Labelling"},{"topic":"Packing"},{"topic":"Integrations"},{"topic":"Reporting and Accountability"}]}]'
    )
  } catch (error) {
    res.status(500).json({ errorMessage: 'Failed to fetch ', error })
  }
})

router.get('/api/quiz', async (req, res) => {
  try {
    res.json(
      ' [{"question":"What is the recommended number of box size options for a typical retailer?","answers":[{"answer":"1","isCorrect":"false"},{"answer":"3-5","isCorrect":"true"},{"answer":"50","isCorrect":"false"}]},{"question":"What is the main factor to consider when choosing packaging material?","answers":[{"answer":"Cost","isCorrect":"false"},{"answer":"Protection","isCorrect":"true"},{"answer":"Weight","isCorrect":"true"}]},{"question":"What is the first step in optimising warehouse operations?","answers":[{"answer":"Arranging the warehouse","isCorrect":"true"},{"answer":"Improving KPIs","isCorrect":"false"},{"answer":"Replacing staff with software","isCorrect":"false"}]}]'
    )
  } catch (error) {
    res.status(500).json({ errorMessage: 'Failed to fetch ', error })
  }
})

router.get('/api/summary', async (req, res) => {
  try {
    res.json(
      ' [{"summary":[{"paragraph":"Receiving and managing new stock is a critical part of warehouse management. It is important to have enough space in the receiving area to temporarily house newly delivered stock without risk of damage and for the team to perform necessary tasks. It is also important to record relevant details such as exact timestamps of when new stock arrives and is put away, and to make sure it is dealt with as soon as possible. Additionally, stock levels should be correctly updated on each sales channel or inventory management system, and any necessary labelling or barcodes should be added before physically putting the stock away."},{"paragraph":"A mobile scanner device can make the booking in process much quicker and more accurate. It is also important to track KPIs such as receiving efficiency, rate of return, picking accuracy, and order lead time in order to measure the success of the warehouse management process."}]\n}]'
    )
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
