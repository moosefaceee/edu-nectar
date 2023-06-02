import {
  Avatar,
  Center,
  Divider,
  Flex,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Spacer,
  Stack,
  Text,
  VStack
} from '@chakra-ui/react'
import { faker } from '@faker-js/faker'
import { FiUser } from 'react-icons/fi'
import { Outlet } from 'react-router-dom'
import { Logo } from '..'
import { useAuth } from '../../context/AuthProvider'

function Navbar() {
  let { user } = useAuth()

  return (
    <>
      <Flex
        alignItems="center"
        as="header"
        backgroundColor="brand.100"
        justifyContent="space-between"
        paddingX={8}
      >
        <Logo />
        <Flex height={16} alignItems="center" justifyContent="flex-end" as="nav">
          <Flex alignItems="center">
            <Stack direction="row" spacing={6}>
              <Menu colorScheme="brand">
                <MenuButton
                  as={IconButton}
                  cursor="pointer"
                  colorScheme="brand"
                  variant="solid"
                  borderWidth={1}
                  borderColor="black"
                >
                  <Icon as={FiUser} />
                </MenuButton>
                <MenuList alignItems="center" bgColor="brand.500">
                  <VStack>
                    <Spacer />
                    <Spacer />
                    <Center>
                      <Avatar size="xl" src={faker.image.cats()} />
                    </Center>
                    <Center>
                      <Text>{user}</Text>
                    </Center>
                    <Spacer />
                  </VStack>
                  <MenuDivider />
                  <MenuItem bgColor="brand.500" _hover={{ bgColor: 'brand.400' }}>
                    Your Assessments
                  </MenuItem>
                  <MenuItem bgColor="brand.500" _hover={{ bgColor: 'brand.400' }}>
                    Account Settings
                  </MenuItem>
                  <MenuItem bgColor="brand.500" _hover={{ bgColor: 'brand.400' }}>
                    Logout
                  </MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Flex>
      <Divider borderColor="brand.500" />
      <Outlet />
    </>
  )
}

export default Navbar
