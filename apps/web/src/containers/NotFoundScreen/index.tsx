import { Stack, Text } from '@chakra-ui/react'

function NotFoundScreen(): React.ReactElement {
  return (
    <Stack flexDirection="column" padding={4}>
      <Text textStyle="h5">
        Oops! This page doesn't exist, or you don't have permissions to view it 🤦🏼
      </Text>
    </Stack>
  )
}

export default NotFoundScreen
