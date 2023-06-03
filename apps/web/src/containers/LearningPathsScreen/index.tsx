import { Box, Card, Flex, Grid, Stack, Text, VStack } from '@chakra-ui/react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { HexagonCard } from '../../components'

function LearningPathsScreen(): React.ReactElement {
  const params = useParams()
  const id = params?.id
  console.log('id', id)

  const location = useLocation()
  const topic = location?.state?.topic
  console.log('location', location?.state?.topic)

  const navigate = useNavigate()

  // Queries
  // const { data: learningPaths, isLoading, error } = useQuery('learningPaths', getLearningPaths)

  // if (isLoading) return <Text>Loading...</Text>

  // console.log('learningPaths', learningPaths)

  return (
    <Stack flexDirection="column" padding={6} width="100%">
      <VStack width="100%" height="100%" spacing={6}>
        <Flex width="100%" alignItems="center" flexDirection="column" textAlign="center">
          <Text color="black" textStyle="h2" fontWeight="600" marginBottom={6}>
            Learning Paths
          </Text>
          <Box maxWidth={350} marginBottom={2}>
            <Text color="black" textStyle="h5">
              Pick your learning path below.
            </Text>
          </Box>
        </Flex>
        <Flex width="100%" justifyContent="flex-start" height="100%">
          <Card
            width="100%"
            padding={6}
            backgroundColor="brand.100"
            height="650px"
            justifyContent="flex-start"
          >
            <VStack spacing={6} width="100%">
              <Grid templateRows="repeat(2, 1fr)" templateColumns="repeat(3, 1fr)" gap={20}>
                {['one', 'two', 'three', 'four', 'five', 'six'].map((topic) => (
                  <HexagonCard
                    onClick={() => navigate(`/auth/lesson/${12345}`)}
                    title={{ topic: '' }}
                  />
                ))}
              </Grid>
            </VStack>
          </Card>
        </Flex>
      </VStack>
    </Stack>
  )
}

export default LearningPathsScreen
