import { Box, Image, Text } from '@chakra-ui/react'
import images from '../../theme/images'

export default function HeaderLogo() {

  return (
    <Box display='flex'>
      <Image src={images.sovtech} />
      <Box marginTop={170}
        marginLeft={-200}
      >
        <Text color='brand.800' fontSize={16} fontWeight={600}>Education, the Nectar of Success.</Text>
        <Text color='brand.800' fontSize={16} fontWeight={600}>Where Learning Flows Naturally</Text>
      </Box>
    </Box>
  )
}
