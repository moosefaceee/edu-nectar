import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'

import {
  Box,
  Center,
  Flex,
  Image,
  Stack,
  Text,
  VStack
} from '@chakra-ui/react'

import beeline from '../../assets/images/beeline.svg'
import beeLoader from '../../assets/lotties/bee-loader.json'
import {
  HexagonCard,
  Lottie
} from '../../components'
import { HexagonContainer } from '../../components/HexagonCard'
import { getTopics } from '../../queries'

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
        <Flex width="100%" justifyContent="center" flex={1} height="500px">
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
        </Flex>
      </VStack>
    </Stack>
  )
}

export default TopicsScreen
