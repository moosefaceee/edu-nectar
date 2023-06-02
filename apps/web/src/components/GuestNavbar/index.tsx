import { Divider, Flex, Stack } from '@chakra-ui/react'
import { NavLink, Outlet } from 'react-router-dom'
import { Logo } from '..'

function GuestNavbar() {
  return (
    <>
      <Flex
        alignItems="center"
        as="header"
        backgroundColor="gray.800"
        justifyContent="space-between"
        paddingX={8}
      >
        <Logo />
        <Flex height={16} alignItems="center" justifyContent="flex-end" as="nav">
          <Stack direction="row" spacing={6} alignItems="center">
            <NavLink to="/home">Home</NavLink>
            <NavLink to="/about">About</NavLink>
          </Stack>
        </Flex>
      </Flex>
      <Divider borderColor="gray.500" />
      <Outlet />
    </>
  )
}

export default GuestNavbar