import {
  useEffect,
  useState
} from 'react'

import {
  FormProvider,
  useForm
} from 'react-hook-form'
import { useQuery } from 'react-query'
import {
  useLocation,
  useParams
} from 'react-router-dom'

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
import {
  ConnectedRadioGroup,
  MessageInput
} from '../../components/FormElements'
import {
  getQuiz,
  getSummary,
  getUserResponse
} from '../../queries'

function LessonScreen(): React.ReactElement {
  const [renderQuiz, setRenderQuiz] = useState<boolean>(false)
  const [conversation, setConversation] = useState<any>([])
  const [responseIsLoading, setResponseIsLoading] = useState(false)

  const params = useParams()

  const location = useLocation()

  const state = location.state?.topic

  console.log('state', state)

  const { data: summaryData, isLoading } = useQuery(
    ['summary', { id: params?.id }],
    () => getSummary(params?.id || ''),
    {
      onSuccess: (data) => {
        const parsed = data?.data && data?.data[0]

        const summary = parsed?.summary && parsed.summary.slice(0, 6)

        setConversation(summary)
      }
    }
  )

  let methods = useForm({
    defaultValues: { summary: '' }
  })

  const onSubmit = (data: any) => {
    console.log('clicked')
    setConversation((prev: any) => [...prev, { paragraph: data.summary, isUser: true }])
    setResponseIsLoading(true)
    getUserResponse({
      topic: 'Optimizing Warehouse Layout',
      question: data.summary,
      reply: ''
    })
      .then((data) => {
        console.log(data)
        setConversation((prev: any) => [...prev, { paragraph: data.data.response }])
      })
      .finally(() => setResponseIsLoading(false))

    methods.reset({ summary: '' })
  }

  const { data } = useQuery(['quiz', { id: params?.id }], () => getQuiz(params?.id || ''))

  const parsed = data?.data && data?.data[0]
  console.log('parsed', parsed)

  const questions = parsed?.questions

  let quizMethods = useForm({
    defaultValues: { answer: '' }
  })

  const quizOnSubmit = (data: any) => {
    console.log('data', data)
    if (data.answer === 'Yes') {
    }
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

  if (isLoading)
    return (
      <Center flex={1}>
        <Box height="150px" width="150px">
          <Lottie animationData={beeLoader} />
        </Box>
      </Center>
    )

  return (
    <Stack flexDirection="column" padding={6} width="100%" paddingTop={12}>
      <VStack width="100%" height="100%">
        <Flex
          width="100%"
          alignItems="center"
          flexDirection="column"
          textAlign="center"
          maxWidth="450px"
        >
          <Text color="black" textStyle="h2" fontWeight="600">
            {state}
          </Text>
        </Flex>
        <VStack width="100%" justifyContent="flex-start" height="100%">
          {conversation &&
            conversation.map((summary: any) => {
              return (
                <Card
                  width="90%"
                  padding={6}
                  backgroundColor="whiteAlpha.600"
                  justifyContent="flex-start"
                  alignSelf={summary?.isUser ? 'flex-end' : 'flex-start'}
                >
                  <Text
                    textAlign={summary?.isUser ? 'right' : 'left'}
                    color="black"
                    fontWeight="500"
                  >
                    {summary.paragraph}
                  </Text>
                </Card>
              )
            })}
          {responseIsLoading ? (
            <Center w="100%">
              <Spinner my={2} />
            </Center>
          ) : null}
        </VStack>
        <HStack width="100%" alignItems="center" justifyContent="center">
          <FormProvider {...methods}>
            <MessageInput name="summary" onClickSend={methods.handleSubmit(onSubmit)} />
            <Button bg="brand.800" _hover={{ bg: 'brand.700' }} onClick={onClickRenderQuiz}>
              {renderQuiz ? 'Hide Quiz' : 'Start Quiz'}
            </Button>
          </FormProvider>
        </HStack>
      </VStack>
      {renderQuiz && (
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
                backgroundColor="brand.100"
                justifyContent="flex-start"
              >
                {questions &&
                  questions.map((question: any, index: number) => {
                    const answers = question?.answers

                    const options = answers?.map((answer: any) => {
                      return { label: answer?.answer, value: answer?.answer }
                    })

                    return (
                      <Box marginTop={6}>
                        <Text textAlign="center" color="black" fontWeight="500" marginBottom={4}>
                          {question.question}
                        </Text>
                        {options && (
                          <ConnectedRadioGroup name={`answer-${index}`} options={options} />
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
