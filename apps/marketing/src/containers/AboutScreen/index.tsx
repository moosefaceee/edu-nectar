import { Stack, Text, Flex, Image } from '@chakra-ui/react'
import HeaderLogo  from '../../components/HeaderLogo'
import images from '../../theme/images'

export default function AboutScreen(): React.ReactElement {
  return (
    <Stack flexDirection="column" paddingX={20} paddingY={4} width="100%">
      <Flex justifyContent="center" mb={1}>
        <HeaderLogo />
      </Flex>
      <Flex alignContent="center" flexDirection="column">
        <Text
          textStyle="h4"
          fontWeight="600"
          color="brand.900"
          paddingX="20vw"
          paddingTop={12}
          textAlign="center"
        >
          Who Are We?
        </Text>
        <Text paddingX="20vw" paddingTop={12} textAlign="center" color="brand.900">
          Our company is a technology-driven startup focused on transforming education through
          innovative digital solutions. We will develop a web-based platform accessible via desktop
          and mobile devices. Our platform will incorporate cutting-edge features such as virtual
          classrooms, interactive lesson planning, progress tracking, communication tools, and a
          vast library of educational resources.
        </Text>
        <Flex width="100%" justifyContent="center">
          <Image width={500} height="auto" src={images.people} />
        </Flex>
      </Flex>
    </Stack>
  )
}
