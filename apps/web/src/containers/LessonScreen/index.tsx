import { Box, Button, Card, Center, Flex, HStack, Stack, Text, VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useQuery } from 'react-query'
import { useLocation, useParams } from 'react-router-dom'
import beeLoader from '../../assets/lotties/bee-loader.json'
import { Lottie } from '../../components'
import { ConnectedRadioGroup, MessageInput } from '../../components/FormElements'
import { getQuiz, getSummary } from '../../queries'

function LessonScreen(): React.ReactElement {
  const [renderQuiz, setRenderQuiz] = useState<boolean>(false)
  const [conversation, setConversation] = useState<any>([])

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
    const joined = conversation.concat({ paragraph: data.summary })

    setConversation(joined)

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
      <VStack width="100%" height="100%" spacing={6}>
        <Flex
          width="100%"
          alignItems="center"
          flexDirection="column"
          textAlign="center"
          maxWidth="450px"
        >
          <Text color="black" textStyle="h2" fontWeight="600" marginBottom={4}>
            {state}
          </Text>
        </Flex>
        <VStack width="100%" justifyContent="flex-start" height="100%">
          {conversation &&
            conversation.map((summary: any) => {
              return (
                <Card
                  width="100%"
                  padding={6}
                  backgroundColor="brand.100"
                  justifyContent="flex-start"
                >
                  <Text textAlign="center" color="black" fontWeight="500">
                    {summary.paragraph}
                  </Text>
                </Card>
              )
            })}
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
            <Text color="black" textStyle="h2" fontWeight="600">
              Quiz
            </Text>
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
                  questions.map((question: any) => {
                    const answers = question?.answers

                    const options = answers?.map((answer: any) => {
                      return { label: answer?.answer, value: answer?.answer }
                    })

                    return (
                      <Box marginTop={6}>
                        <Text textAlign="center" color="black" fontWeight="500" marginBottom={4}>
                          {question.question}
                        </Text>
                        {options && <ConnectedRadioGroup name="answer" options={options} />}
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
