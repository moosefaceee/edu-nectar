import { Schema, model } from 'mongoose'

const AnswerSchema = new Schema({
  answer: {
    type: String,
    required: true,
  },
  isCorrect: {
    type: Boolean,
    required: true,
  },
})

const QuestionSchema = new Schema({
  question: {
    type: String,
    required: true,
  },
  answers: {
    type: [AnswerSchema],
    required: true,
  },
})

const QuizSchema = new Schema({
  topic: {
    type: String,
    required: true,
  },
  questions: {
    type: [QuestionSchema],
    required: true,
  },
})

export default model('Quiz', QuizSchema)
