import { useEffect, useMemo, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useLocation, useParams } from 'react-router-dom'

import {
  Box,
  Button,
  Card,
  Center,
  Flex,
  HStack,
  Image,
  Spinner,
  Stack,
  Text,
  VStack
} from '@chakra-ui/react'

import beeline from '../../assets/images/beeline.svg'
import beeLoader from '../../assets/lotties/bee-loader.json'
import { Lottie } from '../../components'
import { ConnectedRadioGroup, MessageInput } from '../../components/FormElements'
import { getUserResponse } from '../../queries'
import { useQuiz, useSummary } from '../../hooks'
import { Conversation } from '../../types'

function LessonScreen(): React.ReactElement {
  const [renderQuiz, setRenderQuiz] = useState<boolean>(false)
  const [conversation, setConversation] = useState<Conversation>([])
  const [responseIsLoading, setResponseIsLoading] = useState(false)

  const params = useParams()
  const topicId = useMemo(() => params?.id || '', [params])
  const location = useLocation()
  const topic = useMemo(() => location.state?.topic || '', [location])

  const { summary, isLoading: summaryIsLoading } = useSummary(topicId)
  const { questions, isLoading: quizIsLoading } = useQuiz(topicId)

  //set conversation
  useEffect(() => {
    if (summary?.length) {
      setConversation([{ text: summary.map(({ paragraph }) => paragraph) }])
    }
  }, [summary])

  let methods = useForm({
    defaultValues: { userInput: '' }
  })

  const onSubmit = ({ userInput }: { userInput: string }) => {
    setConversation((prev) => [...prev, { text: [userInput], isUser: true }])
    setResponseIsLoading(true)
    getUserResponse({
      topic: topic,
      question: userInput,
      reply: ''
    })
      .then((data) => {
        setConversation((prev) => [...prev, { text: [data.data.response] }])
      })
      .finally(() => setResponseIsLoading(false))

    methods.reset({ userInput: '' })
  }

  let quizMethods = useForm({
    defaultValues: { answer: '' }
  })

  const [markQuiz, setMarkQuiz] = useState(false)
  const quizOnSubmit = (data: any) => {
    setMarkQuiz(true)
  }

  useEffect(() => {
    if (renderQuiz) {
      window.scrollTo(0, document.body.scrollHeight)
    }
  }, [renderQuiz])

  const onClickRenderQuiz = () => {
    if (renderQuiz) {
      setRenderQuiz(false)
    } else {
      setRenderQuiz(true)
    }
  }

  if (summaryIsLoading && !summary?.length)
    return (
      <Center flex={1}>
        <Box height="150px" width="150px">
          <Lottie animationData={beeLoader} />
        </Box>
      </Center>
    )

  return (
    <Stack flexDirection="column" padding={6} width="100%" paddingTop={12}>
      <Flex width="100%" height="100%" flexDir={'column'}>
        <Flex
          width="100%"
          alignItems="left"
          flexDirection="column"
          textAlign="left"
          maxWidth="650px"
          mb={10}
        >
          <Text color="black" textStyle="h2" fontWeight="600">
            {topic}
          </Text>
        </Flex>
        <VStack width="100%" justifyContent="flex-start" height="100%">
          {conversation &&
            conversation.map((item, idx1) => {
              return (
                <Card
                  key={`conversation-${topicId}-${idx1}`}
                  width="90%"
                  padding={6}
                  backgroundColor="whiteAlpha.600"
                  justifyContent="flex-start"
                  alignSelf={item?.isUser ? 'flex-end' : 'flex-start'}
                >
                  <Stack direction={'column'}>
                    {item.text.map((paragraph, idx2) => (
                      <Text
                        key={`paragraph-${topicId}-${idx1}-${idx2}`}
                        textAlign={item?.isUser ? 'right' : 'left'}
                        color="black"
                        fontWeight="500"
                      >
                        {paragraph}
                      </Text>
                    ))}
                  </Stack>
                </Card>
              )
            })}
          {responseIsLoading ? (
            <Center w="100%">
              <Spinner my={2} />
            </Center>
          ) : null}
        </VStack>
        <HStack width="100%" alignItems="center" justifyContent="center" mt={10}>
          <FormProvider {...methods}>
            <MessageInput name="userInput" onClickSend={methods.handleSubmit(onSubmit)} />
            <Button bg="brand.800" _hover={{ bg: 'brand.700' }} onClick={onClickRenderQuiz}>
              {renderQuiz ? 'Hide Quiz' : 'Start Quiz'}
            </Button>
          </FormProvider>
        </HStack>
      </Flex>
      {renderQuiz && !quizIsLoading && (
        <VStack width="100%" height="100%" spacing={6} marginTop={8}>
          <Flex
            width="100%"
            alignItems="center"
            flexDirection="column"
            textAlign="center"
            maxWidth="450px"
          >
            <Stack flexDir={'row'}>
              <Text color="black" textStyle="h2" fontWeight="600">
                Quiz
              </Text>
              <Image src={beeline} width="3.5rem" />
            </Stack>
          </Flex>
          <FormProvider {...quizMethods}>
            <VStack width="100%" justifyContent="flex-start" height="100%" spacing={4}>
              <Card
                width="100%"
                padding={6}
                justifyContent="flex-start"
                backgroundColor="whiteAlpha.600"
              >
                {questions &&
                  questions.map((question: any, index: number) => {
                    const answers = question?.answers

                    const options = answers?.map((answer: any) => {
                      return { label: answer?.answer, value: answer?.answer }
                    })
                    const [correctAnswer] = answers.filter((answer: any) => answer.isCorrect)
                    console.log(correctAnswer)
                    return (
                      <Box marginTop={6}>
                        <Text textAlign="center" color="black" fontWeight="500" marginBottom={4}>
                          {question.question}
                        </Text>
                        {options && (
                          <ConnectedRadioGroup
                            isMarked={markQuiz}
                            name={`answer-${index}`}
                            options={options}
                            correctAnswer={correctAnswer}
                          />
                        )}
                      </Box>
                    )
                  })}
              </Card>
              <Flex width="100%" alignItems="center" justifyContent="flex-end">
                <Button
                  bgColor="gray.800"
                  _hover={{ bgColor: 'gray.700' }}
                  onClick={quizMethods.handleSubmit(quizOnSubmit)}
                >
                  Submit
                </Button>
              </Flex>
            </VStack>
          </FormProvider>
        </VStack>
      )}
    </Stack>
  )
}

export default LessonScreen
