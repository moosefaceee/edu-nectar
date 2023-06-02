import { Button, Divider, Flex, Stack } from '@chakra-ui/react'
import { Link, NavLink, Outlet } from 'react-router-dom'
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
        <Flex height={16} alignItems="center" justifyContent="center" as="nav" width="100%">
          <Stack direction="row" spacing={6} alignItems="center">
            <NavLink style={{ color: 'black' }} to="/about">
              About Us
            </NavLink>
            <NavLink style={{ color: 'black' }} to="/pricing">
              Pricing
            </NavLink>
            <NavLink style={{ color: 'black' }} to="/faq">
              FAQ
            </NavLink>
          </Stack>
        </Flex>
        <Button
          as={Link}
          to="https://www.derp.com"
          colorScheme="brand"
          fontWeight="500"
          width={150}
        >
          Login
        </Button>
      </Flex>
      <Divider borderColor="brand.500" />
      <Outlet />
    </>
  )
}

export default GuestNavbar
