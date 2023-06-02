import { Stack, Text } from '@chakra-ui/react'
import { useQuery, useQueryClient } from 'react-query'
import { useAuth } from '../../context/AuthProvider'
import { getLearningPaths } from '../../queries'

function DashboardScreen(): React.ReactElement {
  const { user } = useAuth()
  // Access the client
  const queryClient = useQueryClient()

  // Queries
  const { data: learningPaths, isLoading, error } = useQuery('todos', getLearningPaths)

  if (isLoading) return <Text>Loading...</Text>

  console.log('learningPaths', learningPaths)
  // if (error) return <Text>An error has occurred: ${error.message}</Text>

  return (
    <Stack flexDirection="column" padding={4}>
      <Text color="black" textStyle="h5">
        Welcome, {user}!
      </Text>
      <Text color="black" textStyle="h5">
        Topics
      </Text>
    </Stack>
  )
}

export default DashboardScreen
