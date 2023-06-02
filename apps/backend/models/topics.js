import { Schema, model } from 'mongoose'

const TopicSchema = new Schema({
  topic: {
    type: String,
    required: true,
  },
})

const TopicsSchema = new Schema({
  topics: {
    type: [TopicSchema],
    required: true,
  },
})

export default model('Topics', TopicsSchema)
