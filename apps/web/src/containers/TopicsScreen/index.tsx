import { Box, Card, Center, Flex, Grid, GridItem, Stack, Text, VStack } from '@chakra-ui/react'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import beeLoader from '../../assets/lotties/bee-loader.json'
import { HexagonCard, Lottie } from '../../components'
import { getTopics } from '../../queries'

function TopicsScreen(): React.ReactElement {
  const navigate = useNavigate()

  const { data, isLoading } = useQuery('topics', getTopics)

  const parsed = data?.data && JSON.parse(data.data)[0]

  const topics = parsed?.topics && parsed.topics.slice(0, 6)

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
            <VStack spacing={6} width="100%">
              <Grid templateRows="repeat(2, 1fr)" templateColumns="repeat(3, 1fr)" gap={20}>
                {topics.map((topic: any) => {
                  return (
                    <GridItem>
                      <HexagonCard
                        onClick={() =>
                          navigate(`/auth/lesson/${12345}`, {
                            state: {
                              topic: 'Topic One'
                            }
                          })
                        }
                        title={topic}
                      />
                    </GridItem>
                  )
                })}
              </Grid>
            </VStack>
          </Card>
          {/* <Image src={} /> */}
        </Flex>
      </VStack>
    </Stack>
  )
}

export default TopicsScreen
