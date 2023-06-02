import { Schema, model } from 'mongoose'

const ParagraphSchema = new Schema({
  paragraph: {
    type: String,
    required: true,
  },
})

const SummarySchema = new Schema({
  topic: {
    type: String,
    required: true,
  },
  summary: {
    type: [ParagraphSchema],
    required: true,
  },
})

export default model('Summary', SummarySchema)
