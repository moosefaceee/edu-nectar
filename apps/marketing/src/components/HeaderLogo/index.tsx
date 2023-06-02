import { Box, Image, Text } from '@chakra-ui/react'
import images from '../../theme/images'

export default function HeaderLogo() {

  return (
    <Box display='flex' position='absolute'>
      <Image src={images.sovtech} margin={0}/>
      <Box marginTop={170}
        position='absolute'
        left={240}
      >
        <Text color='brand.800' fontSize={16} fontWeight={500}>Education, the Nectar of Success.</Text>
        <Text color='brand.800' fontSize={16} fontWeight={500}>Where Learning Flows Naturally</Text>
      </Box>
    </Box>
  )
}
