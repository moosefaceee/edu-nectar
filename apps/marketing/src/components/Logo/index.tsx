import { Box, Image, ImageProps } from '@chakra-ui/react'
import { ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthProvider'
import images from '../../theme/images'

function Logo({ ...rest }: ImageProps): ReactElement {
  let { isAuthenticated } = useAuth()
  let navigate = useNavigate()

  return (
    <Box onClick={() => navigate(isAuthenticated ? '/auth/dashboard' : '/')} cursor="pointer">
      <Image {...rest} src={images.sovtech} />
    </Box>
  )
}

export default Logo

Logo.defaultProps = {
  width: 175,
  height: 'auto'
}
