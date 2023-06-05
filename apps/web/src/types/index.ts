export type Topic = {
  _id: string
  topic: string
}
export type Topics = Topic[]

export type Paragraph = {
  _id: string
  paragraph: string
}
export type Summary = Paragraph[]

export type Conversation = {
  text: string[]
  isUser?: boolean
}[]
