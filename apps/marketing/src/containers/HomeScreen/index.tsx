import { Stack, Text } from '@chakra-ui/react'

function HomeScreen(): React.ReactElement {
  return (
    <Stack flexDirection="column" paddingX={20} paddingY={4}>
      <Text textStyle="h5">Welcome to Core Suite 👋🏼</Text>
    </Stack>
  )
}

export default HomeScreen
