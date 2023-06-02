import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  InputProps,
  InputRightElement
} from '@chakra-ui/react'
import { ReactElement, useState } from 'react'
import { FieldPath, FieldValues, useController, useFormContext } from 'react-hook-form'
import { FiEye, FiEyeOff } from 'react-icons/fi'

type PasswordInputProps = InputProps & {
  label?: string
  name: FieldPath<FieldValues>
  helperText?: string // keep it short and sweet!
  rightIcon?: ReactElement
}

function PasswordInput({
  name,
  helperText,
  label,
  rightIcon,
  ...rest
}: PasswordInputProps): ReactElement {
  const [passwordVisible, setPasswordVisible] = useState(false)

  const toggleVisible = () => setPasswordVisible(!passwordVisible)

  const { control } = useFormContext()

  const {
    fieldState: { isDirty, error },
    field
  } = useController({
    name,
    control
  })

  const showError = isDirty && error

  return (
    <FormControl {...rest}>
      <FormLabel color='black'>Password</FormLabel>
      <InputGroup>
        <Input {...field} _focus={{ borderColor: 'brand.500', boxShadow: 'none' }} type={passwordVisible ? 'text' : 'password'} />
        <InputRightElement alignItems="center">
          <Button
            onClick={toggleVisible}
            borderLeftWidth={0}
            borderTopLeftRadius={0}
            borderBottomLeftRadius={0}
            _invalid={{ borderColor: 'red' }}
            _focus={{ borderColor: 'brand.500' }}
            _hover={{ backgroundColor: 'brand.500' }}
          >
            {passwordVisible ? (
              <Icon as={FiEye} width={20} color="brand.500" />
            ) : (
              <Icon as={FiEyeOff} width={20} color="brand.500" />
            )}
          </Button>
        </InputRightElement>
      </InputGroup>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
      {showError && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  )
}

export default PasswordInput

PasswordInput.defaultProps = {}
