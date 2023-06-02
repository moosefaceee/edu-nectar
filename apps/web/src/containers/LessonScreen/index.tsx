import { Box, Button, Card, Center, Flex, HStack, Stack, Text, VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import beeLoader from '../../assets/lotties/bee-loader.json'
import { Lottie } from '../../components'
import { ConnectedRadioGroup, MessageInput } from '../../components/FormElements'
import { getQuiz, getSummary } from '../../queries'

function LessonScreen(): React.ReactElement {
  const [renderQuiz, setRenderQuiz] = useState<boolean>(false)
  const [conversation, setConversation] = useState<any>([])

  const navigate = useNavigate()

  const { isLoading } = useQuery('summary', getSummary, {
    onSuccess: (data) => {
      const parsed = data?.data && JSON.parse(data.data)[0]

      const summary = parsed?.summary && parsed.summary.slice(0, 6)

      setConversation(summary)
    }
  })

  let methods = useForm({
    defaultValues: { summary: '' }
  })

  const onSubmit = (data: any) => {
    const joined = conversation.concat({ paragraph: data.summary })

    setConversation(joined)

    methods.reset({ summary: '' })
  }

  const { data } = useQuery('quiz', getQuiz)

  const parsed = data?.data && JSON.parse(data.data)[0]

  const question = parsed?.question

  const answers = parsed?.answers

  console.log('answers', answers)

  const options = answers?.map((answer: any) => {
    return { label: answer?.answer, value: answer?.answer }
  })

  console.log('options', options)

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
            What is warehouse management?
          </Text>
        </Flex>
        <VStack width="100%" justifyContent="flex-start" height="100%">
          {conversation.map((summary: any) => {
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
                <Text textAlign="center" color="black" fontWeight="500" marginBottom={4}>
                  {question}
                </Text>
                <ConnectedRadioGroup name="answer" options={options} />
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
