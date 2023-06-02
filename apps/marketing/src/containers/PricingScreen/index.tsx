import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure
} from '@chakra-ui/react'
import HexagonBox from '../../components/HexagonBox'
import { CheckIcon } from '@chakra-ui/icons'
import { theme } from '../../theme'
import { useState } from 'react'

function PricingScreen(): React.ReactElement {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [currentTier, setCurrentTier] = useState<Tier>()

  const selectTier = (tier: Tier) => {
    setCurrentTier(tier)
    onOpen()
  }
  type Tier = {
    tierName: string
    setUp: string
    monthly: string
    annual: string
    noOfEmployees: string
    description: string
  }
  const tiers: Tier[] = [
    {
      tierName: 'Small',
      noOfEmployees: '100-1000',
      setUp: 'R50,000.00',
      monthly: 'R16,666.67',
      annual: 'R200,000.00',
      description:
        'This plan will be suitable for small organizations with a limited number of employees. It will provide essential features and functionalities required for effective internal upskilling. Pricing will be structured to accommodate the budget constraints of small businesses while delivering significant value and benefits.'
    },
    {
      tierName: 'Medium',
      noOfEmployees: '1000-5000',
      setUp: 'R75,000.00',
      monthly: 'R29,166.67',
      annual: 'R350,000.00',
      description:
        'Designed for medium-sized organizations with a moderately sized workforce, this plan will offer additional features and enhanced capabilities to support more extensive internal upskilling initiatives. The pricing will reflect the increased scale and requirements of medium-sized businesses, ensuring they receive a comprehensive solution that meets their needs.'
    },
    {
      tierName: 'Enterprise',
      noOfEmployees: '5000+',
      setUp: 'R100,000.00',
      monthly: 'R41,666.67',
      annual: 'R500,000.00',
      description:
        'Tailored to large corporations with a substantial number of employees and complex upskilling requirements, the enterprise plan will provide advanced features, analytics, personalized learning pathways, and priority customer support. Pricing for this plan will be customized based on the specific needs and scale of the organization, ensuring they receive a robust solution capable of supporting their enterprise-wide upskilling efforts.'
    }
  ]
  return (
    <Stack flexDirection="column" paddingX={20} paddingY={4} width="100%">
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent backgroundColor={theme.colors.brand[600]}>
          <ModalHeader color={theme.colors.brand[200]} textAlign={'center'} fontWeight={'bold'} fontSize={'3xl'}>{currentTier?.tierName}</ModalHeader>
          <ModalBody>
            <Text>
              {currentTier?.description}
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme={'yellow'} mr={3}>
              Select
            </Button>
            <Button variant="ghost" onClick={onClose}>Okay</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {['monthly', 'anual'].map((timePeriod) => (
        <Stack key={timePeriod}>
          <Text fontSize={'4xl'} align={'center'} color={theme.colors.brand[800]} mt="3rem" fontWeight={'bold'}>
            {timePeriod === 'monthly' ? 'Monthly' : null}
            {timePeriod === 'anual' ? 'Annual' : null}
          </Text>
          <Stack
            flexDirection={['column', 'column', 'row']}
            align={'center'}
            width="100%"
            justify={'center'}
          >
            {tiers.map((tier) => (
              <Stack mt={['3.5rem', '3.5rem', 0]} key={tier.tierName}>
                <HexagonBox onClick={() => selectTier(tier)}>
                  <>
                    <Text textAlign={'center'} fontWeight={'extrabold'} fontSize={'2xl'} color={theme.colors.brand[700]}>
                      {tier.tierName}
                    </Text>
                    <Text textAlign={'center'} fontWeight={'bold'}>
                      {timePeriod === 'monthly' ? tier.monthly : null}
                      {timePeriod === 'anual' ? tier.annual : null}
                    </Text>
                    <Text fontSize={'sm'} align={'center'}>
                      <CheckIcon
                        mr="0.2rem"
                        borderRadius={'100%'}
                        backgroundColor={'green'}
                        p={'2px'}
                      />
                      {tier.noOfEmployees} employees
                    </Text>
                    <Text textAlign={'center'} fontSize={'xs'}>
                      setup tier - {tier.setUp}
                    </Text>
                  </>
                </HexagonBox>
              </Stack>
            ))}
          </Stack>
        </Stack>
      ))}
    </Stack>
  )
}

export default PricingScreen
