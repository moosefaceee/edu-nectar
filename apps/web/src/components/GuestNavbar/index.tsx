import { Divider, Flex, Stack } from '@chakra-ui/react'
import { NavLink, Outlet } from 'react-router-dom'
import { Logo } from '..'

function GuestNavbar() {
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
          <Stack direction="row" spacing={6} alignItems="center">
            <NavLink style={{ color: 'black' }} to="/home">
              Home
            </NavLink>
            <NavLink style={{ color: 'black' }} to="/">
              Login
            </NavLink>
          </Stack>
        </Flex>
      </Flex>
      <Divider borderColor="brand.500" />
      <Outlet />
    </>
  )
}

export default GuestNavbar
