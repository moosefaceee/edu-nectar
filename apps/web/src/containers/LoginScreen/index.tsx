import { Box, Button, Flex, Heading, Link, Stack, Text } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { RememberMe } from '../../components'
import { PasswordInput, TextInput } from '../../components/FormElements'
import { useAuth } from '../../context/AuthProvider'
import { loginDefaultValues, loginSchema } from './Validation'

function LoginScreen(): React.ReactElement {
  let { login } = useAuth()
  let navigate = useNavigate()

  let methods = useForm({
    defaultValues: loginDefaultValues,
    resolver: zodResolver(loginSchema)
  })

  function onSubmit() {
    // submit values, only log in with successful response.
    return login?.()
  }

  return (
    <Flex align="center" justify="center" flexDirection="column" flex={1}>
      <Stack spacing={8} mx="auto" width="md" paddingX={6}>
        <Stack align="center">
          <Heading fontSize="4xl" color="brand.800">
            Sign in to your account
          </Heading>
          <Text fontSize="lg" color="brand.600">
            Education, the nectar of success 📚
          </Text>
        </Stack>
        <Box rounded="lg" bg="brand.400" boxShadow="lg" padding={8}>
          <FormProvider {...methods}>
            <Stack spacing={4}>
              <TextInput label="Email address" name="email" type="email" />
              <PasswordInput label="Passowrd" name="password" />
              <Stack spacing={6}>
                <Stack direction="row" alignItems="center" justify="space-between">
                  <RememberMe />
                  <Link color="brand.800">Forgot password?</Link>
                </Stack>
                <Button
                  backgroundColor="gray.800"
                  _hover={{ backgroundColor: 'gray.700' }}
                  loadingText="Submitting"
                  size="lg"
                  // colorScheme="brand"
                  onClick={methods.handleSubmit(onSubmit)}
                >
                  Sign in
                </Button>
              </Stack>
              <Stack paddingTop={2}>
                <Text alignItems="center">
                  Don't have an account? <Link color="brand.800">Signup</Link>
                </Text>
              </Stack>
            </Stack>
          </FormProvider>
        </Box>
      </Stack>
    </Flex>
  )
}

export default LoginScreen
