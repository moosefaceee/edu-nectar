import { Box, Card, Center, Flex, Grid, GridItem, Stack, Text, VStack } from '@chakra-ui/react'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import beeLoader from '../../assets/lotties/bee-loader.json'
import { HexagonCard, Lottie } from '../../components'
import { getTopics } from '../../queries'
import { HexagonContainer } from '../../components/HexagonCard'

function TopicsScreen(): React.ReactElement {
  const navigate = useNavigate()

  const { data, isLoading } = useQuery('topics', getTopics)

  const parsed = data?.data

  const topics = parsed && parsed[0].topics

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
        <Flex width="100%" alignItems="center" flexDirection="column" textAlign="center">
          <Text color="black" textStyle="h2" fontWeight="600" marginBottom={6}>
            Learning Topics
          </Text>
          <Box maxWidth={350} marginBottom={2}>
            <Text color="black" textStyle="h5">
              Welcome to EduNectar!
            </Text>
            <Text color="black" textStyle="h5">
              Select a topic and begin your learning journey.
            </Text>
          </Box>
        </Flex>
        <Flex width="100%" justifyContent="center" flex={1} height="500px">
          <Card width="100%" padding={6} backgroundColor="brand.100" height="550px">
            <HexagonContainer size={200} margin={2}>
              <Box className="container">
                {topics.map((topic: any) => {
                  return (
                    <HexagonCard
                      key={topic.id}
                      onClick={() =>
                        navigate(`/auth/lesson/${topic._id}`, {
                          state: {
                            topic: topic.topic
                          }
                        })
                      }
                      title={topic}
                    />
                  )
                })}
              </Box>
            </HexagonContainer>
          </Card>
        </Flex>
      </VStack>
    </Stack>
  )
}

export default TopicsScreen
