import { Box } from '@chakra-ui/react'
import styled from '@emotion/styled'
import { Outlet } from 'react-router-dom'
import { theme } from '../../theme'

const Wrapper = styled.div`
  .wrapper {
    display: grid;
    grid-template-columns:
      1fr
      min(90ch, calc(100% - 64px))
      1fr;
    background-color: ${theme.colors.brand[100]};
  }
  .wrapper > * {
    grid-column: 2;
  }
  .full-bleed {
    width: 100%;
    grid-column: 1 / 4;
  }
`

function FullBleedWrap() {
  return (
    <Wrapper>
      <Box className="wrapper">
        <Outlet />
      </Box>
    </Wrapper>
  )
}

export default FullBleedWrap
