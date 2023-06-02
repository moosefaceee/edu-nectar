import { Stack, Text } from '@chakra-ui/react'

function DashboardScreen(): React.ReactElement {
  return (
    <Stack flexDirection="column" padding={4}>
      <Text textStyle="h5">
        This is your dashboard, expect to see some metrics and graphs about your app 📈
      </Text>
    </Stack>
  )
}

export default DashboardScreen
