import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Stack,
  Text
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { TermsAndConditions } from '../../components'
import { useAuth } from '../../context/AuthProvider'
import { registerDefaultValues, registerSchema } from './Validation'

function RegisterScreen(): React.ReactElement {
  let { login } = useAuth()

  let [showPassword, setShowPassword] = useState(false)
  let navigate = useNavigate()

  let methods = useForm({
    defaultValues: registerDefaultValues,
    resolver: zodResolver(registerSchema)
  })

  function onSubmit() {
    // submit values, only log in with successful response.
    return login?.()
  }

  return (
    <Flex align="center" justify="center" flexDirection="column" flex={1}>
      <Stack spacing={8} marginX="auto" width="md" paddingX={6}>
        <Stack align="center">
          <Heading fontSize="4xl" textAlign="center">
            Sign up
          </Heading>
          <Text fontSize="lg" color="gray.400">
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box rounded="lg" bg="gray.700" boxShadow="lg" padding={8}>
          <FormProvider {...methods}>
            <Stack spacing={4}>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input type="email" />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input type={showPassword ? 'text' : 'password'} />
                  <InputRightElement height="fit-content">
                    <Button
                      variant="ghost"
                      onClick={() => setShowPassword((showPassword) => !showPassword)}
                    >
                      {showPassword ? <Icon as={FiEye} /> : <Icon as={FiEyeOff} />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <TermsAndConditions />
              <Stack spacing={6} paddingTop={2}>
                <Button
                  loadingText="Submitting"
                  size="lg"
                  backgroundColor="blue.400"
                  color="white"
                  _hover={{
                    backgroundColor: 'blue.500'
                  }}
                  onClick={methods.handleSubmit(onSubmit)}
                >
                  Sign up
                </Button>
              </Stack>
              <Stack paddingTop={4}>
                <Text alignItems="center">
                  Already a user?{' '}
                  <Link color="blue.400" onClick={() => navigate('/')}>
                    Login
                  </Link>
                </Text>
              </Stack>
            </Stack>
          </FormProvider>
        </Box>
      </Stack>
    </Flex>
  )
}

export default RegisterScreen
