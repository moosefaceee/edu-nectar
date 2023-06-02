import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputProps,
  InputRightElement
} from '@chakra-ui/react'
import { ReactElement } from 'react'
import { FieldPath, FieldValues, useController, useFormContext } from 'react-hook-form'

type TextInputProps = InputProps & {
  label?: string
  name: FieldPath<FieldValues>
  helperText?: string // keep it short and sweet!
  rightIcon?: ReactElement
}

function TextInput({ name, helperText, label, rightIcon, ...rest }: TextInputProps): ReactElement {
  const { control } = useFormContext()

  const { fieldState, field } = useController({
    name,
    control
  })

  const showError = fieldState.isDirty && !!fieldState.error

  return (
    <FormControl {...fieldState} isInvalid={showError}>
      <FormLabel>{label}</FormLabel>
      <InputGroup>
        <Input {...field} {...rest} />
        {rightIcon && <InputRightElement>{rightIcon}</InputRightElement>}
      </InputGroup>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
      {showError && <FormErrorMessage>{fieldState.error?.message}</FormErrorMessage>}
    </FormControl>
  )
}

export default TextInput

TextInput.defaultProps = {}
