import { OpenAI } from 'langchain/llms/openai'
import { HNSWLib } from 'langchain/vectorstores/hnswlib'
import { OpenAIEmbeddings } from 'langchain/embeddings/openai'
import { PDFLoader } from 'langchain/document_loaders/fs/pdf'
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter'
import { RetrievalQAChain } from 'langchain/chains'

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
    const vectorStoreInfo = {
      name: 'warehouse management',
      description: 'a complete guide for retailers',
      vectorStore,
    }

    console.log('here')

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
      console.log(text)
      console.log(JSON.parse(sanitizeResult(text)))

      return text
    } catch (error) {
      console.log(error)
      return { error: error }
    }
  }

  async askForQuestions() {
    const example = [
      {
        question: 'your first question',
        answers: [
          { answer: 'answer1', isCorrect: 'true' },
          { answer: 'answer2', isCorrect: 'true' },
        ],
      },
    ]
    const query = `Write three questions for a reader to test their knowledge about the topic, the questions should have at least 3 possible plausible answers with one being correct. Your answer should be in JSON format in the following shape: ${JSON.stringify(
      example
    )}`
    // "write a summary about the following topic: 'Arranging your warehouse'.   "
    // 'Summarize this into 5 topics. Provide the answer in the following object format: [{topic: "name of topic1"}, {topic: "name of topic2"}]'
    console.log(`Executing: ${query}`)
    try {
      const { text } = await this.chain.call({
        query,
      })
      console.log(text)
      console.log(JSON.parse(sanitizeResult(text)))

      return text
    } catch (error) {
      console.log(error)
      return { error: error }
    }
  }
  async askForSummary() {
    const example = [
      {
        summary: [{ paragraph: 'your first paragraph' }],
      },
    ]
    const query = `Write a summary about the topic 'Receiving and managing new stock', the summary should have at least 2 paragraphs. Your answer should be in JSON format in the following shape: ${JSON.stringify(
      example
    )}`
    // "write a summary about the following topic: 'Arranging your warehouse'.   "
    // 'Summarize this into 5 topics. Provide the answer in the following object format: [{topic: "name of topic1"}, {topic: "name of topic2"}]'
    console.log(`Executing: ${query}`)
    try {
      const { text } = await this.chain.call({
        query,
      })
      console.log(text)
      console.log(JSON.parse(sanitizeResult(text)))

      return text
    } catch (error) {
      console.log(error)
      return { error: error }
    }
  }
}
