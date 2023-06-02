import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Stack,
  Text
} from '@chakra-ui/react'

function FAQScreen(): React.ReactElement {
  type QandA = {
    question: string
    answer: string
  }
  const QandAs: QandA[] = [
    {
      question: 'How can I make use of EduNectar?',
      answer:
        'Once registered, users will be able to read through the AI generated content as well as answer questions about that content to consilodate their knowledge. '
    },
    {
      question: 'Who can make use of this application?',
      answer:
        'Professionals working in a corporation who wish to upskill or improve on their knowledge.'
    },
    {
      question: 'How long do I have access to the learning material?',
      answer:
        'Upon subscribing businesses have the option to choose either a monthly or yearly subscription. Until cancellation this subscription will auto-renew and users will have constant access to the learning material'
    },
    {
      question: 'How do I get access to the learning material?',
      answer:
        'Once subscribed, the user can go on the learning portal where they can choose from a variety of topics to learn'
    },

    {
      question: 'How long do the courses take?',
      answer:
        'This is entirely dependant how large the document is that the user wishes to study and how fast the user works. This can be anywhere between 2 and 6 hours.'
    }
  ]
  return (
    <Stack
      flexDirection="column"
      paddingX={20}
      paddingY={4}
      color="black"
      width="100%"
      pt="3rem"
      align={'center'}
    >
      <Accordion width={'100%'}>
        {QandAs.map((qanda) => (
          <AccordionItem key={qanda.question}>
            <Text>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left" fontWeight={'bold'}>
                  {qanda.question}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </Text>
            <AccordionPanel pb={4} fontWeight={'light'}>
              {qanda.answer}
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </Stack>
  )
}

export default FAQScreen
