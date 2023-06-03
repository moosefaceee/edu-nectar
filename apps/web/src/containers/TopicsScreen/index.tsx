import {
  Box,
  Card,
  Center,
  Flex,
  Grid,
  GridItem,
  Stack,
  Text,
  VStack,
  Image
} from '@chakra-ui/react'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import beeLoader from '../../assets/lotties/bee-loader.json'
import beeline from '../../assets/images/beeline.svg'
import { HexagonCard, Lottie } from '../../components'
import { getTopics } from '../../queries'
import { theme } from '../../../theme'

function TopicsScreen(): React.ReactElement {
  const navigate = useNavigate()

  const { data, isLoading } = useQuery('topics', getTopics)

  const parsed = data?.data

  const topics = parsed && parsed[0].topics.slice(0, 6)

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
          <Image src={beeline} width={'5rem'} />

          <Box maxWidth={350} marginBottom={2}>
                <Text color="black" textStyle="h5">
                  Welcome to EduNectar!
                </Text>

                <Text color="black" textStyle="h5">
                  Select a topic and begin your learning journey.
                </Text>
          </Box>
        </Flex>
        <Flex width="100%" justifyContent="center" flex={1} height="500px" flexDir={'column'}>
          <Card width="100%" padding={6} backgroundColor="brand.100" height="550px" background={theme.colors.brand[300]}>
            <VStack spacing={6} width="100%">
              <Grid templateRows="repeat(2, 1fr)" templateColumns="repeat(3, 1fr)" gap={20}>
                {topics.map((topic: any) => {
                  return (
                    <GridItem>
                      <HexagonCard
                        onClick={() =>
                          navigate(`/auth/lesson/${topic._id}`, {
                            state: {
                              topic: topic.topic
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
        </Flex>
      </VStack>
    </Stack>
  )
}

export default TopicsScreen
