import { Flex, Image, Stack, Text } from '@chakra-ui/react'
import { ContactUs, Testimonials } from '../../components'
import images from '../../theme/images'
import HeaderLogo from '../../components/HeaderLogo'

function HomeScreen(): React.ReactElement {
  return (
    <Stack flexDirection="column" paddingX={20} paddingY={4}>
      <Flex width="100%" justifyContent="center" mb={1}>
      <HeaderLogo />
      </Flex>
      <Text
        textStyle="h4"
        fontWeight="600"
        color="brand.900"
        paddingX="20vw"
        paddingTop={12}
        textAlign="center"
      >
        Our company is a technology-driven startup focused on transforming education through
        innovative digital solutions. We will develop a web-based platform accessible via desktop
        and mobile devices. Our platform will incorporate cutting-edge features such as virtual
        classrooms, interactive lesson planning, progress tracking, communication tools, and a vast
        library of educational resources.
      </Text>
      <Flex width="100%" justifyContent="center">
        <Image width={500} height="auto" src={images.people} />
      </Flex>
      <Testimonials />
      <ContactUs />
    </Stack>
  )
}

export default HomeScreen
