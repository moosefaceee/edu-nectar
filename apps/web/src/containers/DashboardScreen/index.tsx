import { Stack, Text } from '@chakra-ui/react'
import { useQuery } from 'react-query'
import { useAuth } from '../../context/AuthProvider'
import { getLearningPaths } from '../../queries'

function DashboardScreen(): React.ReactElement {
  const { user } = useAuth()

  // Queries
  const { data: learningPaths, isLoading, error } = useQuery('learningPaths', getLearningPaths)

  if (isLoading) return <Text>Loading...</Text>

  console.log('learningPaths', learningPaths)

  return (
    <Stack flexDirection="column" padding={4}>
      <Text color="black" textStyle="h5">
        Welcome back, {user}!
      </Text>
      <Text color="black" textStyle="h3">
        Topics
      </Text>
    </Stack>
  )
}

export default DashboardScreen
