import { Flex, FlexProps } from '@chakra-ui/react'
import { Helmet } from 'react-helmet-async'
import { Outlet } from 'react-router-dom'
import { Footer } from '../../components'

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
      <Footer />
    </>
  )
}

export default PageWrap

PageWrap.defaultProps = {
  minHeight: 'calc(100vh - 4rem)' // minus height of GuestNavbar or Navbar,
}
