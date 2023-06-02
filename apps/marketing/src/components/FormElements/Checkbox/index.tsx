import {
  Checkbox as ChakraCheckbox,
  CheckboxProps,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  Text
} from '@chakra-ui/react'
import * as React from 'react'
import { Controller, useFormContext } from 'react-hook-form'

type CheckBoxProps = CheckboxProps & {
  helperText?: string
  id: string
  isDisabled?: boolean
  isRequired?: boolean
  label?: string
  name: string
  renderLabel?: () => React.ReactNode
  textStyle?: string
}

function CheckBox({
  helperText,
  id,
  isDisabled,
  isRequired,
  label,
  name,
  renderLabel,
  textStyle,
  ...rest
}: CheckBoxProps) {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value, ref }, fieldState: { error } }) => {
        // checkbox should show error when there is an error message
        const showError = !!error?.message

        return (
          <FormControl
            isInvalid={showError}
            isDisabled={isDisabled}
            id={id}
            isRequired={isRequired}
            display="flex"
            width="auto"
          >
            <ChakraCheckbox {...rest} ref={ref} onChange={onChange} isChecked={value}>
              {renderLabel ? renderLabel() : <Text textStyle={textStyle}>{label}</Text>}
            </ChakraCheckbox>
            {/* It is important that the Label comes after the Control due to css selectors */}
            {helperText && <FormHelperText>{helperText}</FormHelperText>}
            <FormErrorMessage>{error?.message}</FormErrorMessage>
          </FormControl>
        )
      }}
    />
  )
}

export default CheckBox

CheckBox.defaultProps = {
  isRequired: false,
  isDisabled: false
}
