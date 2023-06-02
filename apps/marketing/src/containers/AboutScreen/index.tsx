import { Image, Stack, Text } from '@chakra-ui/react'
import { ReactElement } from 'react'
import images from '../../theme/images'

function AboutScreen(): ReactElement {
  return (
    <Stack align="center" justify="center" flexDirection="column" flex={1}>
      <Image 
        boxSize={150}
        src={images.sovtech}
      />
    </Stack>
  )
}

export default AboutScreen
