import { Text } from '@chakra-ui/react'
import { ReactElement } from 'react'
import CheckBox from '../FormElements/Checkbox'

const renderLabel = () => {
  return <Text>Remember Me</Text>
}

function RememberMe(): ReactElement {
  return <CheckBox name="rememberMe" id="rememberMe" renderLabel={renderLabel} />
}

export default RememberMe

RememberMe.defaultProps = {}
