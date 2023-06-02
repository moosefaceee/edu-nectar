import { Box, Card, Center, Flex, Grid, GridItem, Stack, Text, VStack } from '@chakra-ui/react'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import beeLoader from '../../assets/lotties/bee-loader.json'
import { HexagonCard, Lottie } from '../../components'
import { useAuth } from '../../context/AuthProvider'
import { getLearningPaths } from '../../queries'

const topics = [
  {
    topic: 'Topic Name',
    learningPaths: [
      {
        learningPath: 'Learning Path Name'
      },
      {
        learningPath: 'Another Learning Path Name'
      }
    ]
  },
  {
    topic: 'Another Topic Name',
    learningPaths: [
      {
        learningPath: 'Learning Path Name'
      },
      {
        learningPath: 'Another Learning Path Name'
      }
    ]
  },
  {
    topic: 'Yet Another Topic Name, Yet Another Topic Name?',
    learningPaths: [
      {
        learningPath: 'Learning Path Name'
      },
      {
        learningPath: 'Another Learning Path Name'
      }
    ]
  }
]

function TopicsScreen(): React.ReactElement {
  const navigate = useNavigate()

  const { user } = useAuth()

  // Queries
  const { data: learningPaths, isLoading, error } = useQuery('learningPaths', getLearningPaths)

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
        <Flex width="100%" justifyContent="center" flex={1} height="650px">
          <Card width="100%" padding={6} backgroundColor="brand.100" height="100%">
            <VStack spacing={6} width="100%">
              <Grid templateRows="repeat(2, 1fr)" templateColumns="repeat(3, 1fr)" gap={20}>
                {topics.map((topic) => (
                  <GridItem>
                    <HexagonCard
                      onClick={() =>
                        navigate(`/auth/lesson/${12345}`, {
                          state: {
                            topic: 'Topic One'
                          }
                        })
                      }
                      title={topic.topic}
                    />
                  </GridItem>
                ))}
              </Grid>
            </VStack>
          </Card>
        </Flex>
      </VStack>
    </Stack>
  )
}

export default TopicsScreen
