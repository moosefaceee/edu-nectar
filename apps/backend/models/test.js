import { Schema, model } from 'mongoose'

const testSchema = Schema({
  text: { type: String, required: true },
})

export default model('Test', testSchema)
