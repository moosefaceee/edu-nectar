import { Box, Button, Card, Center, Flex, Stack, Text, VStack } from '@chakra-ui/react'
import { FormProvider, useForm } from 'react-hook-form'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import beeLoader from '../../assets/lotties/bee-loader.json'
import { Lottie } from '../../components'
import { ConnectedRadioGroup } from '../../components/FormElements'
import { getQuiz } from '../../queries'

function QuizScreen(): React.ReactElement {
  const navigate = useNavigate()

  const { data, isLoading } = useQuery('quiz', getQuiz)

  const parsed = data?.data && JSON.parse(data.data)[0]

  const question = parsed?.question
  const answers = parsed?.answers
  const options = answers?.map((answer: any) => {
    return { label: answer?.answer, value: answer?.answer }
  })

  console.log('options', options)

  let methods = useForm({
    defaultValues: { answer: '' }
  })

  const onSubmit = (data: any) => {
    console.log('data', data)
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
            Quiz
          </Text>
        </Flex>
        <FormProvider {...methods}>
          <VStack width="100%" justifyContent="flex-start" height="100%" spacing={4}>
            <Card width="100%" padding={6} backgroundColor="brand.100" justifyContent="flex-start">
              <Text textAlign="center" color="black" fontWeight="500" marginBottom={4}>
                {question}
              </Text>
              <ConnectedRadioGroup name="answer" options={options} />
            </Card>
            <Flex width="100%" alignItems="center" justifyContent="flex-end">
              <Button
                bgColor="gray.800"
                _hover={{ bgColor: 'gray.700' }}
                onClick={methods.handleSubmit(onSubmit)}
              >
                Submit
              </Button>
            </Flex>
          </VStack>
        </FormProvider>
      </VStack>
    </Stack>
  )
}

export default QuizScreen
