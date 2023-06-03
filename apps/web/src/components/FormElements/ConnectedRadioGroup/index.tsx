import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  Radio,
  RadioGroup,
  RadioGroupProps,
  Stack,
  Text
} from '@chakra-ui/react'
import { useEffect } from 'react'
import { FieldPath, FieldValues, useController, useFormContext } from 'react-hook-form'

export type RadioOption = {
  tooltip?: string
  additionalLabel?: string
  label: string
  value: string
}

interface ConnectedRadioGroupProps extends Omit<RadioGroupProps, 'children'> {
  name: FieldPath<FieldValues>
  spacing?: number
  options: RadioOption[]
  correctAnswer: any
  isMarked: boolean
  onChangeCallback?: (value: string) => void
}

const ConnectedRadioGroup = ({
  name,
  spacing,
  options,
  onChangeCallback,
  correctAnswer,
  isMarked,
  ...rest
}: ConnectedRadioGroupProps) => {
  const { control } = useFormContext()

  const {
    fieldState: { error },
    field
  } = useController({
    name,
    control
  })

  const errorMessage = error?.message

  const showError = !!errorMessage

  const fieldValue = field.value

  const defaultValue = rest.defaultValue

  useEffect(() => {
    if (defaultValue) {
      field.onChange(defaultValue)
    }
  }, [defaultValue])

  return (
    <FormControl isInvalid={showError}>
      <RadioGroup {...field} {...rest}>
        <Stack spacing={spacing}>
          {options.map(({ label, value, additionalLabel, tooltip }) => {
            const isCorrect = correctAnswer.answer === label
            const color = isMarked ? (isCorrect ? 'green' : 'red') : 'black'
            return (
              <Flex
                justifyContent="space-between"
                key={value}
                onClick={() => {
                  field.onChange(value)
                  onChangeCallback?.(value)
                }}
                cursor="pointer"
                color={color}
              >
                <Box key={value} onClick={() => field.onChange(value)} cursor="pointer">
                  <Radio key={value} value={value} colorScheme="black" borderColor="black">
                    {label}
                  </Radio>
                  {additionalLabel && (
                    <Text color="black" marginLeft={6}>
                      {additionalLabel}
                    </Text>
                  )}
                </Box>
              </Flex>
            )
          })}
        </Stack>
      </RadioGroup>
      {showError && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
    </FormControl>
  )
}

export default ConnectedRadioGroup
