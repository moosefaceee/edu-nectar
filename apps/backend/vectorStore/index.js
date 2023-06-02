import { OpenAI } from 'langchain/llms/openai'
import { HNSWLib } from 'langchain/vectorstores/hnswlib'
import { OpenAIEmbeddings } from 'langchain/embeddings/openai'
import { PDFLoader } from 'langchain/document_loaders/fs/pdf'
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter'
import { VectorStoreToolkit, createVectorStoreAgent } from 'langchain/agents'

export class VectorStore {
  model
  agent

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
    const toolkit = new VectorStoreToolkit(vectorStoreInfo, this.model)
    this.agent = createVectorStoreAgent(this.model, toolkit)

    console.log('initialization completed')
  }

  async askForTopics() {
    const input =
      'Summarize this into 5 topics. Provide the answer in the following object format: [{topic: "name of topic1"}, {topic: "name of topic2"}]'
    console.log(`Executing: ${input}`)

    const result = await this.agent.call({ input })
    console.log(`Got output ${result.output}`)
    console.log(
      `Got intermediate steps ${JSON.stringify(
        result.intermediateSteps,
        null,
        2
      )}`
    )
    return result
  }
}
