import { Button, chakra, Flex, Text } from '@chakra-ui/react'
import { ReactElement } from 'react'
import CheckBox from '../FormElements/Checkbox'

function TermsConditionsInput(): ReactElement {
  return (
    <CheckBox
      name="termsAndConditions"
      id="termsAndConditions"
      renderLabel={() => (
        <Flex justifyContent="space-between" width="100%">
          <Text>
            <chakra.span>I accept the</chakra.span>
            <Button
              color="blue.400"
              fontWeight="normal"
              marginLeft={1}
              onClick={() => alert('Ts & Cs pdf needed')}
              variant="link"
            >
              Terms &amp; Conditions
            </Button>
          </Text>
        </Flex>
      )}
    />
  )
}

export default TermsConditionsInput

TermsConditionsInput.defaultProps = {
  flexDirection: 'column',
  justifyContent: 'flex-start',
  width: '100%'
}
