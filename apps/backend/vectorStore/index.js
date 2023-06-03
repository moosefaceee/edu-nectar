import { OpenAI } from 'langchain/llms/openai'
import { HNSWLib } from 'langchain/vectorstores/hnswlib'
import { OpenAIEmbeddings } from 'langchain/embeddings/openai'
import { PDFLoader } from 'langchain/document_loaders/fs/pdf'
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter'
import { RetrievalQAChain } from 'langchain/chains'
import { QuizModel, SummaryModel, TopicsModel } from '../models/index.js'

function sanitizeResult(str) {
  if (
    (str.startsWith("'") && str.endsWith("'")) ||
    (str.startsWith('"') && str.endsWith('"'))
  ) {
    return str.slice(1, -1)
  }
  return str
}

export class VectorStore {
  model
  chain

  constructor() {
    this.model = new OpenAI({ temperature: 0.1 })
    console.log('constructed', this.model)
  }
  async initialise() {
    console.log('initialising...')
    const loader = new PDFLoader('documents/warehouse-management.pdf', {
      splitPages: false,
    })
    /* Load in the file we want to do question answering over */
    const document = await loader.load()

    const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000 })
    const docs = await textSplitter.createDocuments([
      document[0].pageContent.replaceAll('\n', ' '),
    ])

    /* Create the vectorstore */
    const vectorStore = await HNSWLib.fromDocuments(
      docs,
      new OpenAIEmbeddings()
    )

    /* Create the agent */

    this.chain = RetrievalQAChain.fromLLM(this.model, vectorStore.asRetriever())
    console.log('initialization completed')
  }
  async askForTopics() {
    const example = [
      {
        topics: [{ topic: 'topic1' }],
      },
    ]
    const query = `Summarise the document into topics. Your answer should be in JSON format in the following shape: ${JSON.stringify(
      example
    )}`
    console.log(`Executing: ${query}`)
    try {
      const { text } = await this.chain.call({
        query,
      })
      const cleanedData = JSON.parse(sanitizeResult(text))
      try {
        const topics = await TopicsModel.create(cleanedData)
        return topics
      } catch (error) {
        console.log('Failed to create topics record')
        console.log(error)
      }
    } catch (error) {
      console.log(error)
      return { error: error }
    }
  }

  async askForQuestions(topic) {
    const example = [
      {
        question: 'your first question',
        answers: [
          { answer: 'answer1', isCorrect: 'true' },
          { answer: 'answer2', isCorrect: 'true' },
        ],
      },
    ]
    const query = `Write three questions for a reader to test their knowledge on the topic '${
      topic.topic
    }', the questions should have at least 3 possible plausible answers with one being correct. Your answer should be in JSON format in the following shape: ${JSON.stringify(
      example
    )}`
    // "write a summary about the following topic: 'Arranging your warehouse'.   "
    // 'Summarize this into 5 topics. Provide the answer in the following object format: [{topic: "name of topic1"}, {topic: "name of topic2"}]'
    console.log(`Executing: ${query}`)
    try {
      const { text } = await this.chain.call({
        query,
      })
      const cleanedData = JSON.parse(sanitizeResult(text))
      try {
        const quiz = await QuizModel.create({
          topic: topic.id,
          questions: cleanedData,
        })
        return quiz
      } catch (error) {
        console.log('Failed to create quiz record')
        console.log(error)
      }
    } catch (error) {
      console.log(error)
      return { error: error }
    }
  }
  async askForSummary(topic) {
    const example = {
      summary: [{ paragraph: 'your first paragraph' }],
    }
    const query = `In less than 150 words, write a brief summary based on the topic '${
      topic.topic
    }', the summary should have at least 2 paragraphs and cover all the questions in your previous prompt to clearly show the user what the correct answers are. Your answer should be in JSON format in the following shape: ${JSON.stringify(
      example
    )}`
    // "write a summary about the following topic: 'Arranging your warehouse'.   "
    // 'Summarize this into 5 topics. Provide the answer in the following object format: [{topic: "name of topic1"}, {topic: "name of topic2"}]'
    console.log(`Executing: ${query}`)
    try {
      const { text } = await this.chain.call({
        query,
      })
      const cleanedData = JSON.parse(sanitizeResult(text))
      try {
        const summary = await SummaryModel.create({
          topic: topic.id,
          ...cleanedData,
        })
        return summary
      } catch (error) {
        console.log('Failed to create summary record')
        console.log(error)
      }
    } catch (error) {
      console.log(error)
      return { error: error }
    }
  }

  async answerUserResponse(topic, question, reply) {
    const query = reply
      ? `The user has responded to your answer: """${reply}""" with: """${question}""". You should only respond with your response to the user's question`
      : `A user has asked a question: """${question}""" on topic: """${topic}""" You should only respond with your response to the user's question`
    try {
      const { text } = await this.chain.call({
        query,
      })
      console.log(text)
      return text
    } catch (error) {
      console.log(error)
    }
  }
}
