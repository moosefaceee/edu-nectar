import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  IconButton,
  Input,
  InputGroup,
  InputProps,
  InputRightElement
} from '@chakra-ui/react'
import { ReactElement } from 'react'
import { FieldPath, FieldValues, useController, useFormContext } from 'react-hook-form'
import { FiSend } from 'react-icons/fi'

type MessageInputProps = InputProps & {
  label?: string
  name: FieldPath<FieldValues>
  helperText?: string // keep it short and sweet!
  rightIcon?: ReactElement
  onClickSend?: () => void
}

function MessageInput({
  name,
  helperText,
  label,
  rightIcon,
  onClickSend,
  ...rest
}: MessageInputProps): ReactElement {
  const { control } = useFormContext()

  const { fieldState, field } = useController({
    name,
    control
  })

  const showError = fieldState.isDirty && !!fieldState.error

  return (
    <FormControl {...fieldState} isInvalid={showError}>
      <InputGroup>
        <Input
          bg="white"
          color="black"
          {...field}
          _focus={{ borderColor: 'brand.500', boxShadow: 'none' }}
          {...rest}
          marginBottom={0}
        />
        <InputRightElement>
          <IconButton aria-label="send" icon={<FiSend color="black" />} onClick={onClickSend} />
        </InputRightElement>
      </InputGroup>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
      {showError && <FormErrorMessage>{fieldState.error?.message}</FormErrorMessage>}
    </FormControl>
  )
}

export default MessageInput

MessageInput.defaultProps = {}
