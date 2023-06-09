import {
  Avatar,
  Box,
  Container,
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue
} from '@chakra-ui/react'
import { faker } from '@faker-js/faker'
import { ReactNode } from 'react'

const Testimonial = ({ children }: { children: ReactNode }) => {
  return <Box>{children}</Box>
}

const TestimonialContent = ({ children }: { children: ReactNode }) => {
  return (
    <Stack
      bg={useColorModeValue('white', 'gray.800')}
      boxShadow={'lg'}
      p={8}
      rounded={'xl'}
      align={'center'}
      pos={'relative'}
      _after={{
        content: `""`,
        w: 0,
        h: 0,
        borderLeft: 'solid transparent',
        borderLeftWidth: 16,
        borderRight: 'solid transparent',
        borderRightWidth: 16,
        borderTop: 'solid',
        borderTopWidth: 16,
        borderTopColor: useColorModeValue('white', 'gray.800'),
        pos: 'absolute',
        bottom: '-16px',
        left: '50%',
        transform: 'translateX(-50%)'
      }}
    >
      {children}
    </Stack>
  )
}

const TestimonialHeading = ({ children }: { children: ReactNode }) => {
  return (
    <Heading as={'h3'} fontSize={'xl'}>
      {children}
    </Heading>
  )
}

const TestimonialText = ({ children }: { children: ReactNode }) => {
  return (
    <Text textAlign={'center'} color="gray.400" fontSize={'sm'}>
      {children}
    </Text>
  )
}

const TestimonialAvatar = ({ src, name, title }: { src: string; name: string; title: string }) => {
  return (
    <Flex align={'center'} mt={8} direction={'column'}>
      <Avatar src={src} mb={2} />
      <Stack spacing={-1} align={'center'}>
        <Text fontWeight={600} color="black">
          {name}
        </Text>
        <Text fontSize={'sm'} color="black">
          {title}
        </Text>
      </Stack>
    </Flex>
  )
}

export default function WithSpeechBubbles() {
  return (
    <Box bg="brand.100">
      <Container maxW={'7xl'} pb={16} as={Stack} spacing={12}>
        <Stack spacing={0} align={'center'}>
          <Heading color="black">Our Results Speak For Themselves</Heading>
          <Text color="black">We have been working with clients around the world.</Text>
        </Stack>
        <Stack direction={{ base: 'column', md: 'row' }} spacing={{ base: 10, md: 4, lg: 10 }}>
          <Testimonial>
            <TestimonialContent>
              <TestimonialHeading>Efficient Collaborating</TestimonialHeading>
              <TestimonialText>
                I wanted to leave a glowing review for the EduNectar education service that created
                customised lesson plans for me over the past few months. The lesson plans were
                tailored to my comapnies needs, learning pace, and interests. The topics were highly
                engaging and the content was high quality.
              </TestimonialText>
            </TestimonialContent>
            <TestimonialAvatar
              src={faker.image.cats()}
              name={faker.name.findName()}
              title={faker.company.name()}
            />
          </Testimonial>
          <Testimonial>
            <TestimonialContent>
              <TestimonialHeading>Intuitive Design</TestimonialHeading>
              <TestimonialText>
                Thank you for igniting my love of learning - you have a customer for life! Overall
                an extremely worthwhile investment in myself and my education. Keep up the amazing,
                impactful work!
              </TestimonialText>
            </TestimonialContent>
            <TestimonialAvatar
              src={faker.image.business()}
              name={faker.name.findName()}
              title={faker.company.name()}
            />
          </Testimonial>
          <Testimonial>
            <TestimonialContent>
              <TestimonialHeading>Mindblowing Service</TestimonialHeading>
              <TestimonialText>
                Once my company offered this platform to us as a resource for up-skilling, I
                rediscovered the joy of learning and pushed myself to progress with a new skill.
                Being able to apply what I have learnt in my current and future jobs has been
                incredibly beneficial.
              </TestimonialText>
            </TestimonialContent>
            <TestimonialAvatar
              src={faker.image.fashion()}
              name={faker.name.findName()}
              title={faker.company.name()}
            />
          </Testimonial>
        </Stack>
      </Container>
    </Box>
  )
}
