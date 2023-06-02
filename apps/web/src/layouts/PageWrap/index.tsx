import { Flex, FlexProps } from '@chakra-ui/react'
import { Helmet } from 'react-helmet-async'
import { Outlet } from 'react-router-dom'

type PageWrapProps = FlexProps & {
  title: string
}

function PageWrap({ children, title, ...rest }: PageWrapProps) {
  return (
    <>
      <Helmet title={title} />
      <Flex bgColor="brand.100" as="main" {...rest}>
        {children}
        <Outlet />
      </Flex>
    </>
  )
}

export default PageWrap

PageWrap.defaultProps = {
  minHeight: '100vh' // minus height of GuestNavbar or Navbar,
}
