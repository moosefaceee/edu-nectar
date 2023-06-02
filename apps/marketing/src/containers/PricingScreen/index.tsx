import { Stack, Text } from '@chakra-ui/react'
import HexagonBox from '../../components/HexagonBox'

function PricingScreen(): React.ReactElement {
  return (
    <Stack flexDirection="column" paddingX={20} paddingY={4}>
      <Stack flexDirection="row">
        <HexagonBox title="R13.48">
          <Text>The thing</Text>
        </HexagonBox>
      </Stack>
    </Stack>
  )
}

export default PricingScreen
