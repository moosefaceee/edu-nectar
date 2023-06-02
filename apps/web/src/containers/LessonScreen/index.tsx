import { Card, Flex, Stack, Text, VStack } from '@chakra-ui/react'
import { useLocation, useParams } from 'react-router-dom'

function LessonScreen(): React.ReactElement {
  const params = useParams()
  const id = params?.id

  const location = useLocation()
  const topic = location?.state?.topic

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
        <Flex width="100%" justifyContent="flex-start" height="100%">
          <Card
            width="100%"
            padding={6}
            backgroundColor="brand.100"
            height="650px"
            justifyContent="flex-start"
          >
            <Text textAlign="center" color="black" fontWeight="500">
              In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to
              demonstrate the visual form of a document or a typeface without relying on meaningful
              content. Lorem ipsum may be used as a placeholder before final copy is available. It
              is also used to temporarily replace text in a process called greeking, which allows
              designers to consider the form of a webpage or publication, without the meaning of the
              text influencing the design. <br />
              <br /> Lorem ipsum is typically a corrupted version of De finibus bonorum et malorum,
              a 1st-century BC text by the Roman statesman and philosopher Cicero, with words
              altered, added, and removed to make it nonsensical and improper Latin. The first two
              words themselves are a truncation of 'dolorem ipsum' ('pain itself').
            </Text>
          </Card>
        </Flex>
      </VStack>
    </Stack>
  )
}

export default LessonScreen
