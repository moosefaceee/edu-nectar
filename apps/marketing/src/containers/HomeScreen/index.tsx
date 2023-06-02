import { Stack, Text } from '@chakra-ui/react'

function HomeScreen(): React.ReactElement {
  return (
    <Stack flexDirection="column" paddingX={20} paddingY={4}>
      <Text
        textStyle="h4"
        fontWeight="600"
        color="black"
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
    </Stack>
  )
}

export default HomeScreen
