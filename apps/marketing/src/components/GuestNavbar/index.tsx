import { Button, Divider, Flex, Stack, Image } from '@chakra-ui/react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import images from '../../theme/images'

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
        <Flex height={16} alignItems="center" justifyContent="space-between" as="nav" width="100%">
          <NavLink style={{ color: 'black' }} to="/">
            <Image src={images.africaLogo} width={30} height={30} />
          </NavLink>
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
          <Button
            as={Link}
            to="https://edu-nectar-web.onrender.com/"
            bgColor="gray.800"
            fontWeight="500"
            width={150}
          >
            Login
          </Button>
        </Flex>
      </Flex>
      <Divider borderColor="brand.500" />
      <Outlet />
    </>
  )
}

export default GuestNavbar
